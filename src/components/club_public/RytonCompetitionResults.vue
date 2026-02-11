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
                            <a class="nav-link" :class="{ active: $route.path === '/ryton' }" @click.prevent="router.push('/ryton'); closeNav()" :style="{ color: Color.text_color }">
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
                        <h2 class="events-title" :style="{ color: Color.text_color }">Competition Results</h2>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                             <input v-model="searchText" type="search" class="search-input" id="dt-search-1" placeholder="Search" aria-controls="example1" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container" id="season-heads">
                    <div class="season-header">
                        <h2 class="season-title" :style="{ color: Color.text_color }">
                            {{ selectedSeasonLabel }}
                        </h2>

                        <div class="custom-filter">
                            <label class="filter-label">Season</label>
                            <select class="search-bars" v-model="searchSeason">
                                <option value="">
                                    - Select -
                                </option>
                                <option v-for="opt in options" :key="opt.id" :value="opt.id">
                                    {{ opt.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section class="competition-wrapper">
                <div class="container competition-grid">
                    <div v-for="(competition, compIndex) in CompRes" :key="compIndex" class="competition-card" @click="goToSingleResult(competition.id)">
                        <div class="covers">
                            <img :src="getTopEntries(competition)[0]?.entry_image_url" />
                            <div class="resultpics-infos d-flex justify-content-between">
                                <div class="winner">
                                    <p class="entry-title" :style="{color: Color.background_color}">
                                    {{ getTopEntries(competition)[0]?.entry_image_title }}
                                    </p>
                                    <span class="author" :style="{color: Color.background_color}">
                                    by {{ getTopEntries(competition)[0]?.member_name }}
                                    </span>
                                </div>
                            <img v-if="getMedalIcon(1)" style="width: 25.23px; height: 30.16px; position: relative; text-align: right" :src="getMedalIcon(1).src"/>
                            </div>
                        </div>
                        <div class="card-body">
                            <h3 class="title">{{ competition.name }}</h3>
                            <p class="date" :style="{color: Color.accent_color}">
                                {{ formatDate(competition.start_date) }},
                                {{ formatTime(competition.start_date) }}
                            </p>
                            <div v-for="(entry, index) in getTopEntries(competition).slice(1)" :key="index" class="entry-row">
                                <img class="thumb" :src="entry.entry_image_url" />
                                <div class="info">
                                    <p class="entry-titles" :style="{color: Color.primary_color}">{{ entry.entry_image_title }}</p>
                                    <span class="authors" :style="{color: Color.text_color}">by {{ entry.member_name }}</span>
                                </div>
                                <img v-if="getMedalIcon(index + 2)" class="medal" :src="getMedalIcon(index + 2).src"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="eventcontainer">
                <div class="container">
                    <div class="events" id="events" style="background-color: #EBE6E1;" :style="{backgroundColor: Color.background_color}">
                        <h5 id="clubheading" class="heading" :style="{color: Color.text_color}">Events & Competitions</h5>
                        <h6 id="clubsub" class="subhead" :style="{color: Color.text_color, paddingTop: '6px'}">Latest and upcoming events and competitions on the club calendar</h6>
                        <div class="upcoming-sections">
                            <div class="cardddd d-flex flex-column" :style="{backgroundColor: Color.secondary_color, padding: '35px'}">
                                <h5 class="head" :style="{color: Color.text_color}">Upcoming Events</h5>
                                <div class="event-list" v-if="Events.length">
                                    <div class="event-item" v-for="event in Events.slice(0, 3)" :key="event.id || index" style="margin-bottom: 10px">
                                        <img v-if="event.featured_image_url" class="img-fluid event-img" :src="event.featured_image_url" alt="Event" @error="event.featured_image_url = null" :style="{backgroundColor: Color.primary_color}" />
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>

                                        <div class="event-details">
                                            <div class="event-info" style="display: flex; flex-direction: column">
                                                <span id="ename" :style="{color: Color.text_color}">{{ event.name }}</span>
                                                <span id="espeaker" :style="{color: Color.primary_color}">Speaker: {{ event.speaker }}</span>
                                            </div>

                                            <div class="galtext" id="edate">
                                                <small class="galtext" :style="{color: Color.text_color}">{{ formatDate(event.event_date) }}</small><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="button-group mt-auto">
                                    <router-link :to="{ name: 'EventPublic' }" custom v-slot="{ navigate }">
                                        <button class="btn btn-sm" id="view-all" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.primary_color}">
                                            View All
                                        </button>
                                    </router-link>
                                </div>
                            </div>

                            <div class="cardddd" id="calendar" :style="{border: '1px solid' + Color.primary_color, padding: '0px', height: 'auto'}">
                                <Calendar />
                            </div>

                            <div class="cardddd d-flex flex-column" :style="{backgroundColor: Color.secondary_color, padding: '35px'}">
                                <h5 class="head" :style="{color: Color.text_color}">Upcoming Competitions</h5>
                                <div class="event-list" v-if="Comps.length">
                                    <div class="event-item" v-for="comp in Comps.slice(0, 3)" :key="comp.id || index" style="margin-bottom: 10px">
                                        <img v-if="comp.featured_image_url" class="img-fluid event-img" :src="comp.featured_image_url" alt="Comp" @error="comp.featured_image_url = null" :style="{backgroundColor: Color.primary_color}"/>
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>
                                        <div class="event-details">
                                            <div class="event-info" style="display: flex; flex-direction: column">
                                                <span id="ename" :style="{color: Color.text_color}">{{ comp.name }}</span>
                                                <span id="espeaker" :style="{ color: Color.accent_color }">
                                                    Judge:
                                                    <span v-for="(judge, i) in comp.judges" :key="judge.id">
                                                        {{ judge.first_name }} {{ judge.last_name }}<span v-if="i < comp.judges.length - 1">, </span>
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="galtext" id="edate">
                                                <small class="galtext" :style="{color: Color.text_color}">{{ formatDate(comp.start_date) }}</small><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="button-group mt-auto">
                                    <router-link :to="{ name: 'CompetitionPublic' }" custom v-slot="{ navigate }">
                                        <button class="btn btn-sm" id="view-all" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.primary_color}">
                                            View All
                                        </button>
                                    </router-link>
                                </div>
                            </div>
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
import { useRytonCompResultStore } from '@/stores/club_public/RytonCompResults';
import { storeToRefs } from 'pinia';
import Loader from "@/components/LoaderAll.vue";
import Calendar from "@/components/club_public/Calendars/CalendarRyton.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '@/stores/club_admin/UserStore';
import { useRouter } from "vue-router";
import { useHomeStore } from '@/stores/club_public/ClubData';
import NotificationBell from '@/components/club_public/Notifications/NotificationBell.vue'

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
const user = useUserStore();
const { username, profile_image_url } = storeToRefs(user)
const searchText = ref("")
const searchSeason = ref("")

const handleLogout = async () => {
  await user.logout();
};

dayjs.extend(relativeTime);

const isLoading = ref(true);
const resultStore = useRytonCompResultStore();
const homeStore = useHomeStore();

const memData = computed(() => resultStore.compresData?.clubSettings?.original?.data || {});
const evData = computed(() => resultStore.compresData?.clubSettings?.original?.data?.upcoming_event_days_count || {});
const Events = computed(() => resultStore.compresData?.upcomingEvents || []);
const Comps = computed(() => resultStore.compresData?.upcomingCompetitions || []);
const Club = computed(() => resultStore.compresData?.clubSettings?.original.data.club || {});
const Color = computed(() => resultStore.compresData?.clubSettings?.original.data.settings || {});
const CompRes = computed(() => resultStore.compresData?.competitionResults?.original?.data || {})
const options = computed(() => {
  return (
    resultStore.compresData?.clubSettings?.original?.data?.club?.seasons?.map(
      season => {
        const startYear = new Date(season.start_date).getFullYear();
        const endYear = new Date(season.end_date).getFullYear();

        return {
          id: season.id,
          label: `Season ${startYear}-${endYear}`,
        };
      }
    ) || []
  );
});

const selectedSeasonLabel = computed(() => { const season = options.value.find(s => s.id === searchSeason.value); return season ? season.label : "Season"; });




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

const formatTime = (datetimeStr) => {
  const date = new Date(datetimeStr);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const goToSingleResult = (id) => {
  router.push({
    name: 'RytonSingleResults',
    params: { id }
  });
};


const getMedalIcon = (position) => {
  switch (position) {
    case 1:
      return {
        src: new URL('@/assets/icons/positions/1.svg', import.meta.url).href,
        name: 'First Medal'
      }
    case 2:
      return {
        src: new URL('@/assets/icons/positions/2.svg', import.meta.url).href,
        name: 'Second Medal'
      }
    case 3:
      return {
        src: new URL('@/assets/icons/positions/3.svg', import.meta.url).href,
        name: 'Third Medal'
      }
    default:
      return null
  }
}


const getTopEntries = (competition) => {
  return competition.competition_members
    .flatMap(m =>
      m.entries.map(e => ({
        ...e,
        member_name: m.member.first_name
      }))
    )
    .slice(0, 3)
}

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
        await homeStore.fetchHomeData(domain);
    await resultStore.fetchRytonCompResData();
    console.log(sinresultStore)
    } catch (error) {
        console.error("Error fetching home data:", error);
    } finally {
        isLoading.value = false; 
    }

});

watch(options, (opts) => {
  if (opts.length && !searchSeason.value) {
    searchSeason.value = opts.id   
  }
}, { immediate: true })

</script>
<style scoped>
#overall {
     padding: 0 25px 60px 75px;
}
 #events-left {
     flex: 3;
}
 #heads {
     padding: 60px 10px 48px 90px;
}
 #season-heads {
     padding: 33px 10px 78px 93px;
}
 .events-header, .season-header {
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
 .season-title {
     font-family: Inter;
     font-weight: 500;
     font-style: Medium;
     font-size: 28px;
     line-height: 100%;
     letter-spacing: 0%;
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
 .search-bars {
     display: flex;
     align-items: center;
     background-color: #fff;
     border: 1px solid #e5e7eb;
     border-radius: 8px;
     padding: 6px 30px;
     width: 636px;
     height: 60px;
     transition: border-color 0.2s ease;
     gap: 20px;
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
 .custom-filter {
     display: flex;
     flex-direction: column;
     gap: 6px;
}
 .filter-label {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 24px;
     line-height: 32.51px;
     letter-spacing: 0px;
}
 .filter-select {
     width: 230px;
     height: 40px;
     padding: 6px 10px;
     border: 1px solid #d7d7d7;
     border-radius: 6px;
     font-size: 14px;
     color: #444;
     background: #fff;
     outline: none;
}
 .filter-select:focus {
     border-color: #999;
}
 .covers {
     position: relative;
}
 .covers img {
     width: 100%;
     height: 218px;
     object-fit: cover;
}
 .covers-medal {
     position: absolute;
     bottom: 10px;
     right: 10px;
     width: 3px;
}
 .competition-wrapper {
     padding: 0 70px 30px 125px;
}
 .competition-grid {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     gap: 43px;
}
 .competition-card {
     background: #fff;
     border-radius: 12px;
     box-shadow: 0 3.21px 16.06px 0 rgba(0, 0, 0, 0.1);
     overflow: hidden;
     width: 393px;
     margin-bottom: 10px;
     height: 504px;
     cursor: pointer;
     transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.competition-card:hover {
     transform: translateY(-4px);
     box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}
 .cover img {
     width: 100%;
     height: 160px;
     object-fit: cover;
}
 .resultpics-infos{
     padding: 10px 20px;
     height: 50px;
}
 .card-body {
     padding: 0px 10px 10px 20px;
}
 .title {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 27.69px;
     line-height: 23.07px;
     letter-spacing: 0%;
     margin-top: 30px;
     margin-bottom: 20px;
}
 p{
     margin-bottom: 0px;
}
 .date {
     font-family: Inter;
     font-weight: 500;
     font-style: Medium;
     font-size: 10px;
     line-height: 100%;
     letter-spacing: 0%;
     color: #f97316;
     margin-bottom: 40px;
     text-align: left;
}
 .entry-row {
     display: flex;
     align-items: center;
     background: #f9f9f9;
     border-radius: 9.23px;
     padding: 10px 20px 10px 15px;
     margin-bottom: 10px;
     position: relative;
     width: 346px;
     height: 55px;
     border: 0.46px solid #333;
}
 .thumb {
     width: 42px;
     height: 42px;
     border-radius: 6px;
     object-fit: cover;
}
 .info {
     margin-left: 10px;
     flex: 1;
}
 .entry-title {
     font-family: Inter;
     font-weight: 600;
     font-style: Semi Bold;
     font-size: 14px;
     line-height: 16.57px;
     letter-spacing: 0%;
}
 .author {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 10px;
     line-height: 16.57px;
     letter-spacing: 0%;
}
 .entry-titles {
     font-family: Inter;
     font-weight: 600;
     font-style: Semi Bold;
     font-size: 13.84px;
     line-height: 16.15px;
     letter-spacing: 0%;
}
 .authors {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 9.23px;
     line-height: 16.15px;
     letter-spacing: 0%;
}
 .medal {
     width: 23.07px;
     height: 28px;
}
 .icon-circles .flickr-dots i, .flickr-dots i{
     font-size: 8px;
     padding-bottom: 8px;
     margin: 1px;
}
.site-footer {
     padding: 15px 0;
     text-align: center;
     font-size: 14px;
     color: #99816b;
     bottom: 0;
     left: 0;
     width: 100%;
     position: relative;
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
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
 .notification-mobile {
     display: none;
}
</style>