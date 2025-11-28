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
                            <a class="nav-link" :class="{ active: $route.path === '/rytonsingleevent' }" href="/rytonevent" :style="{ color: Color.text_color }">
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
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[2]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div v-if="Events.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img v-if="Events[0].images" :src="Events[0].featured_image_url" :alt="Events[0].name" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2" :style="{color: Color.text_color}">{{ Events[0].name || 'Untitled Event' }}</h5>
                                                <div class="d-flex w-100 justify-content-between align-items-center">
                                                    <p class="date mb-0" :style="{color: Color.accent_color}">{{ formatDate(Events[0].event_date) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>                  
                                            <p class="text-secondary" :style="{color: Color.text_color}">
                                                {{ Events[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-auto d-flex event-button">
                                            <router-link :to="{ name: 'EventSinglePublic', params: { id: Events[0].id } }" custom v-slot="{ navigate }">
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
                            <router-link to="/rytonevent" class="events-title breadcrumb-item" :style="{color: Color.accent_color}">Events</router-link>
                            <span class="events-title breadcrumb-separator" :style="{color: Color.accent_color}">></span>
                            <span class="events-title breadcrumb-item active">{{  sinevent.name }}</span>
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
                                <div class="container" id="events-left">
                                    <div class="card">
                                        <img :src=" sinevent.featured_image_url" :alt=" sinevent.name" style="max-width: 850px; height: 350px; border-radius: 8px"/>
                                        <div class="d-flex justify-content-between">
                                            <h5 class="head" :style="{ color: Color.text_color }">{{  sinevent.name }}</h5>
                                            <h5 class="head" :style="{ color: Color.text_color }">{{ sinevent.types[0].name }}</h5>
                                        </div>
                                        <p id="edate" :style="{ color: Color.accent_color }">
                                            {{ formatDate( sinevent.event_date) }}
                                        </p>

                                        <p class="text-secondary" :style="{ color: Color.text_color }" style="margin-bottom: 25px" v-html="sinevent.description"></p>
                                        <p class="text-secondary" :style="{ color: Color.text_color }" style="margin-bottom: 25px" v-html="sinevent.description"></p>
                                        <p class="text-secondary" :style="{ color: Color.text_color }" v-html="sinevent.description"></p>

                                        <div class="divider4"></div>

                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                    Event Duration
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                    {{  sinevent.duration }}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>

                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                    Event Speaker
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                    {{  sinevent.speaker }}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>

                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                    Event Speaker Club
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                    {{  sinevent.speaker_club }}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>

                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                    Event Speaker Qualifications
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                    {{  sinevent.speaker_qualification }}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>

                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                    Event Status
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                    {{  sinevent.status }}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>

                                        <template v-if=" sinevent.status !== 'completed'">
                                            <div class="row" id="eventdetails">
                                                <div class="col-md-5">
                                                    <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                        Gear Required
                                                    </h5>
                                                </div>
                                                <div class="col-md-7">
                                                    <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                        {{  sinevent.required_gear }}
                                                    </h5>
                                                </div>
                                            </div>
                                        <div class="divider3"></div>

                                        </template>

                                        
                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">
                                                    Tags / Keywords
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">
                                                    {{ sinevent.tags_keywords}}
                                                </h5>
                                            </div>
                                        </div>
                                        
                                        <div class="divider3"></div>
                                        
                                        <div class="row" id="eventdetails">
                                            <div class="col-md-5">
                                                <h5 class="clubhead" :style="{color: Color.accent_color}">
                                                    Link to related page
                                                </h5>
                                            </div>
                                            <div class="col-md-7">
                                                <h5 class="clubhead" :style="{color: Color.text_color}">
                                                    {{ sinevent.url}}
                                                </h5>
                                            </div>
                                        </div>

                                        <div class="divider3"></div>

                                        <template v-if=" sinevent.status !== 'completed'">
                                            <div class="row" id="eventdetails">
                                                <div class="col-md-5">
                                                    <h5 class="clubhead" :style="{ color: Color.accent_color }">
                                                        RSVP Details
                                                    </h5>
                                                </div>
                                                <div class="col-md-7">
                                                    <h5 class="clubhead" :style="{ color: Color.text_color }">
                                                        {{  sinevent.rsvp_detail }}
                                                    </h5>
                                                </div>
                                            </div>
                                        </template>
                                            


                                        <template v-if=" sinevent.status === 'completed'">
                                            <div class="divider5"></div>
                                            <div style="height: auto; border: none" :style="{backgroundColor: Color.background_color}">
                                                <div class="d-flex justify-content-between align-items-end mb-3" id="cl">
                                                    <div style="align-items: flex-end">
                                                        <h5 class="head" :style="{color: Color.text_color, marginBottom: '15px'}" style="margin-top: 0px;">Event Gallery</h5>
                                                    </div>
                                                </div>

                                                <div class="resultpics">
                                                    <div v-for="(item, index) in  sinevent.images" :key="item.id || index" class="resultpics-items">
                                                        <div v-if="item.image && item.image.length">
                                                            <img v-if="item.image_url" :src="item.image_url" :alt="item.gallery_name" style="object-fit: cover; object-position: top" />
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

                                    <div class="calendar-card" style="padding: 0px" id="cal">
                                        <CalendarEvent />
                                    </div>

                                    <div class="more-card d-flex flex-column" :style="{ padding: '35px', height: 'auto'}" id="eve">
                                        <h5 class="head">More Events</h5>
                                        <div class="event-list" v-if="Events.length">
                                            <div class="event-item" v-for="c in Events.slice(0, 6)" :key="c.id" style="margin-bottom: 10px; gap: 20px">
                                                <img v-if="c.featured_image_url" class="img-fluid event-img" :src="c.featured_image_url" :alt="c.name" @error="c.featured_image_url = null"/>
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

                                    <div class="season-card" :style="{padding: '35px'}">
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
                                                        <img :src="Competition" alt="point-icon" style="width: 16px; height: 16px" /> {{ session.competitions_count }} Competitions
                                                    </div>
                                                    <div class="info">
                                                        <img :src="Event" alt="event" style="width: 16px; height: 16px" /> {{ session.events_count }} Events
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRytonSingleEventStore } from '@/stores/club_public/RytonSingleEvent';
import { useRytonEventStore } from '@/stores/club_public/RytonEvent';
import Loader from "@/components/LoaderAll.vue";
import CalendarEvent from "@/components/club_public/Calendars/CalendarRytonEvent.vue";
import Pro from "@/assets/icons/event_list/pro.svg";
import Cal from "@/assets/icons/event_list/cal.svg";
import Cam from "@/assets/icons/event_list/cam.svg";
import Mess from "@/assets/icons/event_list/mess.svg";
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/club_admin/UserStore';
import { useHomeStore } from '@/stores/club_public/ClubData';
import relativeTime from 'dayjs/plugin/relativeTime';
import { storeToRefs } from 'pinia'
import Event from "@/assets/icons/navigation/events.svg"
import Competition from "@/assets/icons/navigation/competition.svg"


dayjs.extend(relativeTime);
const route = useRoute();
const router = useRouter();
const user = useUserStore();

const rytonsingleeventStore = useRytonSingleEventStore();
const rytoneventStore = useRytonEventStore();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);
const homeStore = useHomeStore();
const isLoading = ref(true);

const { username, profile_image_url } = storeToRefs(user)
const Events = computed(() => rytoneventStore.eventData?.data?.events?.original?.data?.original?.data || []);
const sinevent = computed(() => rytonsingleeventStore.sineventData?.data?.event?.original?.data || {});
const clubSettings = computed(() => rytonsingleeventStore.sineventData?.data?.clubSettings?.original?.data || {});
const Color = computed(() => clubSettings.value.settings || {});
const Club = computed(() => clubSettings.value.club || {});
const sessions = computed(() => clubSettings.value.seasons || []);
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
  const suffix = day % 10 === 1 && day !== 11 ? "st" :
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
    console.log("Events", sinevent)
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) isDropdownOpen.value = false;
  });

  const carouselEl = document.querySelector('#carouselExampleIndicators');
  if (carouselEl && window.bootstrap) {
    new window.bootstrap.Carousel(carouselEl);
  }

  try {
     const id = route.params.id;
    await rytonsingleeventStore.fetchRytonSingleEventData(id);
    await rytoneventStore.fetchRytonEventData(domain);
    await homeStore.fetchHomeData(domain);
  } catch (error) {
    console.error("Error fetching ryton single event data:", error);
  } finally {
    isLoading.value = false; 
  }
});

</script>


<style src="@/assets/css/clubstyle.css"></style>
<style scoped>
#overall {
     padding: 0 0px 60px 48px;
}
 #heads {
     padding: 70px 68px 38px 80px;
}
 #eventdetails {
     margin-left: -20px 
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
}
 .card #edate {
     margin-bottom: 50px;
     margin-top: 5px;
}
 .card .text-secondary {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 20px;
     line-height: 24px;
     letter-spacing: 0%;
     margin-left: -10px;
     margin-right: 10px;
     width: 1100px;
}
 .resultpics {
     margin-top: 50px;
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     width: 100%;
     margin-bottom: -107px;
}
 .resultpics-items {
     position: relative;
     overflow: hidden;
}
 .resultpics-items img {
     width: 100%;
     height: 275px;
     object-fit: cover;
     object-position: top;
}
 #joincontainer {
     margin-top: 330px;
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
 .calendar-card {
     background: white;
     width: 470px;
     padding: 20px;
     height: auto;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
     margin-top: -5px;
}
 .season-card {
     height: 470px;
     background: white;
     width: 470px;
     padding: 20px;
     border-radius: 10px;
     margin-bottom: 20px;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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
     padding-top: 20px;
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
 .notification-mobile {
     display: none;
}
 .session-container {
     display: flex;
     flex-direction: column;
     gap: 20px;
     padding: 25px 0px;
}
 .session-card {
     width: 410px;
     height: 160px;
     background: rgba(236, 237, 230, 0.3);
     border: 1px solid rgba(51, 51, 51, 0.2);
     border-radius: 12px;
     padding: 15px 10px;
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
     border-radius: 20px;
     padding: 3px 10px;
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 11.85px;
     line-height: 100%;
     letter-spacing: 0%;
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
     margin: 40px 40px 20px 20px;
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
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 12px;
     line-height: 100%;
     letter-spacing: 0%;
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
 #right {
     margin-left: 20px;
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
     .resultpics {
         margin-top: -15px;
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         width: 100%;
    }
     .divider4, .divider5 {
         width: 100% 
    }
     .resultpics-items {
         position: relative;
         overflow: hidden;
    }
     .resultpics-items img {
         width: 100%;
         height: 275px;
         object-fit: cover;
         object-position: top;
    }
     .calendar-card, .season-card, .more-card {
         width: 110% !important;
    }
     #right {
         margin-left: -10px;
    }
     #edate {
         width: 130px;
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     .event-date {
         width: 130px;
         display: block;
    }
     #ename {
         font-size: 13px 
    }
     .session-card {
         width: 100%;
    }
     .info {
         font-size: 13px;
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
     .resultpics {
         margin-top: -15px;
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         width: 100%;
    }
     .resultpics-items {
         position: relative;
         overflow: hidden;
    }
     .resultpics-items img {
         width: 100%;
         height: 275px;
         object-fit: cover;
         object-position: top;
    }
     .calendar-card, .season-card, .more-card {
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
         width: 130px;
         font-family: Inter;
         font-weight: 400;
         font-style: Regular;
         font-size: 12px;
         line-height: 100%;
         letter-spacing: 0%;
         text-align: left;
    }
     .event-date {
         width: 130px;
         display: block;
         text-align: left;
    }
     #ename {
         font-size: 14px 
    }
     .session-card {
         width: 100%;
    }
     .session-body {
         margin: 40px 20px 20px 0;
    }
     .info {
         font-size: 13px;
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
     .resultpics {
         grid-template-columns: repeat(3, 1fr) !important;
         width: 150%;
    }
     .resultpics-items img {
         width: 100% !important;
         max-width: 100% !important;
    }
     .calendar-card, .season-card, .more-card {
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
     .session-card {
         width: 100%;
    }
     .session-body {
         margin: 40px 40px 20px 20px;
    }
     .info {
         font-size: 15px;
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
     .calendar-card, .season-card, .more-card {
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
     .resultpics {
         grid-template-columns: repeat(2, 1fr) !important;
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
     .session-card {
         width: 100%;
    }
     .session-body {
         margin: 40px 40px 20px 20px;
    }
     .info {
         font-size: 15px;
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
     .calendar-card, .season-card, .more-card {
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
     .resultpics {
         grid-template-columns: repeat(1, 1fr) !important;
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
     .session-card {
         width: 100%;
    }
     .session-body {
         margin: 40px 20px 20px 0;
    }
     .info {
         font-size: 13px;
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
     .calendar-card, .season-card, .more-card {
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
     .session-card {
         width: 100%;
    }
     .session-body {
         margin: 40px 20px 20px 0;
    }
     .info {
         font-size: 13px;
    }
}
</style>
