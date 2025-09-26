<template>
<NavigationRoute />
<HeaderRoute title="News" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">News from the club admins</small>
                    <h2 class="name">Club News</h2>
                    <p class="role">{{CurrentMonthCount}} News posted this month</p>
                </div>
            </div>
            <div class="dt-search mx-auto">
                <input v-model="search" type="search" class="form-control" id="dt-search-1" placeholder="Search news..." aria-controls="example1" />
            </div>
            <div class="quick-filter text-end">
                <strong>Quick Filter</strong>
                <small class="d-block">(Click icons to filter)</small>
                <div class="d-flex gap-2 justify-content-end">
                    <img :src="Com" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Cale" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Book" alt="icon" style="width: 20px; height: 20px" />
                </div>
                <div class="d-flex gap-2 justify-content-end mt-2">
                    <img :src="Cup" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Hand" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Note" alt="icon" style="width: 20px; height: 20px" />
                </div>
            </div>
        </div>
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">News</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Latest News</small>
                <div class="row">
                    <div class="col-md-5">
                        <h3 class="number">{{EventDay}}</h3>
                    </div>
                    <div class="days col-md-7">
                        <span>days ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8">
            <div class="container mt-4">
                <div v-if="filteredNews.length">
                    <div v-for="news in filteredNews" :key="news.id" class="custom-card mb-3 p-3">
                        <div class="d-flex gap-3" style="flex: 1">
                            <img v-if="news.club_news_type.icon" :src="news.featured_image" alt="News Image" />
                            <div class="flex-grow-1 d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5>{{ news.title || 'Untitled News' }}</h5>
                                    <div class="icon-container ms-3">
                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                    </div>
                                </div>
                                <p class="names" style="font-size: 14px">{{ news.club_news_type.name }}</p>
                                <p class="date">
                                    {{ formatDate(news.publish_date) || 'Date Not Available' }}
                                </p>
                                <p class="text-secondary">
                                    {{ news.description || 'No description provided.' }}
                                </p>
                                <div class="button-group mt-3 d-flex">
                                    <button class="btn me-2" id="view">View</button>
                                    <button class="btn" id="edit">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-muted">No news found.</div>

                <nav v-if="filteredNews.length">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="prevPage">Previous</button>
                        </li>
                        <li class="page-item disabled">
                            <span class="page-link">
                                Page {{ currentPage }} of {{ totalPages }}
                            </span>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <button class="page-link" @click="nextPage">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="col-md-4">
            <div class="calen">
                <CalendarEvent />
            </div>
            <div id="news">
                <RecentComments style="width: 90%" />
                <MoreNews style="width: 90%" />
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from 'axios'
import { useNewsStore } from '@/stores/club_admin/NewsStore'
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import CalendarEvent from '@/components/club_admin/Calendars/CalendarEvent.vue'
import RecentComments from "@/partials/club_admin/news/RecentComments.vue";
import MoreNews from "@/partials/club_admin/news/MoreNews.vue";
import Pro from "@/assets/icons/event_list/pro.svg"
import Cal from "@/assets/icons/event_list/cal.svg"
import Cam from "@/assets/icons/event_list/cam.svg"
import Mess from "@/assets/icons/event_list/mess.svg"
import Book from "@/assets/icons/quick_notice/book.svg"
import Cale from "@/assets/icons/quick_notice/calender.svg"
import Com from "@/assets/icons/quick_notice/com.svg"
import Cup from "@/assets/icons/quick_notice/cup.svg"
import Hand from "@/assets/icons/quick_notice/hand.svg"
import Note from "@/assets/icons/quick_notice/note.svg"
/* global $ */

const {
    news,
    fetchNews,
    memberCount,
    currentMonthCount,
    completedDaysAgo
} = useNewsStore()

const MemberCount = memberCount
const CurrentMonthCount = currentMonthCount
const EventDay = completedDaysAgo
const search = ref('')
const currentPage = ref(1)
const rowsPerPage = 4

let debounceTimeout
const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

let lastSearched = ''

const fetchSearchedNews = debounce(async (query) => {
    if (query !== lastSearched) {
        lastSearched = query
        try {
            const response = await apiClient.get('/news', {
                params: {
                    search_term: query
                }
            })
            const result = response?.data?.data?.original?.data || []
            news.value = result
            currentPage.value = 1
        } catch (error) {
            console.error('Error fetching searched news:', error)
            news.value = []
        }
    }
}, 400)

watch(search, (newSearch) => {
    if (newSearch.length >= 3) {
        fetchSearchedNews(newSearch)
    } else {
        fetchNews()
    }
})

onMounted(() => {
    $("#datepicker").datepicker()
    fetchNews()
})

const filteredNews = computed(() => {
    let filtered = news.value

    if (search.value.trim()) {
        filtered = filtered.filter(news =>
            news?.title?.toLowerCase().includes(search.value.toLowerCase())
        )
    }

    const start = (currentPage.value - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filtered.slice(start, end)
})

const totalPages = computed(() => {
    const count = news.value.filter(news =>
        news?.title?.toLowerCase().includes(search.value.toLowerCase())
    ).length
    return Math.max(Math.ceil(count / rowsPerPage), 1)
})

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const formatDate = (date) => {
    const d = new Date(date)
    return isNaN(d) ? '' : d.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}
</script>

<style scoped>
.calen {
    margin-top: 15px;
}


.icon-container i {
    color: #666;
    font-size: 16px;
}

.custom-card {
    margin-left: 1%;
    width: 103%
}
</style>
