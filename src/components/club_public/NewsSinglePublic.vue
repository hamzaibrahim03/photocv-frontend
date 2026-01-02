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
                            <a class="nav-link" @click.prevent="router.push('/ryton'); closeNav()" :style="{ color: Color.text_color, fontFamily: 'Inter', fontSize: '18px' }">
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
                            <a class="nav-link" href="/rytongal" :style="{ color: Color.text_color }">
                                Galleries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{ active: $route.path === '/rytonsinglenews' }" href="/rytonnews" :style="{ color: Color.text_color }">
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
                        <a href="notification.vue" class="icon notification-desktop">
                            <i class="fa-regular fa-bell text-lg mx-3" :style="{ color: Color.text_color, fontSize: '22px' }"></i>
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
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[4]?.url}) no-repeat center center / cover`}">
                        <div class="hero-overlay">
                            <div v-if="News.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%;">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="News[0].featured_image_url" alt="News Image" />
                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ News[0].title || 'Untitled News' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0" :style="{color: Color.accent_color}">{{ formatDate(News[0].created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="News[0].club_news_type?.icon_url" :alt="News[0].club_news_type?.name" class="virtual" style="width: 25px; height: 25px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary" v-html="News[0].description || 'No description provided.'"></p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <router-link :to="{ name: 'NewsSinglePublic', params: { id: News[0].id } }" custom v-slot="{ navigate }">
                                                <button class="btn me-2" id="view" @click="navigate" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                            </router-link>
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

            <section>
                <div class="container" id="heads">
                    <div class="events-header">
                        <nav class="breadcrumb">
                            <router-link to="/rytonnews" class="events-title breadcrumb-item" :style="{color: Color.accent_color}">News</router-link>
                            <span class="events-title breadcrumb-separator" :style="{color: Color.accent_color}">></span>
                            <span class="events-title breadcrumb-item active">{{ sinnews.title }}</span>
                        </nav>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" v-model="searchQuery" placeholder="Search" class="search-input" />
                        </div>
                    </div>
                </div>
            </section>   

            <section>
                <div class="container"  id="overall">

                    <div class="row">
                        <div class="col-md-8">
                            <section>
                                <div class="container">
                                    <div class="card">
                                        <img :src="sinnews.featured_image_url" alt="Meeting" style="max-width: 850px; height: 350px; border-radius: 8px"/>
                                        <div class="d-flex justify-content-between">
                                            <h5 class="head" :style="{ color: Color.text_color }">{{  sinnews.title }}</h5>
                                            <div class="d-flex align-items-center gap-2 mb-1">
                                                <img :src="sinnews.club_news_type.icon_url" style="width:20px; height:20px" />
                                                <h5 class="head m-0" :style="{ color: Color.text_color }">{{ sinnews.club_news_type.name }}</h5>
                                            </div>

                                        </div>
                                        <p id="edate" :style="{color: Color.accent_color}">{{formatDate(sinnews.publish_date)}}</p>
                                        <p class="text-secondary" :style="{color: Color.text_color, width: '1100px'}" v-html="sinnews.description">
                                        </p>                
                                        
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="col-md-4">
                            <section>
                                <div class="container" id="right">

                                    <div class="more-card d-flex flex-column" :style="{ padding: '35px', height: 'auto'}" id="eve">
                                        <h5 class="head">Club Notices</h5>
                                        <div class="event-list" v-if="Notices.length">
                                            <div class="event-item" v-for="c in Notices.slice(0, 3)" :key="c.id" style="margin-bottom: 10px">
                                                <img v-if="c.featured_image_url" class="img-fluid event-img" :src="c.featured_image_url" alt="Notice" @error="c.featured_image_url = null"/>
                                                <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                                </div>
                                                <div class="event-details">
                                                    <div class="event-info" style="display: flex; flex-direction: column">
                                                        <span id="ename">{{ c.title }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-center text-muted py-4">
                                            No notices found.
                                        </div>
                                    </div>

                                    <div class="more-card d-flex flex-column" :style="{ padding: '35px', height: 'auto'}" id="eve">
                                        <h5 class="head">Events</h5>
                                        <div class="event-list" v-if="Event.length">
                                            <div class="event-item" v-for="c in Event.slice(0, 6)" :key="c.id" style="margin-bottom: 10px">
                                                <img v-if="c.featured_image_url" class="img-fluid event-img" :src="c.featured_image_url" alt="Notice" @error="c.featured_image_url = null"/>
                                                <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                                </div>
                                                <div class="event-details">
                                                    <div class="event-info" style="display: flex; flex-direction: column">
                                                        <span id="ename">{{ c.name }}</span>
                                                        <span id="espeaker" :style="{color: Color.accent_color}">Speaker: {{ c.speaker }}</span>
                                                    </div>

                                                    <div class="event-time" id="edate">
                                                        <small class="event-date galtext" :style="{color: Color.accent_color}">{{ formatDate(c.event_date) }}</small><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-center text-muted py-4">
                                            No events found.
                                        </div>
                                    </div>

                                    <div class="more-card d-flex flex-column" :style="{ padding: '35px', height: 'auto'}" id="eve">
                                        <h5 class="head">Competitions</h5>
                                        <div class="event-list" v-if="Competitions.length">
                                            <div class="event-item" v-for="c in Competitions.slice(0, 6)" :key="c.id" style="margin-bottom: 10px">
                                                <img v-if="c.featured_image_url" class="img-fluid event-img" :src="c.featured_image_url" alt="Notice" @error="c.featured_image_url = null"/>
                                                <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                                </div>
                                                <div class="event-details">
                                                    <div class="event-info" style="display: flex; flex-direction: column">
                                                        <span id="ename">{{ c.name }}</span>
                                                        <span id="espeaker" :style="{ color: Color.accent_color }">
                                                            Judge:
                                                            <span v-for="(judge, i) in c.judges" :key="judge.id">
                                                                {{ judge.first_name }} {{ judge.last_name }}<span v-if="i < c.judges.length - 1">, </span>
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div class="event-time" id="edate">
                                                        <small class="event-date galtext" :style="{color: Color.accent_color}">{{ formatDate(c.start_date) }}</small><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-center text-muted py-4">
                                            No competitions found.
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

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
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRytonSingleNewsStore } from '@/stores/club_public/RytonSingleNews';
import { useRytonNewsStore } from '@/stores/club_public/RytonNews';
import Loader from "@/components/LoaderAll.vue";
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/club_admin/UserStore';
import { useHomeStore } from '@/stores/club_public/ClubData';
import relativeTime from 'dayjs/plugin/relativeTime';
import { storeToRefs } from 'pinia'

dayjs.extend(relativeTime);
const route = useRoute();
const router = useRouter();
const user = useUserStore();

const rytonsinglenewsStore = useRytonSingleNewsStore();
const rytonnewsStore = useRytonNewsStore();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);

 
const isLoading = ref(true);
const homeStore = useHomeStore();


const { username, profile_image_url } = storeToRefs(user)
const News = computed(() => rytonnewsStore.newsData?.data?.clubNews?.original?.data?.original?.data || []);
const Notices = computed(() => rytonnewsStore.newsData?.data?.clubNotices?.original?.data || []);
const Competitions = computed(() => rytonnewsStore.newsData?.data?.competitions || {})
const Event = computed(() => rytonnewsStore.newsData?.data?.events || {})
const sinnews = computed(() => rytonsinglenewsStore.sinnewsData?.data?.news?.original?.data || {});
const clubSettings = computed(() => rytonnewsStore.newsData?.data?.clubSettings?.original?.data || {});
const Color = computed(() => clubSettings.value.settings || {});
const Club = computed(() => clubSettings.value.club || {});
const domain = window.location.hostname.split('.')[0];



const handleLogout = async () => {
  await user.logout();
};

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
    const id = route.params.id;
    await rytonsinglenewsStore.fetchRytonSingleNewsData(id);
    await rytonnewsStore.fetchRytonNewsData(domain);
    await homeStore.fetchHomeData(domain);
  } catch (error) {
    console.error("Error fetching ryton single news data:", error);
  } finally {
    isLoading.value = false; 
  }
});

</script>


<style src="@/assets/css/clubstyle.css"></style>
<style scoped>
#overall {
     padding: 0 0px 20px 45px;
}
 #heads {
     padding: 70px 68px 38px 80px;
}
 #right {
     margin-left: 10px 
}
 #eventdetails {
     margin-left: -20px 
}
 #edate {
     margin-top: 5px;
     margin-bottom: 47px 
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
 .card .head {
     font-family: Inter;
     font-weight: 500;
     font-style: Medium;
     font-size: 28px;
     line-height: 100%;
     letter-spacing: 0%;
     margin-top: 50px;
     margin-bottom: 70px;
}
 .card .text-secondary {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 20px;
     line-height: 24px;
     letter-spacing: 0%;
     margin-left: -10px;
     width: 1100px;
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
 #joincontainer {
     margin-top: 300px;
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
 .event-img, .fallback-box {
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
 #footer-heading {
     text-align: center;
     margin-bottom: 30px;
     font-weight: 500;
     font-family: Inter;
     font-style: Regular;
     font-size: 36px;
     line-height: 100%;
     letter-spacing: 0%;
}
 #events-left {
     flex: 3;
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
     font-weight: 400;
     font-style: Regular;
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
 .more-card {
     height: 580px;
     background: white;
     width: 470px;
     padding: 20px;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
 .event-list {
     padding-top: 0px;
}
 .event-list {
     display: flex;
     flex-direction: column;
     gap: 20px;
}
 .event-item {
     display: flex;
     align-items: center;
     gap: 20px;
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
     font-weight: 600;
     font-style: Semi-Bold;
     font-size: 14px;
     line-height: 20px;
     letter-spacing: 0%;
}
 #espeaker {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 10px;
     line-height: 20px;
     letter-spacing: 0%;
}
 .notification-mobile {
     display: none;
}
 .dt-paging {
     display: flex;
     justify-content: flex-start;
     align-items: center;
     flex-wrap: wrap;
     margin-top: 20px;
     gap: 5px;
}
 .dt-paging-button {
     border: 1px solid green;
     background: #ffffff;
     color: black;
     margin: 2px;
     border-radius: 5px;
     cursor: pointer;
     font-size: 16px;
     transition: background 0.3s ease;
     width: 40px;
     height: 40px;
     padding: 0;
}
 .dt-paging-button.disabled {
     background: #ffffff;
     color: black;
     border: 1px solid #99816b;
     cursor: not-allowed;
     opacity: 0.6;
}
 .dt-paging-button.current {
     background: orange;
     font-weight: bold;
     border: none;
     color: white 
}
 .divider5{
     width: 1100px;
     height: 1px;
     background-color: rgba(217, 217, 217, 1);
     margin-top: 30px;
     border-bottom: 1px solid rgba(217, 217, 217, 1);
}
 @media only screen and (max-width: 1399px) {
     #overall {
         padding: 0 25px 60px 35px;
    }
     #heads {
         padding: 50px 25px 50px 50px;
    }
     .search-bar {
         display: flex;
         align-items: center;
         background-color: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 8px;
         padding: 6px 30px;
         width: 400px;
         height: 60px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .divider4, .divider5 {
         width: 100% 
    }
     .more-card {
         width: 110% !important;
    }
     #right {
         margin-left: -10px;
    }
     #edate {
         width: 120px;
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     .event-date {
         width: 120px;
         display: block;
    }
     #ename {
         font-size: 13px 
    }
}
 @media only screen and (max-width: 1199px) {
     #overall {
         padding: 0 25px 60px 35px;
    }
     #heads {
         padding: 50px 25px 50px 50px;
    }
     .search-bar {
         display: flex;
         align-items: center;
         background-color: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 8px;
         padding: 6px 30px;
         width: 400px;
         height: 60px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .more-card {
         width: 120% !important;
    }
     .event-details {
         display: flex;
         flex-direction: column;
    }
     .event-info {
         width: 180px;
    }
     .day-number {
         width: 30px;
    }
     #right {
         margin-left: -30px;
    }
     #edate {
         width: 120px;
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     .event-date {
         width: 120px;
         display: block;
         text-align: left;
    }
     #ename {
         font-size: 14px 
    }
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
     #overall {
         padding: 0 25px 60px 35px;
    }
     #overall .row {
         display: flex;
         flex-direction: column;
    }
     .card .row {
         display: flex;
         flex-direction: row;
    }
     #heads {
         padding: 50px 25px 50px 50px;
    }
     .events-title {
         font-size: 32px;
    }
     .search-bar {
         display: flex;
         align-items: center;
         background-color: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 8px;
         padding: 6px 30px;
         width: 300px;
         height: 50px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .card img {
         width: 670px;
    }
     .card .text-secondary {
         width: 680px;
    }
     .divider4, .divider5 {
         width: 150% 
    }
     .more-card {
         width: 700px !important;
    }
     #events-left {
         order: 1;
         width: 100%;
    }
     #right {
         order: 2;
         width: 100%;
         margin-top: 20px;
    }
     .event-details {
         display: flex;
         flex-direction: row;
    }
     .event-info {
         width: 100%;
    }
     #edate {
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     #ename {
         font-size: 16px 
    }
}
 @media only screen and (max-width: 767px) {
     #overall {
         padding: 0 25px 60px 35px;
    }
     #overall .row {
         display: flex;
         flex-direction: column;
    }
     #heads {
         padding: 50px 25px 50px 50px;
    }
     .search-bar {
         display: flex;
         align-items: center;
         background-color: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 8px;
         padding: 6px 30px;
         width: 300px;
         height: 60px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .more-card {
         width: 500px !important;
         margin-left: 10px;
    }
     #events-left {
         order: 1;
         width: 100%;
    }
     #right {
         order: 2;
         width: 100%;
         margin-top: 20px;
    }
     .event-details {
         display: flex;
         flex-direction: row;
    }
     .event-info {
         width: 100%;
    }
     .card img, .card .text-secondary {
         width: 500px;
    }
     .divider4, .divider5 {
         width: 100%;
    }
     #edate {
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     #ename {
         font-size: 16px 
    }
}
 @media only screen and (max-width: 575px) {
     #overall {
         padding: 0 25px 60px 35px;
    }
     #overall .row {
         display: flex;
         flex-direction: column;
    }
     #heads {
         padding: 50px 25px 50px 50px;
    }
     .events-title {
         font-size: 20px;
    }
     .search-bar {
         display: flex;
         align-items: center;
         background-color: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 8px;
         padding: 6px 30px;
         width: 200px;
         height: 60px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .more-card {
         width: 320px !important;
         margin-left: 10px;
    }
     #events-left {
         order: 1;
         width: 100%;
    }
     #right {
         order: 2;
         width: 100%;
         margin-top: 20px;
    }
     .event-details {
         display: flex;
         flex-direction: column;
    }
     .event-info {
         width: 100%;
    }
     .card img, .card .text-secondary {
         width: 300px;
    }
     .divider4, .divider5 {
         width: 100%;
    }
     #edate {
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     #ename {
         font-size: 16px 
    }
}
 @media only screen and (max-width: 359px) {
     #overall {
         padding: 0 25px 60px 35px;
    }
     #overall .row {
         display: flex;
         flex-direction: column;
    }
     #heads {
         padding: 50px 25px 50px 50px;
    }
     .events-title {
         font-size: 20px;
    }
     .search-bar {
         display: flex;
         align-items: center;
         background-color: #fff;
         border: 1px solid #e5e7eb;
         border-radius: 8px;
         padding: 6px 30px;
         width: 200px;
         height: 60px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .more-card {
         width: 320px !important;
         margin-left: 10px;
    }
     #events-left {
         order: 1;
         width: 100%;
    }
     #right {
         order: 2;
         width: 100%;
         margin-top: 20px;
    }
     .event-details {
         display: flex;
         flex-direction: column;
    }
     .event-info {
         width: 100%;
    }
     #edate {
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     #ename {
         font-size: 16px 
    }
}
</style>