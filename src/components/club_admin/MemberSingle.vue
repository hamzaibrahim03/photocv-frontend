<template>
<NavigationRoute />
<HeaderRoute title="Members" />
<section class="content">
    <div class="dashboard-card">
        <ClubProfile greeting="List of members in the Club" name="All Members" role="25 Member Galleries" />
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
    <div class="photographeres">
        <ProfileMember />
    </div>
    <div class="row" style="margin-top: 20px">
        <div class="col-md-6">
            <KamranComments />
        </div>
        <div class="col-md-6">
            <KamranLikes />
        </div>
    </div>
    <div class="row" style="margin-top: 20px">
        <div class="col-md-6">
            <KamranEntries />
        </div>
        <div class="col-md-6">
            <KamranAwards />
        </div>
    </div>
    <KamranGallery />
    <div class="dt-paging">
        <nav aria-label="pagination">
            <button class="dt-paging-button disabled first" role="link" type="button" aria-controls="example1" aria-disabled="true" aria-label="First" data-dt-idx="first" tabindex="-1">
                «
            </button>
            <button class="dt-paging-button disabled previous" role="link" type="button" aria-controls="example1" aria-disabled="true" aria-label="Previous" data-dt-idx="previous" tabindex="-1">
                ‹
            </button>
            <button class="dt-paging-button current" role="link" type="button" aria-controls="example1" aria-current="page" data-dt-idx="0">
                1
            </button>
            <button class="dt-paging-button disabled next" role="link" type="button" aria-controls="example1" aria-disabled="true" aria-label="Next" data-dt-idx="next" tabindex="-1">
                ›
            </button>
            <button class="dt-paging-button disabled last" role="link" type="button" aria-controls="example1" aria-disabled="true" aria-label="Last" data-dt-idx="last" tabindex="-1">
                »
            </button>
        </nav>
    </div>
</section>
</template>

<script setup>
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import ClubProfile from "@/partials/club/ClubProfile.vue";
import ProfileMember from "@/partials/membersingle/ProfileMember.vue";
import KamranComments from "@/partials/membersingle/KamranComments.vue";
import KamranLikes from "@/partials/membersingle/KamranLikes.vue";
import KamranEntries from "@/partials/membersingle/KamranEntries.vue";
import KamranAwards from "@/partials/membersingle/KamranAwards.vue";
import KamranGallery from "@/partials/membersingle/KamranGallery.vue";
</script>

<style scoped></style>
