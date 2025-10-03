<template>
<NavigationRoute />
<HeaderRoute title="Events" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">Viewing event</small>
                    <h2 class="name">{{event.name}}</h2>
                    <p class="role">{{formattedStartDate}}</p>
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
            <div class="p-3" id="news">
                <div class="news-list">
                    <div class="custom-card">
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="event.featured_image_url" alt="Meeting" style="max-width: 300px; height: 250px"/>
                            </div>
                            <div class="col-md-8">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h5>{{event.name}}</h5>
                                    <div class="icon-container ms-3">
                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                    </div>
                                </div>
                                <p class="date">{{formattedStartDate}}</p>
                                <p class="text-secondary">
                                    {{event.description}}
                                </p>
                            </div>
                            <div class="divider"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Event Duration</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.duration}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Event Speaker</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.speaker}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Event Speaker Club</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.speaker_club}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Event Speaker Qualifications</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.speaker_qualification}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Event Status</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.status}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Gear Required</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.required_gear}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Tags / Keywords Speaker</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">
                                        {{event.tags_keywords}}
                                    </h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">Link to related page</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">{{event.url}}</h5>
                                </div>
                            </div>
                            <div class="divider3"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="role">RSVP Detail</h5>
                                </div>
                                <div class="col-md-6">
                                    <h5 class="namess">
                                        {{event.rsvp_detail}}
                                    </h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5 class="namess">
                                        <input type="checkbox" /> Dropbox upload
                                    </h5>
                                </div>
                            </div>
                            <div class="button-group">
                                <button class="btn me-2" id="view">Back</button>
                                <router-link to="/events_add" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="edit" @click="navigate">Edit</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="calen">
                <CalendarDashboard />
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
import { onMounted, computed } from 'vue'
import { useEventStore } from '@/stores/club_admin/EventStore'
import NavigationRoute from "@/components/NavigationRoute.vue"
import HeaderRoute from "@/components/HeaderRoute.vue"
import CalendarDashboard from '@/components/club_admin/Calendars/CalendarDashboard.vue'
import RecentComments from '@/partials/club_admin/events/RecentComments.vue'
import MoreEvents from '@/partials/club_admin/events/MoreEvents.vue'
import dayjs from 'dayjs'
import Pro from "@/assets/icons/event_list/pro.svg"
import Cal from "@/assets/icons/event_list/cal.svg"
import Cam from "@/assets/icons/event_list/cam.svg"
import Mess from "@/assets/icons/event_list/mess.svg"
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const {
  events,
  fetchEvents,
  memberCount,
  eventDay
} = useEventStore()
 const EventDay = eventDay;
 const MemberCount = memberCount
 const event = computed(() =>
  events.value.find(e => e.id == id) || {}
)
 

const formattedStartDate = computed(() =>
  event.value?.event_date
    ? dayjs(event.value.event_date).format('MMMM D, YYYY h:mm A')
    : ''
)

onMounted(() => {
  fetchEvents()
})

</script>


<style scoped>
.calen {
    margin-top: 15px;
}

.custom-card {
    margin-left: 1%;
    width: 103%;
}
</style>
