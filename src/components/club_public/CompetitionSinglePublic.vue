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
                            <a class="nav-link" :class="{ active: $route.path === '/rytonsinglecomp' }" href="/rytoncomp" :style="{ color: Color.text_color }">
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
                        <nav class="breadcrumb">
                            <router-link to="/rytoncomp" class="events-title breadcrumb-item" :style="{color: Color.accent_color}">Competitions</router-link>
                            <span class="events-title breadcrumb-separator" :style="{color: Color.accent_color}">></span>
                            <span class="events-title breadcrumb-item active">{{ sincomp.name || 'Loading...' }}</span>
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
                                        <img :src="sincomp.featured_image" alt="Meeting" style="max-width: 850px; height: 350px; border-radius: 8px"/>
                                        <h5 class="head" :style="{color: Color.text_color}">{{sincomp.name}}</h5>
                                        <p id="edate" :style="{color: Color.accent_color}">{{formatDate(sincomp.start_date)}}</p>
                                        <p class="text-secondary" :style="{color: Color.text_color}">
                                            {{sincomp.description}}
                                        </p>
                                            
                                        <div class="divider2"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Competition Type</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">{{sincomp.print_vs_digital}}</h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Competition Judge</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">{{sincomp.judging_panel}}</h5>
                                            </div>
                                        </div>
            
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Theme</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">{{sincomp.theme_id}}</h5>
                                            </div>
                                        </div>
        
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Colour/Monochrome</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">{{sincomp.color_vs_mono}}</h5>
                                            </div>
                                        </div>
        
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Status</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">{{sincomp.status}}</h5>
                                            </div>
                                        </div>
        
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Gear Required</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">Yes</h5>
                                            </div>
                                        </div>
        
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Max Number of Entries per Participants</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">
                                                    {{sincomp.max_entries_print + " Images"}}
                                                </h5>
                                            </div>
                                        </div>
                                            
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Deadline for Submission</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">{{ formatDate(sincomp.submission_deadline )}}</h5>
                                            </div>
                                        </div>
                
                                        <div class="divider3"></div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">Result Announcement Date</h5>
                                            </div>
                                            <div class="col-md-6">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">
                                                    {{ formatDate(sincomp.result_announcement_date) }}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>
                                        <template v-if="sincomp.status === 'completed'">
                                            <div class="divider1"></div>
                                            <div class="divider2"></div>

                                            <div style="height: auto; border: none" :style="{backgroundColor: Color.background_color}">
                                                <div class="d-flex justify-content-between align-items-end mb-3" id="cl">
                                                    <div style="align-items: flex-end">
                                                        <h5 class="head" :style="{color: Color.text_color, marginBottom: '15px'}">Competition Result</h5>
                                                    </div>
                                                </div>
                                                <div class="resultpics">
                                                    <div v-for="(item, index) in sincomp.entries" :key="item.id || index" class="resultpics-items">
                                                        <div v-if="item.entry_image && item.entry_image.length">
                                                            <img :src="item.entry_image" :alt="item.entry_image_title || 'Competition entry image'" />
                                                            <div class="resultpics-infos" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.7) }" >
                                                                <div :style="{ color: Color.background_color, width: '200px', textAlign: 'left' }">
                                                                    {{ item.entry_image_title + " by " + item.member_name}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </template>
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
                                            <div v-for="session in sessions" :key="session.id" class="session-card" :class="session.status.toLowerCase()">
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
            <pre>{{rytonsinglecompStore.sincompData?.data?.competition?.original?.data?.entries}}</pre>
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
import { useRytonSingleCompStore } from '@/stores/club_public/RytonSingleComp';
import { useRytonEventStore } from '@/stores/club_public/RytonEvent';
import { useRytonCompStore } from '@/stores/club_public/RytonComp';
import Loader from "@/components/LoaderAll.vue";
import CalendarEvent from "@/components/club_public/Calendars/CalendarRytonEvent.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const route = useRoute();
const router = useRouter();

const rytonsinglecompStore = useRytonSingleCompStore();
const rytoncompStore = useRytonCompStore();
const rytoneventStore = useRytonEventStore();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);

const isLoading = ref(true);

const memData = computed(() => rytoncompStore.compData?.data?.clubSettings?.original?.data || {});
const evData = computed(() => rytoncompStore.compData?.data?.clubSettings?.original?.data?.upcoming_event_days_count || {});
const Comps = computed(() => rytoncompStore.compData?.data?.upcomingCompetitions || []);
const sincomp = computed(() => rytonsinglecompStore.sincompData?.data?.competition?.original?.data || {});
const clubSettings = computed(() => rytonsinglecompStore.sincompData?.data?.clubSettings?.original?.data || {});
const Color = computed(() => clubSettings.value.settings || {});
const Club = computed(() => clubSettings.value.club || {});
const sessions = computed(() => clubSettings.value.seasons || []);

const domain = window.location.hostname.split('.')[0];


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
    console.log(Comps)
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) isDropdownOpen.value = false;
  });

  const carouselEl = document.querySelector('#carouselExampleIndicators');
  if (carouselEl && window.bootstrap) {
    new window.bootstrap.Carousel(carouselEl);
  }

  try {
    const id = route.params.id;
    await rytonsinglecompStore.fetchRytonSingleCompData(id);
    await rytoncompStore.fetchRytonCompData(domain);
    await rytoneventStore.fetchRytonEventData(domain);
  } catch (error) {
    console.error("Error fetching ryton competition data:", error);
  } finally {
    isLoading.value = false;
  }
});

</script>


<style scoped>
#heads {
    padding: 60px 70px 48px 50px;
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
}
.card .text-secondary {
    font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 20px;
line-height: 24px;
letter-spacing: 0%;

}
 #right {
     margin-left: 20px;
}
 .button-group #view {
     max-width: 130px;
     height: 40px;
     opacity: 1;
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
.resultpics {
  margin-top: -15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}

.resultpics-items {
  position: relative;
  overflow: hidden;
}
.resultpics-items img {
  width: 100%;
  height: 365px;
  object-fit: cover;
  object-position: top;
}

.resultpics-infos {
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
  height: 60px;
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
.cardddd {
     background: white;
     width: 470px;
     padding: 20px;
     height: 390px;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

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
     margin-top: 20px;
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
  border: 1px solid black;
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
</style>
