<template>
<NavigationRoute />
<HeaderRoute title="Galleries" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">Features Members & Club Galleries</small>
                    <h2 class="name">24 Club Galleries</h2>
                    <small class="role">15 Member Galleries</small>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <div class="dt-search">
                    <input type="search" style="width: 250px" class="form-control" id="dt-search-1" placeholder="Search" aria-controls="example1" />
                </div>
            </div>
        </div>
        <div class="card-section">
            <div class="stat-card">
                <small class="ca-details">Images</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Interactions</small>
                <div class="row">
                    <div class="col-md-5">
                        <h3 class="number">{{ EventDay }}</h3>
                    </div>
                    <div class="days col-md-7">
                        <span>Likes & Comments</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
            <h4>Member Galleries</h4>
            <button class="btn btn-sm" id="view">View All</button>
        </div>

        <div class="row" style="margin-left:0.1%">
  <div
    v-for="gallery in member_gallery"
    :key="gallery.gallery_id"
    style="width:24.8%; padding-left: 0; padding-right: 0;"
  >
    <div class="galleriy" v-if="gallery.photos && gallery.photos.length">
      <div class="galleriy-item">
        <!-- Fix image path -->
        <img
          :src="gallery.galleries.photos[0].image"
          alt="Gallery Photo"
          class="img-fluid"
          style="max-width: 493px; max-height: 370px;"
        />
        <!-- Use gallery instead of undefined item -->
        <div class="galleriy-infos">
          <div class="gal-item">
            <img :src="gallery.profile_image_url" alt="Profile Picture" />
            <div class="gal-details">
              <span>{{ gallery.gallery_name }}</span>
            </div>
          </div>
          <div class="profile-icon">
            <div class="icons">
              <span>{{ gallery.gallery_total_photos }}</span>
              <img :src="Ima" alt="icon" style="width:14px; height: 14px;" />
            </div>
            <div class="icons">
              <span>{{ gallery.gallery_total_likes }}</span>
              <img :src="Hea" alt="icon" style="width:14px; height: 14px;" />
            </div>
            <div class="icons">
              <span>{{ gallery.gallery_total_comments }}</span>
              <img :src="Com" alt="icon" style="width:14px; height: 14px;" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>

    <div class="card">
        <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
            <h4>Club Galleries</h4>
            <button class="btn btn-sm" id="view">View All</button>
        </div>

        <div class="row" style="margin-left:0.1%">
            <div v-for="gallery in club_gallery" :key="gallery.gallery_id" style="width:24.8%; padding-left: 0; padding-right: 0;">
                <div class="galleriy" v-if="gallery.photos && gallery.photos.length">
                    <div class="galleriy-item">
                        <img :src="gallery.photos[0].image" alt="Gallery Photo" class="img-fluid" style="max-width: 493px; max-height: 370px;" />
                        <div class="galleriy-infos">
                            <div class="gal-item">
                                <span>{{ gallery.photos[0].title }}</span>
                            </div>
                            <div class="profile-icon d-flex justify-content-between">
                                <div class="icons">
                                    <span>{{ gallery.total_photos }}</span> 
                                    <img :src="Ima" alt="icon" style="width:14px; height: 14px;" />
                                </div>
                                <div class="icons">
                                    <span>{{ gallery.photos[0].likes_count }}</span> 
                                    <img :src="Hea" alt="icon" style="width:14px; height: 14px;" />
                                </div>
                                <div class="icons">
                                    <span>{{ gallery.photos[0].comments_count }}</span>
                                    <img :src="Com" alt="icon" style="width:14px; height: 14px;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
</template>

<script setup>
import {
    onMounted
} from 'vue'

// Component imports
import NavigationRoute from "@/components/NavigationRoute.vue"
import HeaderRoute from "@/components/HeaderRoute.vue"
import Ima from "@/assets/icons/gallery/image.svg"
import Hea from "@/assets/icons/gallery/heart.svg"
import Com from "@/assets/icons/gallery/comment.svg"

// Stores
import {
    useMemberGallery
} from '@/stores/MemberGallery'
import {
    useClubGallery
} from '@/stores/ClubGallery'

// Member Gallery Store
const {
    member_gallery,
    fetchMemberGallery
} = useMemberGallery()

// Club Gallery Store
const {
    club_gallery,
    fetchClubGallery
} = useClubGallery()

// Fetch both on mount
onMounted(() => {
    fetchMemberGallery()
    fetchClubGallery()
})
</script>

<style scoped>
.row-wrapper {
    display: flex;
}

.even-info {
    background-color: #99816b;
}

.odd-info {
    background-color: #4c4036;
}
</style>
