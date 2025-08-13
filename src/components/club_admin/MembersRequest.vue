<template>
<NavigationRoute />
<HeaderRoute title="Member Requests" />
<section class="content">
    <div class="dashboard-card">
        <ClubProfile greeting="List of members in the club" name="All Members" role="25 Member Galleries" />
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">Members</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Interactions</small>
                <div class="row">
                    <div class="col-md-5">
                        <h3 class="number">4k</h3>
                    </div>
                    <div class="days col-md-7">
                        <span>Likes & Comments</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MemberList />
</section>
</template>

<script>
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import ClubProfile from "@/partials/club/ClubProfile.vue";
import MemberList from "@/partials/members/MemberList.vue";

export default {
    name: "MembersRequest",
    components: {
        HeaderRoute,
        NavigationRoute,
        ClubProfile,
        MemberList,
    },
    data() {
        return {
            MemberCount: 0,
        };
    },
};
</script>

<style scoped></style>
