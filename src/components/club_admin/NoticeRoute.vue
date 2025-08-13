<template>
<NavigationRoute />
<HeaderRoute title="Notices" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">All kinds of notices on the club website</small>
                    <h2 class="name">Club Notices</h2>
                    <p class="role">{{CurrentMonthCount}} Notices posted this month</p>
                </div>
            </div>
            <div class="dt-search mx-auto">
                <input v-model="search" type="search" class="form-control" id="dt-search-1" placeholder="Search notices..." aria-controls="example1" />
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
                <small class="ca-details">Notices</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Last Notice</small>
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
                <div v-if="filteredNotices.length">
                    <div v-for="notice in filteredNotices" :key="notice.id" class="custom-card mb-3 p-3">
                        <div class="d-flex gap-3" style="flex: 1">
                            <img :src="notice.featured_image" alt="Notice Image" />
                            <div class="flex-grow-1 d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5>{{ notice.title || 'Untitled Notice' }}</h5>
                                    <div class="icon-container ms-3">
                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                    </div>
                                </div>
                                <p class="names" style="font-size: 14px">{{ notice.names }}</p>
                                <p class="date">{{ formatDate(notice.created_at) }}</p>
                                <p class="text-secondary">
                                    {{ notice.description || 'No description provided.' }}
                                </p>
                                <div class="mt-3 d-flex">
                                    <router-link :to="{ name: 'noticesingle', params: { id: notice.id } }" custom v-slot="{ navigate }">
                                        <button class="btn me-2" id="view" @click="navigate">View</button>
                                    </router-link>

                                    <router-link :to="{ name: 'noticeedit', params: { id: notice.id } }" custom v-slot="{ navigate }">
                                        <button class="btn me-2" id="edit" @click="navigate">Edit</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center text-muted">No notices found.</div>
                <nav v-if="filteredNotices.length">
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
                <CalendarAll />
            </div>
            <div id="news">
                <RecentComments style="width: 90%" />
                <MoreNotices style="width: 90%" />
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from 'axios'
import { useNoticeStore } from '@/stores/NoticeStore'
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import RecentComments from "@/partials/club_admin/notices/RecentComments.vue";
import MoreNotices from "@/partials/club_admin/notices/MoreNotices.vue";
import CalendarAll from "@/partials/club_admin/events/CalendarAll.vue";
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
    completedDaysAgo,
    notices,
    fetchNotices,
    memberCount,
    currentMonthCount,
} = useNoticeStore()

const CurrentMonthCount = currentMonthCount
const MemberCount = memberCount
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

const fetchSearchedNotices = debounce(async (query) => {
    if (query !== lastSearched) {
        lastSearched = query
        try {
            const response = await apiClient.get('/notices', {
                params: {
                    search_term: query
                }
            })
            const result = response?.data?.data?.original?.data || []
            notices.value = result
            currentPage.value = 1
        } catch (error) {
            console.error('Error fetching searched notices:', error)
            notices.value = []
        }
    }
}, 400)

watch(search, (newSearch) => {
    if (newSearch.length >= 3) {
        fetchSearchedNotices(newSearch)
    } else {
        fetchNotices();
    }
})

onMounted(() => {
    $("#datepicker").datepicker()
    fetchNotices()
})

const filteredNotices = computed(() => {
    let filtered = notices.value

    if (search.value.trim()) {
        filtered = filtered.filter(notice =>
            notice?.title?.toLowerCase().includes(search.value.toLowerCase())
        )
    }

    const start = (currentPage.value - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filtered.slice(start, end)
})

const totalPages = computed(() => {
    const count = notices.value.filter(notice =>
        notice?.title?.toLowerCase().includes(search.value.toLowerCase())
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
