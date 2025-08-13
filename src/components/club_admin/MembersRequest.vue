<template>
<NavigationRoute />
<HeaderRoute title="Member Requests" />
<section class="content">
    <div class="dashboard-card">
        <div class="profile-card">
            <div class="profile-left">
                <div class="profile-info">
                    <small class="greeting">List of members in the club</small>
                    <h2 class="name">All Members</h2>
                    <small class="role">25 Member Galleries</small>
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
                <small class="ca-details">Members</small>
                <h3 class="number">{{ MemberCount }}</h3>
            </div>
            <div class="event-card">
                <small class="ca-details">Interactions</small>
                <div class="row">
                    <div class="col-md-5">
                        <h3 class="number">{{EventCount}}</h3>
                    </div>
                    <div class="days col-md-7">
                        <span>Likes & Comments</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
        <div class="photographers">
            <div v-for="(member, index) in row" :key="index" class="photographer-card">
                <img :src="member.profile_image_url" alt="Profile Picture" class="profile-pic" />
                <div class="social-media-icons">
                    <a href="#" style="background-color: #99816b; color: white"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" style="background-color: #cc445e; color: white"><i class="fab fa-instagram"></i></a>
                    <a href="#" style="background-color: #99816b; color: white"><i class="fab fa-twitter"></i></a>
                </div>
                <h3>{{ member.username }}</h3>
                <small class="role">{{ member.tag_line }}</small>
                <div class="social-icons">
                    <div class="icon"><span>{{member.gallery_total_photos}}</span><img :src="Ima" alt="icon" style="width: 20px; height: 20px" /></div>
                    <div class="icon"><span>{{member.gallery_total_comments}}</span><img :src="Com" alt="icon" style="width: 20px; height: 20px" /></div>
                    <div class="icon"><span>{{member.gallery_total_likes}}</span><img :src="Lik" alt="icon" style="width: 20px; height: 20px" /></div>
                </div>
                <div class="gallery-preview">
                    <div v-for="(gallery, index) in member.galleries.slice(0, 2)" :key="index" class="pic-item">
                        <img :src="gallery.photos.length ? gallery.photos[0].image_url : '/placeholder.jpg'" alt="Gallery Image" />
                        <div class="pic-info">
                            <span>{{ gallery.gallery_name.length > 10 ? gallery.gallery_name.slice(0, 10) + '...' : gallery.gallery_name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between">
        <div class="button-group" style="margin-left: 2%">
            <button class="btn" id="edit" @click="navigate">Add New</button>
        </div>
        <div class="dt-paging">
            <nav aria-label="pagination">
                <button class="dt-paging-button first" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1" @click="goToPage(1)" aria-label="First">
                    «
                </button>

                <button class="dt-paging-button previous" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)" aria-label="Previous">
                    ‹
                </button>

                <button v-for="page in totalPages" :key="page" class="dt-paging-button" :class="{ current: page === currentPage }" @click="goToPage(page)">
                    {{ page }}
                </button>

                <button class="dt-paging-button next" :class="{ disabled: currentPage === totalPages }" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)" aria-label="Next">
                    ›
                </button>

                <button class="dt-paging-button last" :class="{ disabled: currentPage === totalPages }" :disabled="currentPage === totalPages" @click="goToPage(totalPages)" aria-label="Last">
                    »
                </button>
            </nav>
        </div>
    </div>
</section>
</template>

<script setup>
import {
    ref,
    computed,
    onMounted
} from 'vue'
import {
    useMemberStore
} from '@/stores/MemberStore';
import NavigationRoute from "@/components/NavigationRoute.vue"
import HeaderRoute from "@/components/HeaderRoute.vue"
import Ima from "@/assets/icons/member/image.svg"
import Com from "@/assets/icons/member/comment.svg"
import Lik from "@/assets/icons/member/like.svg"

const memberStore = useMemberStore()
const memberData = computed(() => memberStore.memberData)

const currentPage = ref(1)
const itemsPerPage = 24

const MemberCount = computed(() => memberStore.memberCount)
const EventCount = computed(() => memberStore.eventCount)
onMounted(() => {
    console.log("Total Interactions (Comments + Likes):", EventCount);
    memberStore.fetchMembers()
});

const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return memberData.value.slice(start, end)
})

const chunkedCards = computed(() => {
    const chunkSize = 4
    const chunks = []
    let i = 0;
    const currentPageItems = paginatedCards.value
    for (i = 0; i < currentPageItems.length; i += chunkSize) {
        chunks.push(currentPageItems.slice(i, i + chunkSize))
    }
    return chunks
})

const totalPages = computed(() => {
    return Math.ceil(memberData.value.length / itemsPerPage)
})

// const totalPhotoCount = computed(() => {
//   return memberStore.memberData.reduce((memberSum, member) => {
//     const gallerySum = member.galleries?.reduce((gallerySum, gallery) => {
//       return gallerySum + (gallery.photos?.length || 0);
//     }, 0);
//     return memberSum + gallerySum;
//   }, 0);
// });

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}
</script>

<style scoped>
.social-icons {
    background-color: #d64561;
    display: flex;
    justify-content: center;
    padding: 10px 25px;
}

.icon {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #ffffff;
    font-size: 15px;
}

.icon i {
    font-size: 22px;
}
</style>
