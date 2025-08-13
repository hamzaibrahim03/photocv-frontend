<template>
<NavigationRoute />
<HeaderRoute title="Member Galleries" />
<section class="content">
    <div class="dashboard-card">
        <ClubProfile greeting="Galleries uploaded by Club Members" name="15 Club Galleries" role="Average 20 Images" />
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">Images</small>
                <h3 class="number">872</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Interactions</small>
                <div class="row">
                    <div class="col-md-5">
                        <h3 class="number">1k</h3>
                    </div>
                    <div class="days col-md-7">
                        <span>Likes & Comments</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MemberGalleries />
</section>
</template>

<script>
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import ClubProfile from "@/partials/club/ClubProfile.vue";
import MemberGalleries from "@/partials/membergallery/MemberGalleries.vue";
export default {
    name: "MemberGallery",
    components: {
        HeaderRoute,
        NavigationRoute,
        ClubProfile,
        MemberGalleries,
    },
};
</script>

<style scoped></style>
