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
                            <a class="nav-link" :class="{ active: $route.path === '/rytonnews' }" href="rytonnews" :style="{ color: Color.text_color }">
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
                        <h2 class="events-title" :style="{ color: Color.text_color }">Club News</h2>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                             <input v-model="search" type="search" class="search-input" id="dt-search-1" placeholder="Search" aria-controls="example1" />
                        </div>
                    </div>
                </div>
            </section>    

            <section>
                <div class="container"  id="overall">
                    <div class="row">
                        <div class="col-md-8">
                            <section>
                                <div class="container" id="events-left">
                                    <div class="filter-buttons">
                                        <button v-for="filter in filters" :key="filter.name" :class="['filter-btn', { active: activeFilter === filter.name }]" @click="setActiveFilter(filter)">
                                            <img v-if="filter.icon" :src="filter.icon" class="icones" />
                                            <span class="label">{{ filter.name }}</span>
                                        </button>
                                    </div>
                                    <div class="mt-4">
                                        <div v-if="paginatedNews.length">
                                            <div v-for="e in paginatedNews" :key="e.id" class="events-cards p-3">
                                                <img v-if="e.featured_image" :src="e.featured_image_url" alt="Event Image"/>
                                                <div class="flex-grow-1 d-flex flex-column justify-content-between" id="detail">
                                                    <div class="d-flex w-100 justify-content-between align-items-center">
                                                        <h5 id="ename" :style="{color: Color.text_color}">{{ e.title || 'Untitled News' }}</h5>
                                                        <div class="icon-container d-flex gap-2">
                                                            <img :src="e.club_news_type?.icon_url" :alt="e.club_news_type?.name" class="virtual" style="width: 25px; height: 25px" />
                                                        </div>
                                                    </div>
                                                    <p class="galtext" id="edate" :style="{color: Color.accent_color}">
                                                        {{ formatDate(e.publish_date) || 'Date Not Available' }}
                                                    </p>
                                                    <p class="text-secondary"  :style="{color: Color.text_color}" v-html=" e.description || 'No description provided.'"></p>
                                                    <div class="button-groups mt-3 d-flex">
                                                        <router-link :to="{ name: 'NewsSinglePublic', params: { id: e.id } }" custom v-slot="{ navigate }">
                                                            <button class="btn me-2" id="view" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.primary_color}">View Details</button>
                                                        </router-link>                                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-else class="text-center text-muted">No news found.</div>

                                        <div class="dt-paging">
                                            <nav aria-label="pagination">
                                                <button class="dt-paging-button previous" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)" aria-label="Previous">
                                                    ‹
                                                </button>

                                                <button v-for="page in totalPages" :key="page" class="dt-paging-button" :class="{ current: page === currentPage }" @click="goToPage(page)">
                                                    {{ page }}
                                                </button>

                                                <button class="dt-paging-button next" :class="{ disabled: currentPage === totalPages }" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)" aria-label="Next">
                                                    ›
                                                </button>
                                            </nav>
                                        </div>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRytonNewsStore } from '@/stores/club_public/RytonNews';
import Loader from "@/components/LoaderAll.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '@/stores/club_admin/UserStore';
import { useRouter } from "vue-router";
import { useHomeStore } from '@/stores/club_public/ClubData';
import apiClient from '@/api/axios'
import { storeToRefs } from 'pinia';
import { useRytonFilterStore } from "@/stores/club_public/RytonFilters";

const router = useRouter();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);

const filterStore = useRytonFilterStore();

const filters = ref([
  { name: "All", icon: null } 
]);

const activeFilter = ref('All');
const search = ref('')
const user = useUserStore();

const rytonnewsStore = useRytonNewsStore();
dayjs.extend(relativeTime);
const isLoading = ref(true);
const newsList = ref([]);
const homeStore = useHomeStore();


const { username, profile_image_url } = storeToRefs(user)
const setActiveFilter = (filter) => {
  activeFilter.value = filter.name;
};

const filteredNews = computed(() => {
  let list = newsList.value;

  if (activeFilter.value !== 'All') {
  list = list.filter(news => {
    return news.club_news_type?.name
      ?.toLowerCase()
      .includes(activeFilter.value.toLowerCase());
  });
}

  if (search.value.trim() !== '') {
    const term = search.value.toLowerCase();
    list = list.filter(e => 
      e.title?.toLowerCase().includes(term) ||
      e.description?.toLowerCase().includes(term) ||
      e.short_description?.toLowerCase().includes(term)
    );
  }

  return list;
});

const memData = computed(() => rytonnewsStore.newsData?.data?.clubSettings?.original?.data || {});
const News = computed(() => rytonnewsStore.newsData?.data?.clubNews?.original?.data?.original?.data || []);
const Notices = computed(() => rytonnewsStore.newsData?.data?.clubNotices?.original?.data || {})
const Competitions = computed(() => rytonnewsStore.newsData?.data?.competitions || {})
const Event = computed(() => rytonnewsStore.newsData?.data?.events || {})
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});
const domain = window.location.hostname.split('.')[0];




const handleLogout = async () => {
  await user.logout();
};

const currentPage = ref(1);
const rowsPerPage = ref(4);

let debounceTimeout
const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

let lastSearched = ''

const fetchSearchedNews = debounce(async (query) => {
    if (query.length >= 3 && query !== lastSearched) {
        lastSearched = query
        try {
            const response = await apiClient.get('/club/public/news', {
                params: {
                    search_term: query
                }
            })
            const result = response?.data?.data?.clubNews?.original?.data?.original?.data || [];
            newsList.value = result;
            currentPage.value = 1;
        } catch (error) {
            console.error('Error fetching searched news:', error)
            newsList.value = []
        }
    }
}, 400)

watch(search, (newSearch) => {
    if (newSearch.length >= 3) {
        fetchSearchedNews(newSearch)
    } else {
        newsList.value = rytonnewsStore.newsData?.data?.clubNews?.original?.data?.original?.data || [];
    }
})

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
  await filterStore.fetchRytonFilterData();

  const apiData = filterStore.filterData;
  console.log("Filter Data =>", apiData);

  const competitionTypes = apiData?.news_type || [];

  competitionTypes.forEach(t => {
    filters.value.push({
      name: t.name,
      icon: t.icon_url
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) isDropdownOpen.value = false;
  });

  const carouselEl = document.querySelector('#carouselExampleIndicators');
  if (carouselEl && window.bootstrap) {
    new window.bootstrap.Carousel(carouselEl);
  }

  try {
    await rytonnewsStore.fetchRytonNewsData(domain);
    await homeStore.fetchHomeData(domain);
    newsList.value =
      rytonnewsStore.newsData?.data?.clubNews?.original?.data?.original?.data || [];
  } catch (error) {
    console.error("Error fetching ryton news data:", error);
  } finally {
    isLoading.value = false;
  }
});


const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const filtered = filteredNews.value;
  return filtered.slice(start, start + rowsPerPage.value);
});

const totalPages = computed(() =>
  Math.max(Math.ceil(filteredNews.value.length / rowsPerPage.value), 1)
);

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

</script>

<style src="@/assets/css/clubstyle.css"></style>
<style scoped>
 #overall {
     padding: 0 25px 60px 75px;
}
 #events-left {
     flex: 3;
}
 #heads {
     padding: 60px 70px 48px 90px;
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
     padding: 6px 30px;
     width: 470px;
     height: 60px;
     transition: border-color 0.2s ease;
     gap: 20px 
}
 .search-bar:hover, .search-bar:focus-within {
     border-color: #d1d5db;
}
 .search-bar i {
     color: #c0c0c0;
     font-size: 20px;
     margin-right: 8px;
}
 .search-input {
     border: none;
     outline: none;
     font-size: 20px;
     color: #333;
     flex: 1;
     background: transparent;
}
 .search-input::placeholder {
     color: #c0c0c0;
}
 .filter-buttons {
     display: flex;
     gap: 20px;
     flex-wrap: wrap;
     padding-bottom: 50px;
}
 .filter-btn {
     padding: 10px 16px;
     border: 1px solid rgba(127, 164, 131, 1);
     border-radius: 8px;
     background-color: transparent;
     color: rgba(127, 164, 131, 1);
     width: 122.71px;
     height: 40px;
     cursor: pointer;
     transition: all 0.25s ease;
     font-family: Inter;
     font-style: Regular;
     letter-spacing: 0%;
     display: flex;
     text-align: center;
     justify-content: center;
     align-items: center;
}
 .filter-btn:hover {
     border-color: #6f8c6f;
     color: #2e2e2e;
}
 .filter-btn .icones {
     width: 16px;
     height: 16px;
     transition: 0.3s;
}
 .filter-btn .label {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 14px;
     line-height: 20px;
     letter-spacing: 0%;
     margin-left: 5px 
}
 .filter-btn.active {
     background-color: #7a9c7a;
     color: #fff;
     border-color: #7a9c7a;
}
 .filter-btn.active .icones {
     filter: brightness(0) invert(1);
}
 .filter-btn.active .label {
     color: white;
}
 .hero-overlay {
     width: 820px;
}
 .events-cards {
     display: flex;
     align-items: center;
     background-color: white;
     box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
     margin-bottom: 35px;
     border-radius: 10px;
     width: 975px;
     height: 310px;
     flex-direction: row;
     gap: 50px 
}
 .events-cards img {
     max-width: 300px;
     width: 550px;
     height: 250px;
     border-radius: 8px;
     opacity: 1;
     margin-left: 20px;
     margin-right: 0;
}
 .events-cards #ename {
     font-family: Inter;
     font-weight: 500;
     font-style: Medium;
     font-size: 24px;
     line-height: 100%;
     letter-spacing: 0%;
     margin-top: -15px;
}
 .events-cards #edate {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 12px;
     line-height: 100%;
     letter-spacing: 0%;
     text-align: left;
}
 .events-cards .text-secondary {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 14px;
     line-height: 20px;
     letter-spacing: 0%;
     margin-bottom: 25px;
}
 #detail {
     margin-right: 20px;
     width: 99%;
}
 .events-cards #espeaker {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 12px;
     line-height: 100%;
     letter-spacing: 0%;
     text-align: left;
}
 #right {
     margin-left: 20px;
     flex: 1;
}
 .button-groups #view {
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
     margin-top: 15px;
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
 .more-card {
     height: 580px;
     background: white;
     width: 470px;
     padding: 20px;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
 .button-group button {
     margin-right: 8px;
}
 .event-list {
     padding-top: 20px;
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
     margin-left: -10px;
}
 .dt-paging-button {
     border: 1px solid green;
     background: #ffffff;
     color: black;
     margin: 2px;
     border-radius: 7px;
     cursor: pointer;
     font-size: 16px;
     transition: background 0.3s ease;
     width: 40px;
     height: 40px;
     padding: 0;
     margin-left: 8px;
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
 #joincontainer {
     margin-top: 270px;
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
     .events-cards {
         display: flex;
         align-items: center;
         background-color: white;
         box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
         margin-bottom: 35px;
         border-radius: 10px;
         width: 710px;
         height: 310px;
         flex-direction: row;
         gap: 50px 
    }
     .events-cards img {
         max-width: 200px;
         width: 450px;
         height: 250px;
         border-radius: 8px;
         opacity: 1;
         margin-left: 20px;
         margin-right: 0;
    }
     .events-cards #edate {
         width: 150px;
    }
     .events-cards #espeaker {
         width: 150px;
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
     .events-cards {
         display: flex;
         align-items: center;
         background-color: white;
         box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
         margin-bottom: 35px;
         border-radius: 10px;
         width: 550px;
         height: 310px;
         flex-direction: row;
         gap: 40px 
    }
     .events-cards img {
         max-width: 150px;
         width: 400px;
         height: 200px;
         border-radius: 8px;
         opacity: 1;
         margin-left: 20px;
         margin-right: 0;
    }
     .events-cards #ename {
         font-size: 20px;
    }
     .events-cards .text-secondary {
         font-size: 12px;
         line-height: 16px;
    }
     .events-cards #edate {
         width: 150px;
    }
     .events-cards #espeaker {
         width: 150px;
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
     .events-cards {
         display: flex;
         align-items: center;
         background-color: white;
         box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
         margin-bottom: 35px;
         border-radius: 10px;
         width: 700px;
         height: auto;
         flex-direction: column;
         gap: 40px;
         text-align: center;
         justify-content: center;
    }
     #detail {
         display: flex;
         align-items: center;
         justify-content: center;
         text-align: center;
    }
     .events-cards img {
         max-width: 300px;
         width: 550px;
         height: auto;
         border-radius: 8px;
         opacity: 1;
         margin-left: 20px;
         margin-right: 0;
    }
     .events-cards #ename {
         font-size: 24px;
    }
     .events-cards .text-secondary {
         font-size: 14px;
         line-height: 20px;
    }
     .events-cards #edate {
         width: 150px;
    }
     .events-cards #espeaker {
         width: 150px;
    }
     .more-card {
         width: 700px !important;
    }
     #events-left {
         order: 1;
         width: 155%;
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
         width: 250px;
         height: 60px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .events-title {
         font-size: 30px;
    }
     .events-cards {
         display: flex;
         align-items: center;
         background-color: white;
         box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
         margin-bottom: 35px;
         border-radius: 10px;
         width: 500px;
         height: auto;
         flex-direction: column;
         gap: 40px;
         text-align: center;
         justify-content: center;
    }
     #detail {
         display: flex;
         align-items: center;
         justify-content: center;
         text-align: center;
    }
     .events-cards img {
         max-width: 550px;
         width: 300px;
         height: auto;
         border-radius: 8px;
         opacity: 1;
         margin-left: 20px;
         margin-right: 0;
    }
     .events-cards #ename {
         font-size: 24px;
    }
     .events-cards .text-secondary {
         font-size: 14px;
         line-height: 20px;
    }
     .events-cards #edate {
         width: 150px;
    }
     .events-cards #espeaker {
         width: 150px;
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
     .events-header {
         gap: 20px;
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
         width: 250px;
         height: 50px;
         transition: border-color 0.2s ease;
         gap: 20px 
    }
     .events-cards {
         display: flex;
         align-items: center;
         background-color: white;
         box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
         margin-bottom: 35px;
         border-radius: 10px;
         width: 300px;
         height: auto;
         flex-direction: column;
         gap: 40px;
         text-align: center;
         justify-content: center;
    }
     #detail {
         display: flex;
         align-items: center;
         justify-content: center;
         text-align: center;
    }
     .events-cards img {
         max-width: 400px;
         width: 200px;
         height: auto;
         border-radius: 8px;
         opacity: 1;
         margin-left: 20px;
         margin-right: 0;
    }
     .events-cards #ename {
         font-size: 24px;
    }
     .events-cards .text-secondary {
         font-size: 14px;
         line-height: 20px;
    }
     .events-cards #edate {
         width: 150px;
    }
     .events-cards #espeaker {
         width: 150px;
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
     .filter-buttons {
         display: flex;
         gap: 20px;
         flex-wrap: wrap;
         padding-bottom: 50px;
    }
     .events-cards {
         display: flex;
         align-items: center;
         background-color: white;
         box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
         margin-bottom: 35px;
         border-radius: 10px;
         width: 300px;
         height: auto;
         flex-direction: column;
         gap: 40px;
         text-align: center;
         justify-content: center;
    }
     #detail {
         display: flex;
         align-items: center;
         justify-content: center;
         text-align: center;
    }
     .events-cards img {
         max-width: 400px;
         width: 200px;
         height: auto;
         border-radius: 8px;
         opacity: 1;
         margin-left: 20px;
         margin-right: 0;
    }
     .events-cards #ename {
         font-size: 24px;
    }
     .events-cards .text-secondary {
         font-size: 14px;
         line-height: 20px;
    }
     .events-cards #edate {
         width: 150px;
    }
     .events-cards #espeaker {
         width: 150px;
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
