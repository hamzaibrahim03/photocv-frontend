<template>
<NavigationRoute />
<HeaderRoute title="Events" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">Viewing Event</small>
                    <h2 class="name">Zoom Lecture</h2>
                    <p class="role">{{EventCount}} Events to go</p>
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
        <EventsForm />
        <div class="col-md-4">
            <div class="calen">
                <CalendarEvent />
            </div>
            <div id="news">
                <RecentComments style="width: 90%; margin-top: 15%" />
                <MoreEvents style="width: 90%" />
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEventStore } from '@/stores/club_admin/EventStore'
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import CalendarEvent from '@/components/club_admin/Calendars/CalendarEvent.vue'
import RecentComments from '@/partials/club_admin/events/RecentComments.vue'
import MoreEvents from '@/partials/club_admin/events/MoreEvents.vue'
import EventsForm from "@/partials/club_admin/eventsedit/EventsForm.vue";

/* global $ */

// Store
const {
    memberCount,
    eventCount,
    fetchEvents,
    eventDay
} = useEventStore()
const MemberCount = memberCount
const EventDay = eventDay
const EventCount = eventCount
// Local state

// Fetch events on mount
onMounted(() => {
    $("#datepicker").datepicker()
    fetchEvents()
})
</script>

<style scoped>
.calen {
    margin-top: 15px;
}

#news {
    margin-top: -35px;
}
</style>
