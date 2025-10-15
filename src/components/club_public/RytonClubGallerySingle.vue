<template>
  <div :style="{ backgroundColor: Color.background_color, fontFamily: Color.fonts }">
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
        
        <nav class="navbar navbar-expand-lg custom-navbar shadow-sm" :style="{ position: 'sticky', top: '0', zIndex: '1001', backgroundColor: Color.background_color, height: '108px' }">
            <div class="container d-flex justify-content-between align-items-center">
                <a class="navbar-brand d-flex align-items-center" href="/">
                    <img :src="Color.logo_url" class="img-fluid" id="logo" alt="Ryton" style="max-height: 60px" />
                </a>

                    <button class="navbar-toggler me-2" type="button" @click="toggleNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                

                <div class="collapse navbar-collapse custom-collapse" :class="{ show: isNavOpen }" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0 custom-nav">
                        <li class="nav-item">
                            <a class="nav-link" :class="{ active: $route.path === '/ryton' }" @click.prevent="router.push('/'); closeNav()" :style="{ color: Color.text_color, fontFamily: 'Inter', fontSize: '18px' }">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonevent" :style="{ color: Color.text_color }">
                                Events
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytoncomp" :style="{ color: Color.text_color }">
                                Competitions
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{ active: $route.path === '/rytonclubgallery' }" href="/rytongal" :style="{ color: Color.text_color }">
                                Galleries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonnews" :style="{ color: Color.text_color }">
                                News
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonclub" :style="{ color: Color.text_color }">
                                Club
                            </a>
                        </li>
                    </ul>

                    <div class="right-header d-flex align-items-center">
                        <a href="notification.html" class="icon notification-desktop">
                            <i class="fa-regular fa-bell text-lg mx-3" :style="{ color: Color.text_color, fontSize: '22px' }"></i>
                        </a>
                        <div class="divider"></div>
                        <div class="admin-dropdown position-relative">
                            <a href="#" class="icon profile-mobile" >
                                <img v-if="User && User.isLoggedIn && User.profile_image_url" :src="User.profile_image_url" alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                                <i v-else class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '44px' }"></i>
                            </a>
                            <router-link v-if="!User || !User.isLoggedIn" to="/login" custom v-slot="{ navigate }" style="cursor: pointer">
                                <span class="nav-item" id="login">
                                    <span @click="navigate">
                                        Login
                                    </span>&nbsp;
                                    <i class="fa-solid fa-chevron-down text-xs text-gray-500 down" @click.stop.prevent="toggleDropdown"></i>
                                </span>
                            </router-link>
                            <div class="dropdown-menu" v-show="isDropdownOpen">
                                <a class="nav-link" href="#" @click.prevent="handleLogout">
                                    Register
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </nav>

        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ backgroundImage: `url(${Color.cover_images[0]?.url})` }">
                        <div class="hero-overlay">
                            <div>
                                <h1 :style="{ color: Color.background_color, fontWeight: '400'}">{{Club.club_name}}</h1>
                                <p class="cabout" :style="{ color: Color.background_color, fontWeight: '200' }">{{Club.about}}</p>
                                <button id="overlay-button" :style="{ color: Color.background_color, backgroundColor: Color.accent_color }"> Join Our Club </button>
                                <p class="prehead" :style="{ color: Color.background_color, paddingTop: '20px' }">An NYCE Club based in Apps, North East England</p>
                                <div class="d-flex">
                                    <a href="#" target="_blank" rel="noopener noreferrer" class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color, textDecoration: 'none' }"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color, textDecoration: 'none' }"><i class="fab fa-instagram"></i></a>
                                    <a href="#" target="_blank" rel="noopener noreferrer" class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color, textDecoration: 'none' }"><span class="flickr-dots"><i class="fa fa-circle"></i><i class="fa fa-circle"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="contents">
            <section>
                <div class="container" id="heads">
                    <div class="events-header">
                        <nav class="breadcrumb">
                            <router-link to="/rytongal" class="events-title breadcrumb-item" :style="{color: Color.accent_color}">Galleries</router-link>
                            <span class="events-title breadcrumb-separator" :style="{color: Color.accent_color}">></span>
                            <router-link to="/rytonclubgallery" class="events-title breadcrumb-item" :style="{color: Color.accent_color}">Club Galleries</router-link>
                            <span class="events-title breadcrumb-separator" :style="{color: Color.accent_color}">></span>
                            <span class="events-title breadcrumb-item active">{{ galleryName }}</span>
                        </nav>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input v-model="search" type="search" class="search-input" id="dt-search-1" placeholder="Search galleries..." aria-controls="example1" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="gallery-single">
                <div class="container" id="overall">
                    <div v-if="galleryImages.length" class="clubpics">
                        <div v-for="(img, index) in galleryImages" :key="index" class="clubpics-item">
                            <img :src="img.image" :alt="img.title || 'Photo'" loading="lazy" />
                            <div class="clubpics-info">
                                <div :style="{ color: Color.background_color }" style="flex-direction: column; display: flex">
                                    <span id="ename">{{ img.title}}</span>
                                    <span class="galtext">{{formatDate(img.created_at)}}</span>
                                </div>
                                <div class="profile-icon d-flex justify-content-between">
                                    <div class="icons">
                                        <span>{{ img.likes_count }}</span>
                                        <img :src="Hea" alt="icon" style="width:14px; height: 14px;" />
                                    </div>
                                    <div class="icons">
                                        <span>{{ img.comments_count }}</span>
                                        <img :src="Com" alt="icon" style="width:14px; height: 14px;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else class="no-images">No images found in this gallery.</div>
                </div>
            </section>
        </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRytonSingleClubGalStore } from '@/stores/club_public/RytonSingleClubGallery'
import Loader from "@/components/LoaderAll.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Hea from "@/assets/icons/gallery/heart.svg"
import Com from "@/assets/icons/gallery/comment.svg"

const route = useRoute()
const store = useRytonSingleClubGalStore()
dayjs.extend(relativeTime);
const isLoading = ref(true);
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);

const memData = computed(() => store.sinclubgalData?.data?.clubSettings?.original?.data?.settings || {});
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
};



onMounted(async () => {
    document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) isDropdownOpen.value = false;
  });

  const carouselEl = document.querySelector('#carouselExampleIndicators');
  if (carouselEl && window.bootstrap) {
    new window.bootstrap.Carousel(carouselEl);
  }

  try {
  const id = route.params.id
  console.log("🔹 Route gallery ID:", id)
  await store.fetchRytonSingleClubGalData(id)
  } catch (error) {
    console.error("Error fetching ryton club gallery data:", error);
  } finally {
    isLoading.value = false;
  }
})

const galleryName = computed(() => store.galleryName)
const galleryImages = computed(() => store.galleryImages)
</script>

<style scoped>
#overall {
     padding: 0 25px 50px 30px;
}
#heads {
    padding: 50px 70px 20px 70px;
}
.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.events-title {
  font-family: Inter;
font-weight: 500;
font-style: Medium;
font-size: 36px;
line-height: 100%;
letter-spacing: 0%;
margin: 0;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
}

.breadcrumb-item {
  text-decoration: none;
  color: #6b7280;
}

.breadcrumb-item.active {
  color: #111827;
  font-weight: 600;
}

.breadcrumb-separator {
  color: #9ca3af;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 10px;
  width: 470px;
  height: 60px;
  transition: border-color 0.2s ease;
}

.search-bar:hover,
.search-bar:focus-within {
  border-color: #d1d5db;
}

.search-bar i {
  color: #c0c0c0;
  font-size: 14px;
  margin-right: 8px;
}

.search-input {
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  flex: 1;
  background: transparent;
}

.search-input::placeholder {
  color: #c0c0c0;
}
.clubpics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
}

.clubpics-item {
  position: relative;
  overflow: hidden;
}

.clubpics-item img {
  border-radius: 0;
  width: 100%;
  height: 412px;
  object-fit: cover;
  object-position: top;
}

.clubpics-info {
  background: #4c403699;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 5px;
  font-size: 20px;
  font-weight: 600;
  font-family: Inter;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
}

.gallery-single {
  padding: 50px 10%;
  background: #fff;
  min-height: 100vh;
}
.gallery-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.image-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.image-card:hover img {
  transform: scale(1.05);
}
.overlay {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  width: 100%;
  padding: 10px;
}
#ename {
  font-family: Inter;
  font-weight: 600;
  font-style: Semi Bold;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  margin-bottom: 5px;
}
.galtext {
    font-family: Inter;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0%;
}
</style>
