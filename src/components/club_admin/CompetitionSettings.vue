<template>
<NavigationRoute />
<HeaderRoute title="Competitions" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">Planned and Regular Club Competition</small>
                    <h2 class="name">Settings / Default Values</h2>
                    <small class="role">Any values selected here would become default for new competition  entry</small>
                </div>
            </div>
        </div>
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">Competitions</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Next Competition</small>
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
        <FormAdd />
        <div class="col-md-4">
            <div class="calen">
                <CalendarAll />
            </div>
            <div id="news">
                <RecentSubmissions />
                <MoreCompetitions />
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import CalendarAll from "@/partials/club_admin/events/CalendarAll.vue";
import RecentSubmissions from "@/partials/club_admin/competitions/RecentSubmissions.vue";
import MoreCompetitions from "@/partials/club_admin/competitions/MoreCompetitions.vue";
import FormAdd from "@/partials/club_admin/competitionsset/FormAdd.vue";
import { onMounted } from 'vue'
import { useCompetitionStore } from '@/stores/club_admin/CompetitionStore'
/* global $ */

const {
    fetchCompetitions,
    memberCount,
    eventDay
} = useCompetitionStore()
const MemberCount = memberCount
const EventDay = eventDay

// Fetch evencompetitionsts on mount
onMounted(() => {
    $("#datepicker").datepicker()
    fetchCompetitions()
})
</script>

<style scoped>
.calen {
    margin-top: 15px;
}
</style>
