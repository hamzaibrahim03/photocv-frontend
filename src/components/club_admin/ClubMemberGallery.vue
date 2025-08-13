<template>
<NavigationRoute />
<HeaderRoute title="Club Gallery" />
<section class="content">
    <div class="dashboard-card">
        <ClubProfile greeting="Galleries uploaded by Club" name="Sunset" role="20 Images" />
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">Images</small>
                <h3 class="number">64</h3>
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
    <ClubMemberGalleries />
</section>
</template>

<script>
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import ClubProfile from "@/partials/club/ClubProfile.vue";
import ClubMemberGalleries from "@/partials/clubmembergallery/ClubMemberGalleries.vue";
export default {
    data() {
        return {
            galleryImages: [{
                    src: require("@/assets/images/gallery/c1.jpg"),
                    description: "Beautiful landscape",
                },
                {
                    src: require("@/assets/images/gallery/c2.jpg"),
                    description: "Urban night scene",
                },
            ],
        };
    },
    methods: {
        handleImageClick(index) {
            const imgArray = this.galleryImages.map((img) => img.src);
            const descArray = this.galleryImages.map((img) => img.description || "");

            localStorage.setItem("selectedImageIndex", index);
            localStorage.setItem("imageList", JSON.stringify(imgArray));
            localStorage.setItem("imageDescriptions", JSON.stringify(descArray));

            console.log("Saved images:", imgArray);
            console.log("Saved index:", index);

            setTimeout(() => {
                window.location.href = "/club_gallery_single";
            }, 100);
        },
    },
    name: "ClubMemberGallery",
    components: {
        HeaderRoute,
        NavigationRoute,
        ClubProfile,
        ClubMemberGalleries,
    },
};
</script>

<style scoped></style>
