<template>
<NavigationRoute />
<HeaderRoute title="Events" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">Planned and regular club competition</small>
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
                    <i class="bi bi-calendar-event"></i>
                    <i class="bi bi-camera"></i>
                    <i class="bi bi-newspaper"></i>
                </div>
                <div class="d-flex gap-2 justify-content-end mt-2">
                    <i class="bi bi-trophy"></i>
                    <i class="bi bi-info"></i>
                    <i class="bi bi-bell"></i>
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
                <CalendarAll />
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
import { useEventStore } from '@/stores/EventStore'
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import CalendarAll from "@/partials/events/CalendarAll.vue";
import RecentComments from '@/partials/events/RecentComments.vue'
import MoreEvents from '@/partials/events/MoreEvents.vue'
import EventsForm from "@/partials/eventsedit/EventsForm.vue";

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
