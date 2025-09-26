<template>
<NavigationRoute />
<HeaderRoute title="Events" />
<div class="content">
    <section>
        <div class="container">
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
        </div>
    </section>

    <section>
        <div class="container">
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
                        <CalendarEvent />
                    </div>
                    <div id="news">
                        <RecentComments style="width: 90%" />
                        <MoreEvents style="width: 90%" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
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
} from '@/stores/club_admin/EventStore'
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
import CalendarEvent from '@/components/club_admin/Calendars/CalendarEvent.vue'
import RecentComments from '@/partials/club_admin/events/RecentComments.vue'
import MoreEvents from '@/partials/club_admin/events/MoreEvents.vue'
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
.container {
  max-width: 1810px;
  padding: 0 15px;
  margin: 0 auto;
}
.dashboard-card {
  gap: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.profile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px 25px;
  border-radius: 12px;
  width: 68%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 158px;
}

.profile-left {
  display: flex;
  align-items: left;
}

.profile-left img {
  width: 100%;
  max-width: 108px;
  height: 108px;
  border-radius: 50%;
}

.greeting {
  color: #99816b;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  font-family: Inter;
}

.name {
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  color: #4c4036;
  font-family: Inter;
}

.names {
  font-family: Inter;
  font-weight: 400;
  font-size: 18.68px;
  line-height: 20.76px;
  letter-spacing: 0%;
}

.namess {
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #4c4036;
  padding-left: 20px;
  font-family: Inter;
  text-align: justify;
}

.left-header-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role {
  color: #cc445e;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  font-family: Inter;
}

.profile-icons {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.profile-icon {
  display: flex;
  flex-direction: column;
}

.icons {
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  gap: 5px;
}

.icon {
  display: flex;
  align-items: center;
  color: #cc445e;
  font-size: 14px;
  gap: 5px;
}

.icon i {
  margin-right: 5px;
}

.stat-card {
  background: #cc445e;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 50%;
  font-family: Inter;
  font-size: 1.2rem;
  height: 158px;
}

.event-card {
  background: #755840;
  color: white;
  padding: 20px;
  height: 158px;
  border-radius: 8px;
  text-align: center;
  font-family: Inter;
  font-size: 1.2rem;
  width: 50%;
}

.number {
  font-weight: 500;
  font-size: 48px;
  font-family: Inter;
  line-height: 100%;
  color: white;
  margin-top: 30px;
}

.ca-details {
  font-weight: 400;
  font-size: 20px;
  font-family: Inter;
  line-height: 100%;
}

.days {
  margin-top: 35px;
  font-weight: 400;
  font-family: Inter;
  font-size: 16px;
  line-height: 100%;
}
.card-section {
  display: flex;
  gap: 15px;
  width: 30%;
}
</style>
