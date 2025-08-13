<template>
<NavigationRoute />
<HeaderRoute title="Member Gallery" />
<section class="content">
    <div class="dashboard-card">
        <ClubProfile greeting="Galleries uploaded by Club Member" name="Kamran Chohdary" role="20 Images" />
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
    <KamranGalleries />
</section>
</template>

<script>
import NavigationRoute from "@/components/NavigationRoute.vue";
import HeaderRoute from "@/components/HeaderRoute.vue";
import ClubProfile from "@/partials/club_admin/club/ClubProfile.vue";
import KamranGalleries from "@/partials/club_admin/kamgallery/KamranGalleries.vue";
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
                window.location.href = "/kamran_gallery_single";
            }, 100);
        },
    },
    name: "KamranGallery",
    components: {
        HeaderRoute,
        NavigationRoute,
        ClubProfile,
        KamranGalleries,
    },
};
</script>

<style scoped></style>
