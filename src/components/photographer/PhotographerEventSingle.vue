<template>
<NavigationRoute />
<HeaderRoute title="Events" />
<section class="content">
    <div class="dashboard-card">
        <QuickFilters greeting="Viewing Event" name="Zoom Lecture" role="April 22, Tuesday" />
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
                                <img src="@/assets/images/comp/c1.png" alt="Meeting" />
                            </div>
                            <div class="col-md-8" style="padding-left: 30px">
                                <div class="d-flex align-items-center justify-content-between">
                                    <h5>{{event.name}}</h5>
                                    <div class="icon-container">
                                        <a href="#"><i class="fas fa-comment-alt"></i></a>
                                        <a href="#"><i class="fas fa-camera"></i></a>
                                        <a href="#"><i class="fas fa-calendar-alt"></i></a>
                                    </div>
                                </div>
                                <p class="date">{{formattedStartDate}}</p>
                                <p class="text-secondary">
                                    {{event.description}}
                                </p>
                            </div>
                            <p class="text-secondary" style="margin-top: 10px">
                                {{event.description}}
                            </p>
                            <p class="text-secondary">
                                {{event.description}}
                            </p>
                            <p class="text-secondary">
                                {{event.description}}
                            </p>
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
                                <button class="btn" id="edit">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
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
import { onMounted, computed } from 'vue'
import { useEventStore } from '@/stores/club_admin/EventStore'
import NavigationRoute from "@/components/NavigationRoute.vue"
import HeaderRoute from "@/components/HeaderRoute.vue"
import CalendarAll from "@/partials/club_admin/events/CalendarAll.vue"
import QuickFilters from "@/partials/club_admin/events/QuickFilters.vue"
import RecentComments from '@/partials/club_admin/events/RecentComments.vue'
import MoreEvents from '@/partials/club_admin/events/MoreEvents.vue'
import dayjs from 'dayjs'
    /* global $ */

const {
  events,
  fetchEvents,
  memberCount,
  eventDay
} = useEventStore()
 const EventDay = eventDay;
 const MemberCount = memberCount
 const event = computed(() => events.value[8] || {}) 

const formattedStartDate = computed(() =>
  event.value?.event_date
    ? dayjs(event.value.event_date).format('MMMM D, YYYY h:mm A')
    : ''
)

onMounted(() => {
  $("#datepicker").datepicker() // Only works if jQuery UI is loaded
  fetchEvents()
})

</script>


<style scoped>
.calen {
    margin-top: 15px;
}

.custom-card {
    width: 103%;
    margin-left: 1%
}
</style>
