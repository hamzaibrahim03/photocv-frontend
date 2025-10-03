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
                            <a class="nav-link" :class="{ active: $route.path === '/' }" @click.prevent="router.push('/'); closeNav()" :style="{ color: Color.text_color, fontFamily: 'Inter', fontSize: '18px' }">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#events" :style="{ color: Color.text_color }">
                                Events
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#events" :style="{ color: Color.text_color }">
                                Competitions
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#gal" :style="{ color: Color.text_color }">
                                Galleries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#newscontainer" :style="{ color: Color.text_color }">
                                News
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#joincontainer" :style="{ color: Color.text_color }">
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
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
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
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[1]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div class="card-section" style="width: 100%;" id="cl">
                                <div class="stat-card" :style="{width: '50%', backgroundColor: Color.accent_color, color: Color.background_color}">
                                    <small class="ca-details">Members</small>
                                    <h3 class="number">{{ memData.total_members }}</h3>
                                </div>
                                <div class="event-card" :style="{width: '50%', backgroundColor: Color.primary_color}">
                                    <small class="ca-details">Next Event</small>
                                    <div class="row">
                                        <h3 class="number">
                                            {{ String(evData.remaining_days).padStart(2, '0') }}
                                            &nbsp;<span class="days">days to go</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[2]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div v-if="Events.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img v-if="Events[0].images" :src="Events[0].featured_image_url" alt="Event Image" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ Events[0].name || 'Untitled Event' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0">{{ formatDate(Events[0].event_date) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>                  
                                            <p class="text-secondary">
                                                {{ Events[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <button class="btn me-2" id="view" @click="navigate" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[3]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="Notice.featured_image_url" alt="Notice Image" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ Notice.title || 'Untitled Event' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0">{{ formatDate(Notice.created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary">
                                                {{ Notice.description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <button class="btn me-2" id="view" @click="navigate" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[4]?.url}) no-repeat center center / cover`}">
                        <div class="hero-overlay">
                            <div v-if="News.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%;">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="News[0].featured_image_url" alt="News Image" />
                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ News[0].title || 'Untitled Event' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0">{{ formatDate(News[0].created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary">
                                                {{ News[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <button class="btn me-2" id="view" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="contents">
            <div class="row">
                <div class="col-md-8">
                    <section>
                        <div class="container">
                            <div class="mt-4">
                                <div v-for="e in Events" :key="e.id" class="custom-card mb-3 p-3">
                                    <div class="hero-grid">
                                    <div class="hero-image">
                                            <img v-if="e.featured_image_url" :src="e.featured_image_url" alt="Event Image" />
                                        </div>
                                    <div class="hero-content">

                                            <div class="flex-grow-1 d-flex flex-column justify-content-between">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <h5 id="ename" :style="{color: Color.text_color}">{{ e.name || 'Untitled Event' }}</h5>
                                                    <div class="icon-container ms-3">
                                                        <img :src="Video" alt="icon"  :style="{color: Color.accent_color}" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                                <p class="galtext" id="edate" :style="{color: Color.accent_color}">
                                                    {{ formatDate(e.event_date) || 'Date Not Available' }}
                                                </p>
                                                <p class="text-secondary"  :style="{color: Color.text_color}">
                                                    {{ e.description || 'No description provided.' }}
                                                </p>
                                                <p id="espeaker" :style="{color: Color.accent_color}">
                                                    {{"Speaker: " + e.speaker}}
                                                </p>
                                                <div class="button-group mt-3 d-flex">
                                                    <button class="btn me-2" id="view" :style="{color: Color.background_color, backgroundColor: Color.primary_color}">View Details</button>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="col-md-4">
                    <section>
                        <div class="container" id="right">
                            <div class="cardddd" style="padding: 0px">
                                <CalendarEvent />
                            </div>
                            <div id="news">
                                <MoreEvents />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <section id="joincontainer">
                <div class="container">
                    <div id="cls" class="join d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4" style="background-color: #ebe6e1;" :style="{backgroundColor: Color.secondary_color}">
                        <div>
                            <h5 id="clubheading" class="heading" :style="{color: Color.text_color}">
                                Ready to join the club & work on something exciting?
                            </h5>
                            <p id="clubsub" class="head" :style="{color: Color.text_color, marginBottom: '0px'}">
                                Join the club and let’s create something amazing.
                            </p>
                        </div>

                        <button class="btn" id="join-club" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">
                            Join Club
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="footer-section" style="padding-top: 30px">
                        <h5 id="footer-heading" class="heading footer-heading" :style="{ color: Color.text_color }">{{ Color.footer_text }}</h5>
                        <p id="footer-description" class="head footer-description mx-auto" style="max-width: 1145px;" :style="{ color: Color.text_color }">{{ Color.footer_description }}</p>
                    </div>
                </div>
            </section>

            <section>
                <div class="container footer-section">
                    <div class="row align-items-center text-center text-md-start">
                        <div class="col-12 col-md-4 mb-4 mb-md-0 text-md-end">
                            <div class="contact-col">
                                <h5 class="head mb-4" :style="{ color: Color.text_color, paddingBottom: '10px' }">Contact</h5>

                                <div class="contact-item mb-3 d-flex justify-content-md-end justify-content-center align-items-center" id="cla" :style="{paddingBottom: '10px'}">
                                    <p class="footer-text mb-0" :style="{ color: Color.text_color }">{{ Club.address }}</p>
                                    <div class="icon-circles ms-3" :style="{ color: Color.background_color, backgroundColor: Color.accent_color }">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                </div>

                                <div class="contact-item mb-3 d-flex justify-content-md-end justify-content-center align-items-center" id="cla" :style="{paddingBottom: '10px'}">
                                    <p class="footer-text mb-0" :style="{ color: Color.text_color }">{{ Club.phone }}</p>
                                    <div class="icon-circles ms-3" :style="{ color: Color.background_color, backgroundColor: Color.accent_color }">
                                        <i class="fas fa-phone"></i>
                                    </div>
                                </div>

                                <div class="contact-item d-flex justify-content-md-end justify-content-center align-items-center" id="cla">
                                    <p class="footer-text mb-0" :style="{ color: Color.text_color }">{{ Club.email }}</p>
                                    <div class="icon-circles ms-3" :style="{ color: Color.background_color, backgroundColor: Color.accent_color }">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 mb-4 mb-md-0 text-center" style="padding-top: -10px">
                            <img :src="Color.footer_img_url" alt="sample" class="footer-img" />
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="social-col">
                                <h5 class="head mb-4 text-md-start text-center" :style="{ color: Color.text_color, paddingBottom: '10px' }">Social Links</h5>

                                <div v-if="Color.fb_link_option === 1 && Color.fb_link" class="social-item d-flex align-items-center justify-content-md-start justify-content-center" id="cle">
                                    <div class="ficon-circles me-3" :style="{ color: Color.background_color, backgroundColor: Color.text_color }">
                                        <i class="fab fa-facebook-f"></i>
                                    </div>
                                    <div id="facebook">
                                        <p class="footer-text fw-bold mb-1" :style="{ color: Color.text_color }">Facebook</p>
                                        <a :href="Color.fb_link" target="_blank" class="footer-link" :style="{ color: Color.text_color }">
                                            {{ Color.fb_link }}
                                        </a>
                                    </div>
                                </div>

                                <div v-if="Color.insta_link_option === 1 && Color.insta_link" class="social-item d-flex align-items-center justify-content-md-start justify-content-center" id="cle">
                                    <div class="ficon-circles me-3" :style="{ color: Color.background_color, backgroundColor: Color.text_color }">
                                        <i class="fab fa-instagram"></i>
                                    </div>
                                    <div id="facebook">
                                        <p class="footer-text fw-bold mb-1" :style="{ color: Color.text_color }">Instagram</p>
                                        <a :href="Color.insta_link" target="_blank" class="footer-link" :style="{ color: Color.text_color }">
                                            {{ Color.insta_link }}
                                        </a>
                                    </div>
                                </div>

                                <div v-if="Color.flickr_link_option === 1 && Color.flickr_link" class="social-item d-flex align-items-center justify-content-md-start justify-content-center" id="cle">
                                    <div class="ficon-circles me-3" :style="{ color: Color.background_color, backgroundColor: Color.text_color }">
                                        <span class="flickr-dots"><i class="fa fa-circle"></i><i class="fa fa-circle"></i></span>
                                    </div>
                                    <div id="facebook">
                                        <p class="footer-text fw-bold mb-1" :style="{ color: Color.text_color }">Flickr</p>
                                        <a :href="Color.flickr_link" class="footer-link" :style="{ color: Color.text_color }">
                                            {{ Color.flickr_link }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="site-footer">
                <div class="footer-content">
                    <p class="memtext" id="fcopy">Copyright &copy; 2025 – {{Club.club_name}}</p>
                    <p class="memtext">Powered by <a href="https://cameraclub.website" target="_blank" :style="{color: Color.text_color, fontWeight: 'bold'}">cameraclub.website</a></p>
                </div>
            </footer>
        </div>
    </div>
</div>
<pre>{{eventData}}</pre>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRytonEventStore } from '@/stores/club_public/RytonEvent';
import Loader from "@/components/LoaderAll.vue";
import CalendarEvent from "@/components/club_public/Calendars/CalendarRytonEvent.vue";
import Video from "@/assets/icons/event_list/vid.svg"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from "vue-router";


const router = useRouter();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};
const closeNav = () => {
  isNavOpen.value = false;
};
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const rytoneventStore = useRytonEventStore();

dayjs.extend(relativeTime);

const isLoading = ref(true);
const memData = computed(() => rytoneventStore.eventData?.data?.clubSettings?.original?.data || {});
const evData = computed(() => rytoneventStore.eventData?.data?.clubSettings?.original?.data?.upcoming_event_days_count || {});
const Events = computed(() => rytoneventStore.eventData?.data?.events?.original?.data?.original?.data || []);
const News = computed(() => rytoneventStore.eventData?.data?.clubNews || {});
const Notice = computed(() => rytoneventStore.eventData?.data?.latest_notice?.original?.data || {});
const Club = computed(() => rytoneventStore.eventData?.data?.clubSettings?.original?.data.club || {});
const Color = computed(() => rytoneventStore.eventData?.data?.clubSettings?.original?.data.settings || {});


const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();

  // Add suffix
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
};


onMounted(async () => {
    document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) {
      isDropdownOpen.value = false;
    }
  });
  
    const carouselEl = document.querySelector('#carouselExampleIndicators')
    if (carouselEl && window.bootstrap) {
        new window.bootstrap.Carousel(carouselEl)
    }

    let domain = window.location.hostname.split('.')[0];
    try {
        await rytoneventStore.fetchRytonEventData(domain);

    } catch (error) {
        console.error("Error fetching ryton event data:", error);
    } finally {
        isLoading.value = false; // ✅ loader hide
    }

});

</script>
<style src="@/assets/css/clubstyle.css"></style>
<style scoped>
.custom-card {
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  width: 975px;
  height: 310px;
  margin-right: auto;
  flex-direction: row;
}

.custom-card img {
    max-width: 300px;
    width: 300px;
height: 250px;
border-radius: 8px;
opacity: 1;
}

.custom-card #ename {
    font-family: Inter;
font-weight: 500;
font-style: Medium;
font-size: 24px;
line-height: 100%;
letter-spacing: 0%;

}

.custom-card #edate {
    font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 12px;
line-height: 100%;
letter-spacing: 0%;

}

.custom-card .text-secondary {
    font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 14px;
line-height: 20px;
letter-spacing: 0%;

}

.custom-card #espeaker {
    font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 12px;
line-height: 100%;
letter-spacing: 0%;

}

.button-group #view {
    max-width: 150px;
height: 40px;
opacity: 1;
top: 228px;
left: 380px;
padding-top: 10px;
padding-right: 18px;
padding-bottom: 10px;
padding-left: 18px;
gap: 10px;
font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 16px;
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

.ultrahead {
    font-family: Inter;
    font-weight: 400;
    font-style: Regular;
    font-size: 72px;
    line-height: 20px;
    letter-spacing: 0%;
}

.heading {
    font-family: Inter;
    font-weight: 400;
    font-style: Regular;
    font-size: 36px;
    line-height: 100%;
    letter-spacing: 0%;
}

.head {
    font-family: Inter;
    font-weight: 500;
    font-style: Medium;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0%;
}

.clubhead {
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 20px;
    line-height: 100%;
    letter-spacing: 0%;
}

.subhead {
    font-family: Inter;
    font-weight: 400;
    font-style: Regular;
    font-size: 18px;
    line-height: 36px;
    letter-spacing: 0%;
}

.memtext {
    font-family: Inter;
    font-weight: 400;
    font-style: Regular;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
}

.prehead {
    font-family: Inter;
    font-weight: 400;
    font-style: Regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
}

.galtext {
    font-family: Inter;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0%;
}

.event-img,
.fallback-box {
    width: 100%;
    max-width: 50px;
    height: 50px;
    border-radius: 7px;
    object-fit: cover;
    background-color: #f0f0f0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.event-item {
    gap: 20px;
}

.fallback-box {
    font-size: 14px;
    color: #888;
}

.icon-circles .flickr-dots i, .flickr-dots i{
    font-size: 8px;
    padding-bottom: 10px;
    margin: 1px;
}

.cardddd {
    background: white;
  width: 90%;
  padding: 20px;
  height: 390px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.button-group button {
    margin-right: 8px;
}

.event-list {
  padding-top: 30px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.event-item img {
  width: 100%;
  max-width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
}

.event-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  font-size: 0.875rem;
  width: 100%;
}

#ename {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
}



@media only screen and (max-width: 767px) {
.comments-cards{
    width: 100%;
    margin: 0 auto;
}
}
@media only screen and (max-width: 991px) {
  .right-header .profile-mobile,
  .right-header .divider,
  .notification-desktop,
  .down {
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

/* Default: hide mobile notification */
.notification-mobile {
  display: none;
}

</style>
