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
                            <a class="nav-link" @click.prevent="router.push('/'); closeNav()" :style="{ color: Color.text_color, fontFamily: 'Inter', fontSize: '18px' }">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytonevent" :style="{ color: Color.text_color }">
                                Events
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" :class="{ active: $route.path === '/rytoncomp' }" href="/rytoncomp" :style="{ color: Color.text_color }">
                                Competitions
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/rytongal" :style="{ color: Color.text_color }">
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
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
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
                            <div class="card-section" style="width: 100%;">
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
            </div>
        </div>

        <div class="contents">
            <section>
                <div class="container" id="heads">
                    <div class="events-header">
                        <h2 class="events-title" :style="{ color: Color.text_color }">Competitions</h2>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input v-model="searchQuery" type="search" class="search-input" id="dt-search-1" placeholder="Search competitions..." aria-controls="example1" />
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
                                    <div class="filter-buttons">
                                        <button v-for="filter in filters" :key="filter" :class="['filter-btn', { active: activeFilter === filter }]" @click="setActiveFilter(filter)">
                                            {{ filter }}
                                        </button>
                                    </div>
                                    <div class="mt-4">
                                        <div v-if="paginatedComps.length">
                                            <div v-for="e in paginatedComps" :key="e.id" class="custom-card p-3" :class="{
    'upcoming-card': dayjs(e.start_date).isAfter(dayjs()),
    'result-card': dayjs(e.result_announcement_date).isBefore(dayjs())
  }">
                                                <img v-if="e.featured_image_url" :src="e.featured_image_url" :alt="e.name" :style="{width: '550px'}"/>
                                                <div class="flex-grow-1 d-flex flex-column justify-content-between" id="detail">
                                                    <div class="d-flex w-100 justify-content-between align-items-center">
                                                        <h5 id="ename" :style="{color: Color.text_color}">{{ e.name || 'Untitled Competition' }}</h5>
                                                    </div>
                                                    <p class="galtext" id="edate" :style="{color: Color.accent_color}">
                                                        {{ formatDate(e.start_date) || 'Date Not Available' }}
                                                    </p>
                                                    <p class="text-secondary"  :style="{color: Color.text_color}">
                                                        {{ e.description || 'No description provided.' }}
                                                    </p>
                                                    <p id="espeaker" :style="{color: Color.accent_color}">
                                                        {{"Judge: " + e.judging_panel}}
                                                    </p>
                                                    <div class="button-group mt-auto d-flex">
                                                        <router-link :to="{ name: 'CompetitionSinglePublic', params: { id: e.id } }" custom v-slot="{ navigate }">
                                                            <button class="btn me-2" id="view" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.primary_color}">View Details</button>
                                                        </router-link>                                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-else class="text-center text-muted">No Competitions found.</div>

                                        <nav v-if="paginatedComps.length">
                                            <ul class="pagination justify-content-center">
                                                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                                    <button class="page-link" @click="prevPage">Previous</button>
                                                </li>
                                                <li class="page-item disabled">
                                                    <span class="page-link">
                                                        Page {{ currentPage }} of {{ totalPages }}
                                                    </span>
                                                </li>
                                                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                                    <button class="page-link" @click="nextPage">Next</button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="col-md-4">
                            <section>
                                <div class="container" id="right">

                                    <div class="cardddd" style="padding: 0px" id="cal">
                                        <CalendarEvent />
                                    </div>

                                    <div class="cardddd d-flex flex-column" :style="{ padding: '35px'}" id="eve">
                                        <h5 class="head">More Competitions</h5>
                                        <div class="event-list" v-if="Comps.length">
                                            <div class="event-item" v-for="c in Comps.slice(0, 6)" :key="c.id" style="margin-bottom: 10px">
                                                <img v-if="c.featured_image_url" class="img-fluid event-img" :src="c.featured_image_url" :alt="c.name" @error="c.featured_image_url = null"/>
                                                <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                                </div>
                                                <div class="event-details">
                                                    <div class="event-info" style="display: flex; flex-direction: column">
                                                        <span id="ename">{{ c.name }}</span>
                                                        <span id="espeaker" :style="{color: Color.accent_color}">Judge: {{ c.judging_panel }}</span>
                                                    </div>

                                                    <div class="event-time" id="edate">
                                                        <small class="event-date galtext" :style="{color: Color.accent_color}">{{ formatDate(c.start_date) }}</small><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="cardddd" :style="{padding: '35px'}">
                                        <h5 class="head">Seasons</h5>
                                        <div class="session-container" v-if="sessions.length">
                                            <div v-for="session in sessions" :key="session.id" class="session-card" :class="session.status">
                                                <div class="session-header">
                                                    <h3 class="clubhead">{{ formatedDate(session.start_date) }} - {{ formatedDate(session.end_date) }}</h3>
                                                    <span class="status" :class="session.status.toLowerCase()">
                                                    <span class="dot"></span> {{ session.status }}</span>
                                                </div>

                                                <div class="session-body">
                                                    <div class="info">
                                                        <i class="icon">🏅</i> {{ session.competitions_count }} Competitions
                                                    </div>
                                                    <div class="info">
                                                        <i class="icon">📅</i> {{ session.events_count }} Events
                                                    </div>
                                                </div>

                                                <div class="session-footer" :style="{color: Color.primary_color}">
                                                    {{ formatsDate(session.start_date) }} – {{ formatsDate(session.end_date) }}
                                                </div>
                                            </div>
                                        </div>

                                        <div v-else class="text-center text-muted py-4">
                                            No seasons found.
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
import { useRytonCompStore } from '@/stores/club_public/RytonComp';
import { useRytonEventStore } from '@/stores/club_public/RytonEvent';
import Loader from "@/components/LoaderAll.vue";
import CalendarEvent from "@/components/club_public/Calendars/CalendarRytonEvent.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from "vue-router";
import apiClient from '@/api/axios'


const router = useRouter();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);
const filters = ['Upcoming Competitions', 'Results'];
const activeFilter = ref('Upcoming Competitions');
const searchQuery = ref('')
const compsList = computed(() => rytoncompStore.compData?.data?.upcomingCompetitions || []);

const setActiveFilter = (filter) => {
  activeFilter.value = filter;
  currentPage.value = 1;
};

const rytoncompStore = useRytonCompStore();
const rytoneventStore = useRytonEventStore();
dayjs.extend(relativeTime);
const isLoading = ref(true);


const memData = computed(() => rytoncompStore.compData?.data?.clubSettings?.original?.data || {});
const evData = computed(() => rytoncompStore.compData?.data?.clubSettings?.original?.data?.upcoming_event_days_count || {});
const Comps = computed(() => rytoncompStore.compData?.data?.upcomingCompetitions || []);
const sessions = computed(() => rytoncompStore.compData?.data?.clubSettings?.original?.data?.seasons || {});
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});
  const domain = window.location.hostname.split('.')[0];

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

const fetchSearchedComps = debounce(async (query) => {
    if (query.length >= 4 && query !== lastSearched) {
        lastSearched = query
        try {
            const response = await apiClient.get('/club/public/competitions', {
                params: {
                    search_term: query
                }
            })
            const result = response?.data?.data?.upcomingCompetitions || [];
            compsList.value = result;
            currentPage.value = 1;
        } catch (error) {
            console.error('Error fetching searched competitions:', error)
            compsList.value = []
        }
    }
}, 400)

watch(searchQuery , (newSearch) => {
    if (newSearch.length >= 3) {
        fetchSearchedComps(newSearch)
    } else {
        compsList.value = rytoncompStore.compData?.data?.upcomingCompetitions || []
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

const formatsDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  
  return ` ${month} ${year}`;
};

const formatedDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  const year = date.getFullYear();
  
  return ` ${year}`;
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
    await rytoncompStore.fetchRytonCompData(domain);
    await rytoneventStore.fetchRytonEventData(domain);
  } catch (error) {
    console.error("Error fetching ryton competition data:", error);
  } finally {
    isLoading.value = false; 
  }
});

const filteredComps = computed(() => {
  const now = dayjs();
  return compsList.value.filter((comp) => {
    const startDate = dayjs(comp.start_date);
    const resultDate = dayjs(comp.result_announcement_date);

    if (activeFilter.value === 'Upcoming Competitions') {
      return startDate.isAfter(now);
    } else if (activeFilter.value === 'Results') {
      return resultDate.isBefore(now);
    }
    return true;
  });
});

const searchedComps = computed(() => {
  if (!searchQuery.value.trim()) return filteredComps.value;

  const query = searchQuery.value.toLowerCase();
  return filteredComps.value.filter((comp) =>
    (comp.name || '').toLowerCase().includes(query) ||
    (comp.description || '').toLowerCase().includes(query) ||
    (comp.judging_panel || '').toLowerCase().includes(query)
  );
});


const paginatedComps = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  return searchedComps.value.slice(start, start + rowsPerPage.value);
});



const totalPages = computed(() =>
  Math.max(Math.ceil(searchedComps.value.length / rowsPerPage.value), 1)
);

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

</script>

<style src="@/assets/css/clubstyle.css"></style>
<style scoped>
.hero-overlay {
    width: 1025px;
}
#overall {
     padding: 0 25px 50px 80px;
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
.filter-buttons {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  padding-bottom: 50px;
}

.filter-btn {
  padding: 10px 16px;
  border: 1px solid rgba(127, 164, 131, 1);
  border-radius: 8px;
  background-color: transparent;
  color: rgba(127, 164, 131, 1);
  width: 370px;
  height: 40px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 16px;
line-height: 100%;
letter-spacing: 0%;
}

.filter-btn:hover {
  border-color: #6f8c6f;
  color: #2e2e2e;
}

.filter-btn.active {
  background-color: #7a9c7a; /* soft green */
  color: #fff;
  border-color: #7a9c7a;
}

 .custom-card {
     display: flex;
     align-items: center;
     background-color: white;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
     margin-bottom: 35px;
     border-radius: 10px;
     width: 975px;
     height: 310px;
     flex-direction: row;
     gap: 50px
}
 .custom-card img {
     max-width: 300px;
     width: 300px;
     height: 250px;
     border-radius: 8px;
     opacity: 1;
     margin-left: 20px;
     margin-right: 0;
}
 .custom-card #ename {
     font-family: Inter;
     font-weight: 500;
     font-style: Medium;
     font-size: 24px;
     line-height: 100%;
     letter-spacing: 0%;
     margin-bottom: 10px;
}
 .custom-card #edate {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 12px;
     line-height: 100%;
     letter-spacing: 0%;
     text-align: left;
}
 .custom-card .text-secondary {
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
 .custom-card #espeaker {
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
}
 .button-group #view {
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
 .cardddd {
     background: white;
     width: 470px;
     padding: 20px;
     height: 390px;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

}
 .cardddd:first-child {
     background: white;
     width: 470px;
     padding: 20px;
     height: auto;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.cardddd:last-child {
    height: 470px;
}
#cal {
    height: auto;
}
#eve {
    height: 580px;
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
     font-size: 14px;
     line-height: 100%;
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
 @media only screen and (max-width: 767px) {
     .comments-cards{
         width: 100%;
         margin: 0 auto;
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
}
/* Default: hide mobile notification */
 .notification-mobile {
     display: none;
}

.session-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
}

.session-card {
    width: 410px;
    height: 160px;
  background: rgba(236, 237, 230, 0.3);
  border: 1px solid rgba(51, 51, 51, 0.2);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}

.session-card:hover {
  transform: translateY(-2px);
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.session-header h3 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.status {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  border-radius: 20px;
  padding: 3px 10px;
}

.status .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
}

.status.active {
  background: #eaf8ef;
  color: #22c55e;
}

.status.active .dot {
  background: #22c55e;
}

.status.inactive {
  background: #f0f0f0;
  color: #777;
}

.status.inactive .dot {
  background: #bdbdbd;
}

.session-body {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}

.info {
  font-size: 15px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 16px;
}

.session-footer {
  font-size: 14px;
  color: #999;
}

</style>
