<template>
  <div :style="{ backgroundColor: Color.background_color, fontFamily: Color.fonts }">
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
        
        <nav class="navbar navbar-expand-lg custom-navbar shadow-sm" :style="{ position: 'sticky', top: '0', zIndex: '1001', backgroundColor: Color.background_color, height: '108px' }">
            <div class="container d-flex justify-content-between align-items-center">
                <a class="navbar-brand d-flex align-items-center" href="/">
                    <img :src="Color.logo_url" class="img-fluid" id="logo" alt="Ryton" style="max-height: 60px; margin-left: 10px" />
                </a>

                    <button class="navbar-toggler me-2" type="button" @click="toggleNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                

                <div class="collapse navbar-collapse custom-collapse" :class="{ show: isNavOpen }" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0 custom-nav">
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="router.push('/ryton'); closeNav()" :style="{ color: Color.text_color }">
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
                            <a class="nav-link" :class="{ active: $route.name === 'RytonClubGallerySingle' }" href="/rytongal" :style="{ color: Color.text_color }">
                                Galleries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonnews" :style="{ color: Color.text_color }">
                                News
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonnotice" :style="{ color: Color.text_color }">
                                Notice
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonclub" :style="{ color: Color.text_color }">
                                Club
                            </a>
                        </li>
                    </ul>

                    <div class="right-header d-flex align-items-center">
                        <a class="icon notification-desktop">
                            <NotificationBell />
                        </a>
                        <div class="divider"></div>
                        <div class="admin-dropdown position-relative">
                            <a href="#" class="icon profile-mobile" >
                                <div style="cursor: pointer">
                                    <template v-if="profile_image_url">
                                        <img
                                        :src="profile_image_url"
                                        alt="User profile"
                                        style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;"
                                        />
                                    </template>
                                    <template v-else>
                                        <i
                                        class="fa-regular fa-user-circle"
                                        :style="{ color: Color.accent_color, fontSize: '44px' }"
                                        ></i>
                                    </template>
                                </div>

                                
                            </a>
                            <span v-if="username" class="notification-desktop">{{ username }}</span>
                            <span v-else class="notification-desktop">Guest</span><i class="fa-solid fa-chevron-down text-xs text-gray-500 down notification-desktop" @click.stop.prevent="toggleDropdown"></i>

                            <div class="dropdown-menu" v-show="isDropdownOpen">
                                <a class="nav-link" href="#" @click.prevent="handleLogout">
                                    Log Out
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

            <section>
                <div class="container" id="overall">
                    <section class="gallery-wrapper">

                        <div class="gallery-grid">
                            <template v-for="(group, gIndex) in groupedImages" :key="gIndex">
                                <div class="suggestion-section">
                                    <div v-if="gIndex === 1">
                                        <div class="suggestion-header d-flex justify-content-between align-items-center">
                                            <h3 class="heading" :style="{fontWeight: '500'}">You may also like</h3>
                                            <button id="view" :style="{color: Color.background_color, backgroundColor: Color.accent_color}" style="border: none">View All</button>
                                        </div>

                                        <div class="suggestion-gallery">
                                            <div v-for="(item, index) in suggestion.slice(0, 4)" :key="index" class="suggestion-card">
                                                <img :src="item.image" :alt="item.title" />
                                                <div class="img-overlay" style="display: flex; justify-content: center; align-items: center; text-align: center" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.65) }">
                                                    <p>{{ item.title }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="gallery-row">
                                    <div class="gallery-big" v-if="group[0]">
                                        <img :src="group[0].image" :alt="group[0].title" @click="openSlide(group[0])"/>
                                        <div class="overlay d-flex justify-content-between align-items-center" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.65) }">
                                            <div class="d-flex align-items-center gap-3">
                                                <img v-if="group[0].uploaded_by_profile_image" class="event-img" style="border-radius: 50%" :src="group[0].uploaded_by_profile_image" alt="Uploader" @error="group[0].uploaded_by_profile_image = null" />
                                                <div v-else class="fallback-box d-flex justify-content-center align-items-center" style="border-radius: 50%"><i class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '44px' }"></i></div>

                                                <div class="d-flex flex-column">
                                                    <h4 class="title" :style="{ color: Color.background_color }">{{ group[0].title }}</h4>
                                                    <span class="name" :style="{ color: hexToRgba(Color.secondary_color, 0.85) }">
                                                        by {{ group[0].uploaded_by_first_name + " " + group[0].uploaded_by_last_name }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="profile-icon d-flex align-items-center gap-4">
                                                <div class="icons d-flex align-items-center gap-2">
                                                    <span>{{ group[0].likes_count }}</span>
                                                    <img :src="Hea" alt="Likes" class="icon" style="width: 26px; height: 22px"/>
                                                </div>
                                                <div class="icons d-flex align-items-center gap-2">
                                                    <span>{{ group[0].comments_count }}</span>
                                                    <img :src="Com" alt="Comments" class="icon" style="width: 26px; height: 22px"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="gallery-column" v-if="group[1] || group[2]">
                                        <div v-for="(img, i) in [group[1], group[2]].filter(Boolean)" :key="i" class="gallery-small" >
                                            <img :src="img.image" :alt="img.title" @click="openSlide(img)"/>
                                            <div class="overlay d-flex justify-content-between align-items-center" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.65) }">
                                                <div class="d-flex align-items-center gap-3">
                                                    <img v-if="img.uploaded_by_profile_image" class="event-img" style="border-radius: 50%" :src="img.uploaded_by_profile_image" alt="Uploader" @error="img.uploaded_by_profile_image = null" />
                                                    <div v-else class="fallback-box d-flex justify-content-center align-items-center" style="border-radius: 50%"><i class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '44px' }"></i></div>

                                                    <div class="d-flex flex-column">
                                                        <h4 class="title" :style="{ color: Color.background_color }">{{ img.title }}</h4>
                                                        <span class="name" :style="{ color: hexToRgba(Color.secondary_color, 0.85) }">
                                                            by {{ img.uploaded_by_first_name + " " + img.uploaded_by_last_name }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="profile-icon d-flex align-items-center gap-4">
                                                    <div class="icons d-flex align-items-center gap-2">
                                                        <span>{{ img.likes_count }}</span>
                                                        <img :src="Hea" alt="Likes" class="icon" style="width: 26px; height: 22px"/>
                                                    </div>
                                                    <div class="icons d-flex align-items-center gap-2">
                                                        <span>{{ img.comments_count }}</span>
                                                        <img :src="Com" alt="Comments" class="icon" style="width: 26px; height: 22px"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="gallery-row-bottom" v-if="group[3] && group[4]">
                                    <div v-for="(img, i) in [group[3], group[4]]" :key="'bottom-' + i" class="gallery-half" >
                                        <img :src="img.image" :alt="img.title" @click="openSlide(img)"/>
                                        <div class="overlay d-flex justify-content-between align-items-center" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.65) }">
                                            <div class="d-flex align-items-center gap-3">
                                                <img v-if="img.uploaded_by_profile_image" class="event-img" style="border-radius: 50%" :src="img.uploaded_by_profile_image" alt="Uploader" @error="img.uploaded_by_profile_image = null" />
                                                <div v-else class="fallback-box d-flex justify-content-center align-items-center" style="border-radius: 50%"><i class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '44px' }"></i></div>

                                                <div class="d-flex flex-column">
                                                    <h4 class="title" :style="{ color: Color.background_color }">{{ img.title }}</h4>
                                                    <span class="name" :style="{ color: hexToRgba(Color.secondary_color, 0.85) }">
                                                        by {{ img.uploaded_by_first_name + " " + img.uploaded_by_last_name }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="profile-icon d-flex align-items-center gap-4">
                                                <div class="icons d-flex align-items-center gap-2">
                                                    <span>{{ img.likes_count }}</span>
                                                    <img :src="Hea" alt="Likes" class="icon" style="width: 26px; height: 22px"/>
                                                </div>
                                                <div class="icons d-flex align-items-center gap-2">
                                                    <span>{{ img.comments_count }}</span>
                                                    <img :src="Com" alt="Comments" class="icon" style="width: 26px; height: 22px"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </section>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="suggestions-header d-flex justify-content-between align-items-center">
                        <h3 class="heading" :style="{fontWeight: '500'}">More on Member Galleries</h3>

                        <button id="view" :style="{color: Color.background_color, backgroundColor: Color.accent_color}" style="border: none">View All</button>
                    </div>

                    <div class="suggestions-gallery">
                        <div v-for="(item, index) in suggestions.slice(0, 4)" :key="index" class="suggestions-card">
                            <img :src="item.image" :alt="item.title" />
                            <div class="img-overlay" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.7) }">
                                <img v-if="item.profile_image" class="event-img" style="border-radius: 50%" :src="item.profile_image" alt="Uploader" @error="item.profile_image = null" />
                                <div v-else class="fallback-box d-flex justify-content-center align-items-center" style="border-radius: 50%"><i class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '44px' }"></i></div>

                                <div class="d-flex flex-column">
                                    <span class="names" :style="{ color: Color.background_color }">
                                        {{ item.member_name }}
                                    </span>
                                    <span class="role" :style="{ color: Color.background_color }">
                                        {{ item.role }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="site-footer">
                <div class="footer-content">
                    <p class="memtext" id="fcopy">Copyright &copy; 2025 – {{Club.club_name}}</p>
                    <p class="memtext">Powered by <a href="https://cameraclub.website" target="_blank" :style="{color: Color.text_color, fontWeight: 'bold'}">{{ Club.domain_name}}</a></p>
                </div>
            </footer>
        </div>
    </div>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/club_admin/UserStore';
import { useRoute } from "vue-router";
import { useRytonSingleClubGalStore } from '@/stores/club_public/RytonSingleClubGallery'
import Loader from "@/components/LoaderAll.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Hea from "@/assets/icons/gallery/heart.svg"
import Com from "@/assets/icons/gallery/comment.svg"
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRytonGalleryStore } from '@/stores/club_public/RytonGallery';
import randomclubgallery from '@/api/club_public/randomclubgallery';
import randommembergallery from '@/api/club_public/randommembergallery';
import NotificationBell from '@/components/club_public/Notifications/NotificationBell.vue'

const router = useRouter()
const route = useRoute()
const randomMembers = ref([])
const randomClubs = ref([])
const store = useRytonSingleClubGalStore()
dayjs.extend(relativeTime);
const isLoading = ref(true);
const isNavOpen = ref(false);
const user = useUserStore();
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);
const { username, profile_image_url } = storeToRefs(user)
const rytongalleryStore = useRytonGalleryStore();


const memData = computed(() => rytongalleryStore.galleryData?.data?.clubSettings?.original?.data || {});
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});



const handleLogout = async () => {
  await user.logout();
};


const groupedImages = computed(() => {
  const limitedImages = galleryImages.value 
  const groups = []
  for (let i = 0; i < limitedImages.length; i += 5) {
    groups.push(limitedImages.slice(i, i + 5))
  }
  return groups
})


const openSlide = (clickedImage) => {
  if (!clickedImage) return

  const allImages = galleryImages.value

  const startIndex = allImages.findIndex(
    img => img.id === clickedImage.id
  )

  localStorage.setItem("selectedImages", JSON.stringify(allImages))
  localStorage.setItem(
    "startIndex",
    startIndex >= 0 ? startIndex : 0
  )

  router.push({
    path: "/rytonclubslide",
    query: { gallery: route.params.id }
  })
}


const hexToRgba = (hex, alpha) => {
  let r = 0, g = 0, b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  }
  else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `rgba(${r},${g},${b},${alpha})`;
}



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

  const res = await randomclubgallery.getAllRandomClub()
  randomClubs.value = res.data.data.randomGalleries || [] 
  console.log("Random Clubs:", randomClubs.value)

  const response = await randommembergallery.getAllRandomMember()
  randomMembers.value = response.data.data.randomGalleries || []  
  console.log("Random Members:", randomMembers.value)
  } catch (error) {
    console.error("Error fetching ryton club gallery data:", error);
  } finally {
    isLoading.value = false;
  }
})


const suggestion = computed(() => {
    return randomClubs.value.map(club => {
        const firstPhoto = club.photos[0]   

        return {
            gallery_id: club.gallery_id,
            gallery_name: club.gallery_name,
            total_photos: club.total_photos,
            image: firstPhoto?.image || "",
            title: firstPhoto?.title || "",
            comments_count: firstPhoto?.comments_count || 0,
            likes_count: firstPhoto?.likes_count || 0,
           uploaded_by: firstPhoto?.uploaded_by || "",

        }
    })
})

const suggestions = computed(() => {
  return randomMembers.value.map(member => {
    const firstGallery = member.galleries?.[0]
    const firstPhoto = firstGallery?.photos?.[0]

    return {
      gallery_id: firstGallery?.id || "",
      gallery_name: firstGallery?.gallery_name || "",
      profile_image: member.profile_image_url,
      total_photos: firstGallery?.photos?.length || 0,
      image: firstPhoto?.image_url || "",
      title: firstPhoto?.title || "",
      comments_count: firstPhoto?.comments_count || 0,
      likes_count: firstPhoto?.likes_count || 0,
      uploaded_by: firstPhoto?.uploaded_by || "",
      member_name: member.first_name + " " + member.last_name
    }
  })
})

const galleryName = computed(() => store.galleryName)
const galleryImages = computed(() => store.galleryImages)
</script>

<style scoped>
#overall {
     padding: 0 55px 50px 95px;
}
 #heads {
     padding: 70px 65px 20px 95px;
}
 .events-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 1.5rem;
     flex-wrap: wrap;
}
 .icon-circles .flickr-dots i, .flickr-dots i{
     font-size: 8px;
     padding-bottom: 10px;
     margin: 1px;
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
 .search-bar:hover, .search-bar:focus-within {
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
 .suggestions-gallery, .suggestion-gallery {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     width: 100%;
     gap: 20px 
}
 .suggestions-card, .suggestion-card {
     position: relative;
     overflow: hidden;
}
 .suggestions-card img, .suggestion-card img {
     border-radius: 0;
     width: 100%;
     height: 295px;
     object-fit: cover;
     object-position: top;
}
 .suggestions-card .img-overlay, .suggestion-card .img-overlay {
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
     height: 70px;
     gap: 20px;
}
 .img-overlay .names {
     font-family: Inter;
     font-weight: 500;
     font-style: Medium;
     font-size: 18px;
     line-height: 24px;
     letter-spacing: 0px;
}
 .img-overlay .role {
     font-family: Inter;
     font-weight: 300;
     font-style: Light;
     font-size: 14px;
     line-height: 20px;
     letter-spacing: 0px;
}
 #view {
     max-width: 130px;
     height: 40px;
     opacity: 1;
     padding: 10px 17px;
     gap: 10px;
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 16px;
     line-height: 100%;
     letter-spacing: 0%;
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
 .site-footer {
     padding-top: 25px;
     padding-bottom: 10px;
     text-align: center;
     font-size: 14px;
     color: #555;
     border-top: 1px solid #ddd;
     margin-top: 40px;
}
 .site-footer a {
     color: #007bff;
     text-decoration: none;
}
 .site-footer a:hover {
     text-decoration: underline;
}
 .gallery-wrapper {
     padding: 50px 0%;
     background: #fff;
}
 .gallery-title {
     font-size: 28px;
     font-weight: bold;
     margin-bottom: 25px;
     text-align: center;
}
 .gallery-grid {
     display: flex;
     flex-direction: column;
     gap: 30px;
}
 .gallery-row {
     display: grid;
     grid-template-columns: 2fr 1fr;
     gap: 30px;
}
 .gallery-column {
     display: flex;
     flex-direction: column;
     gap: 30px;
}
 .gallery-big img {
     width: 1093px;
     height: 980px;
     object-fit: cover;
     cursor: pointer;
     transition: transform 0.3s ease;
}
 .gallery-half img {
     width: 816px;
     height: 475px;
     object-fit: cover;
     cursor: pointer;
     transition: transform 0.3s ease;
}
 .gallery-small img {
     width: 540px;
     height: 480px;
     object-fit: cover;
     cursor: pointer;
     transition: transform 0.3s ease;
}
 .gallery-big img:hover, .gallery-small img:hover, .gallery-half img:hover {
     transform: scale(1.03);
}
 .gallery-row-bottom {
     display: grid;
     grid-template-columns: 1fr 1fr;
     gap: 20px;
}
 .overlay {
     position: absolute;
     bottom: 0;
     left: 0;
     width: 100%;
     padding: 16px 32px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 100px;
     color: white;
}
 .event-img, .fallback-box {
     max-width: 50px;
     max-height: 50px;
     border-radius: 7px;
     object-fit: cover;
     background-color: #f0f0f0;
     box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
 .title {
     font-family: "Inter", sans-serif;
     font-weight: 600;
     font-size: 22px;
     margin: 0;
}
 .name {
     font-family: "Inter", sans-serif;
     font-weight: 400;
     font-size: 16px;
     opacity: 0.9;
     margin-top: 2px;
}
 .icons span {
     font-family: "Inter", sans-serif;
     font-weight: 500;
     font-size: 18px;
}
 .gallery-big, .gallery-small, .gallery-half {
     position: relative;
     overflow: hidden;
}
 @media only screen and (max-width: 991px) {
     .right-header .profile-mobile, .right-header .divider, .notification-desktop, .down {
         display: none !important;
    }
     .notification-mobile {
         display: inline-flex !important;
         margin-right: 10px;
    }
     #login {
         padding: 0px 15px 20px 45px;
         display: flex;
         font-size: 18px;
         font-family: Inter;
         font-weight: 400;
    }
     .navbar .right-header {
         margin-left: 0;
    }
}
</style>