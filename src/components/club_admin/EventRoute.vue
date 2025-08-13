<template>
<NavigationRoute />
<HeaderRoute title="Events" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">Planned and regular club event</small>
                    <h2 class="name">2024 - 2025 Season</h2>
                    <p class="role">{{EventCount}} Events to go</p>
                </div>
            </div>
            <div class="dt-search mx-auto">
                <input v-model="search" type="search" class="form-control" id="dt-search-1" placeholder="Search events..." aria-controls="example1" />
            </div>
            <div class="quick-filter text-end">
                <strong>Quick Filter</strong>
                <small class="d-block">(Click icons to filter)</small>
                <div class="d-flex gap-2 justify-content-end">
                    <img :src="Video" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Project" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Star" alt="icon" style="width: 20px; height: 20px" />
                </div>
                <div class="d-flex gap-2 justify-content-end mt-2">
                    <img :src="Camera" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Stick" alt="icon" style="width: 20px; height: 20px" />
                    <img :src="Set" alt="icon" style="width: 20px; height: 20px" />
                </div>
            </div>
        </div>
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">Events</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Next Event</small>
                <div class="row">
                    <div class="col-md-5">
                        <h3 class="number">{{EventDay}}</h3>
                    </div>
                    <div class="days col-md-7">
                        <span>days to go</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8">
            <div class="container mt-4">
                <div v-if="filteredEvents.length">
                    <div v-for="event in filteredEvents" :key="event.id" class="custom-card mb-3 p-3">
                        <div class="d-flex gap-3" style="flex: 1;">
                            <img v-if="event.images" :src="event.featured_image_url" alt="Event Image" />
                            <div class="flex-grow-1 d-flex flex-column justify-content-between">
                                <div>
                                    <div class="d-flex justify-content-between align-items-start">
                                        <h5>{{ event.name || 'Untitled Event' }}</h5>
                                        <div class="icon-container ms-3">
                                            <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                            <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                            <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                            <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                        </div>
                                    </div>
                                    <p class="date">
                                        {{ formatDate(event.event_date) || 'Date Not Available' }}
                                    </p>
                                    <p class="text-secondary">
                                        {{ event.description || 'No description provided.' }}
                                    </p>
                                </div>

                                <!-- Button Group at Bottom -->
                                <div class="button-group mt-3 d-flex">
                                    <router-link :to="{ name: 'eventsingle', params: { id: event.id } }" custom v-slot="{ navigate }">
                                        <button class="btn me-2" id="view" @click="navigate">View</button>
                                    </router-link>

                                    <router-link :to="{ name: 'events_add', params: { id: event.id } }" custom v-slot="{ navigate }">
                                        <button class="btn me-2" id="edit" @click="navigate">Edit</button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div v-else class="text-center text-muted">No events found.</div>

                <nav v-if="filteredEvents.length">
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
                <MoreEvents style="width: 90%" />
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import {
    ref,
    computed,
    onMounted,
    watch
} from 'vue'
import apiClient from '@/api/axios'
import {
    useEventStore
} from '@/stores/EventStore'
import Video from "@/assets/icons/quick_event/video.svg"
import Star from "@/assets/icons/quick_event/star.svg"
import Set from "@/assets/icons/quick_event/set.svg"
import Stick from "@/assets/icons/quick_event/stick.svg"
import Camera from "@/assets/icons/quick_event/camera.svg"
import Project from "@/assets/icons/quick_event/project.svg"
import Pro from "@/assets/icons/event_list/pro.svg"
import Cal from "@/assets/icons/event_list/cal.svg"
import Cam from "@/assets/icons/event_list/cam.svg"
import Mess from "@/assets/icons/event_list/mess.svg"
import HeaderRoute from '@/components/HeaderRoute.vue'
import NavigationRoute from '@/components/NavigationRoute.vue'
import CalendarAll from '@/partials/events/CalendarAll.vue'
import RecentComments from '@/partials/events/RecentComments.vue'
import MoreEvents from '@/partials/events/MoreEvents.vue'
/* global $ */

const {
    events,
    fetchEvents,
    memberCount,
    eventCount,
    eventDay
} = useEventStore()
const MemberCount = memberCount
const EventDay = eventDay
const EventCount = eventCount
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

const fetchSearchedEvents = debounce(async (query) => {
    if (query.length >= 3 && query !== lastSearched) {
        lastSearched = query
        try {
            const response = await apiClient.get('/events', {
                params: {
                    search_term: query
                }
            })
            const result = response?.data?.data?.original?.data || []
            events.value = result
            currentPage.value = 1
        } catch (error) {
            console.error('Error fetching searched events:', error)
            events.value = []
        }
    }
}, 400)

watch(search, (newSearch) => {
    if (newSearch.length >= 3) {
        fetchSearchedEvents(newSearch)
    } else {
        fetchEvents()
    }
})

onMounted(() => {
    $("#datepicker").datepicker()
    fetchEvents()
})

const filteredEvents = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage
    const end = start + rowsPerPage
    return events.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.max(Math.ceil(events.value.length / rowsPerPage), 1)
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
    width: 103%;
}
</style>
