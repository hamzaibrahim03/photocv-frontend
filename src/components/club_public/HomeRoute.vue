<template>
<div :style="{ backgroundColor: homeStore.clubSettings.background_color, fontFamily: homeStore.clubSettings.fonts }">
    <nav class="navbar navbar-expand-lg custom-navbar shadow-sm" :style="{ position: 'sticky', top: '0', zIndex: '1001',backgroundColor: homeStore.clubSettings.background_color }">
        <div class="container-fluid">
            <div class="left-header">
                <img :src="homeStore.clubSettings.logo_url" alt="Ryton"/>
            </div>

            <div class="collapse navbar-collapse justify-content-center">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item" v-for="(item, i) in navItems" :key="i">
                        <a class="nav-link" :class="{ active: currentRoute === item.to }" :href="item.to" :style="{ color: homeStore.clubSettings.text_color }">
                            {{ item.label }}
                        </a>
                    </li>
                </ul>
            </div>

            <div class="right-header d-flex align-items-center">
                <a href="notification.html" class="icon me-3" :style="{ color: homeStore.clubSettings.text_color }"><i class="bi bi-bell"></i></a>

                <div class="admin-dropdown d-flex align-items-center position-relative">
                    <img :src="user.profile_image" alt="Profile" class="profile-img" />
                    <span class="ms-2" :style="{ color: homeStore.clubSettings.text_color }">
                        {{ user.username }}
                    </span>

                    <div class="dropdown-menu">
                        <a href="/login">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="hero-section" :style="{ background: `url(${homeStore.clubSettings.cover_image_url}) no-repeat center center / cover`, height: '100vh', color: '#E7EFF233' }">
        <div class="hero-overlay">
            <h1 :style="{ color: homeStore.clubSettings.text_color }">{{homeStore.homeData?.data?.clubSettings.original.data.club.club_name}}</h1>
            <p class="text" :style="{ color: homeStore.clubSettings.text_color }">{{homeStore.homeData?.data?.clubSettings.original.data.club.about}}</p>
            <button id="view" :style="{ maxWidth: '200px', height: '60px', color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color }"> Join Our Club </button>
            <p class="location" :style="{ color: homeStore.clubSettings.text_color }">An NYCE Club based in Apps, North East England</p>
            <div class="row">
                <div class="icon-circles me-3" :style="{ color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.background_color }"><i class="fab fa-facebook-f"></i>
                    </div>
                <div class="icon-circles me-3" :style="{ color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.background_color }"><i class="fab fa-instagram"></i>
                    </div>
                <div class="icon-circles me-3" :style="{ color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.background_color }"><i class="fab fa-twitter"></i>
                    </div>
            </div>
        </div>
    </div>

    <section class="contents">
        <div class="card" style="padding-bottom: 15px; height: auto; border: none" :style="{backgroundColor: homeStore.clubSettings.background_color}">
            <div class="row">
                <div class="col-md-3">
                    <img :src="homeStore.clubSettings.header_img_url" alt="hero" style="height: 103%; width: 100%; border-radius: 7px"  :style="{ backgroundColor: homeStore.clubSettings.background_color }"/>
                </div>
                <div class="col-md-9">
                    <p class="role" style="margin-top: 20px" :style="{color: homeStore.clubSettings.text_color}">
                        {{homeStore.clubSettings.header_title}}
                    </p>
                    <p :style="{ fontFamily: 'Inter', fontWeight: '400', fontSize: '13.5px', letterSpacing: '2px', lineHeight: '30px', textAlign: 'left', marginRight: '10px', color: homeStore.clubSettings.text_color }">
                        {{homeStore.clubSettings.header_description}}
                    </p>
                </div>
            </div>
        </div>

        <div class="club-banner d-flex justify-content-between align-items-center px-4 py-2" :style="{backgroundColor: homeStore.clubSettings.primary_color}">
            <div class="text-end text-white">
                <div class="fw-bold" style="text-align: left" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.homeData?.data?.clubSettings.original.data.club.club_name}}</div>
                <small class="d-block" style="text-align: left" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.homeData?.data?.clubSettings.original.data.club.tag_line}}</small>
            </div>

            <div class="d-flex gap-3">
                <div class="icon-circles" :style="{ color: homeStore.clubSettings.primary_color, backgroundColor: homeStore.clubSettings.text_color }">
                    <i class="fab fa-facebook-f"></i>
                </div>
                <div class="icon-circles" :style="{ color: homeStore.clubSettings.primary_color, backgroundColor: homeStore.clubSettings.text_color }">
                    <i class="fab fa-instagram"></i>
                </div>
                <div class="icon-circles" :style="{ color: homeStore.clubSettings.primary_color, backgroundColor: homeStore.clubSettings.text_color }">
                    <i class="fab fa-twitter"></i>
                </div>
            </div>
        </div>

        <div class="card" style="height: auto; border: none" :style="{backgroundColor: homeStore.clubSettings.background_color}">
            <div class="d-flex justify-content-between mb-3" style="padding-right: 20px; padding-top: 50px;">
                <div>
                    <h5 class="name" :style="{color: homeStore.clubSettings.text_color}">Club Galleries</h5>
                    <p class="role" :style="{color: homeStore.clubSettings.text_color, paddingTop: '10px'}">A preview of galleries made up of amazing photographs from club members</p>
                </div>

                <router-link to="/club_gallery" custom v-slot="{ navigate }">
                    <button class="btn" id="view" @click="navigate" :style="{maxWidth: '230px', height: '50px', color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color}">View All Club Galleries</button>
                </router-link>
            </div>
            <div v-for="(row, rowIndex) in chunkCards" :key="rowIndex" class="row-wrapper">
                <div class="pics">
                    <div v-for="(item, index) in row" :key="item.id || index" class="pics-item">
                        <div v-if="item.photos && item.photos.length">
                            <img :src="item.photos[0].image" :alt="item.photos[0].title" style="max-width: 100%; height: auto; max-height: 100%" />
                            <div class="pics-info" :style="{backgroundColor: homeStore.clubSettings.secondary_color, color: homeStore.clubSettings.text_color}">{{ item.gallery_name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="events" style="background-color: #EBE6E1;" :style="{backgroundColor: homeStore.clubSettings.background_color}">
            <h5 class="name" :style="{color: homeStore.clubSettings.text_color,paddingLeft: '20px', paddingTop: '40px'}">Events & Competitions</h5>
            <h6 class="role" :style="{color: homeStore.clubSettings.text_color,paddingLeft: '20px', paddingTop: '10px'}">Latest and upcoming events and competions on the club calendar</h6>
            <div class="upcoming-section">
                <div class="upcard d-flex flex-column" id="up" :style="{backgroundColor: homeStore.clubSettings.secondary_color}">
                    <h5 style="font-size: 20px" :style="{color: homeStore.clubSettings.text_color}">Upcoming Events</h5>
                    <div class="event-list" v-if="homeStore.homeData?.data?.upcomingEvents?.length">
                        <div class="event-item" v-for="(event, index) in homeStore.homeData.data.upcomingEvents" :key="event.id || index">
                            <img class="img-fluid" :src="event.featured_image_url" alt="Event" />
                            <div class="event-details">
                                <span class="event-title" :style="{color: homeStore.clubSettings.text_color}">{{ event.name }}</span>
                                <div class="event-time" style="text-align: right">
                                    <small class="event-date" :style="{color: homeStore.clubSettings.text_color}">{{ formatDate(event.event_date) }}</small><br />
                                    <small class="event-time-details" :style="{color: homeStore.clubSettings.text_color}">{{ formatTime(event.event_date) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="button-group mt-auto">
                        <router-link to="/event" custom v-slot="{ navigate }">
                            <button class="btn btn-sm" id="view" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.primary_color}" @click="navigate">View All</button>
                        </router-link>
                    </div>
                </div>

                <div class="upcards" style="width: 45%">
                    <div id="datepicker"></div>
                </div>

                <div class="upcard d-flex flex-column" id="ups" style="margin-left: 2.5rem" :style="{backgroundColor: homeStore.clubSettings.secondary_color}">
                    <h5 style="font-size: 20px" :style="{color: homeStore.clubSettings.text_color}">
                        Upcoming Competitions
                    </h5>

                    <div class="event-list" v-if="homeStore.homeData?.data?.upcomingCompetitions">
                        <div class="event-item">
                            <img class="img-fluid" :src="homeStore.homeData.data.upcomingCompetitions.featured_image_url" alt="Event" />
                            <div class="event-details">
                                <span class="event-title" :style="{color: homeStore.clubSettings.text_color}">
                                {{ homeStore.homeData.data.upcomingCompetitions.name }}
                                </span>
                                <div class="event-time" style="text-align: right">
                                    <small class="event-date" :style="{color: homeStore.clubSettings.text_color}">
                                        {{ formatDate(homeStore.homeData.data.upcomingCompetitions.start_date) }}
                                    </small><br />
                                    <small class="event-time-details" :style="{color: homeStore.clubSettings.text_color}">
                                        {{ formatTime(homeStore.homeData.data.upcomingCompetitions.start_date) }}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="button-group mt-auto">
                        <router-link to="/competitions" custom v-slot="{ navigate }">
                            <button class="btn btn-sm w-100" id="view"
                                @click="navigate"
                                :style="{ color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.primary_color }">
                                View All
                            </button>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>

        <div style="margin-bottom: 10px; background-color: #EBE6E1;" :style="{backgroundColor: homeStore.clubSettings.background_color}">
            <div class="d-flex justify-content-between mb-3" style=" padding-left: 20px; font-size: 20px; padding-right: 20px; padding-top: 20px;">
                <div>
                    <h5 class="name" :style="{color: homeStore.clubSettings.text_color}">Member Galleries</h5>
                    <p class="role" :style="{color: homeStore.clubSettings.text_color}">A preview of galleries uploaded by our amazing photographers from the club</p>
                </div>

                <router-link to="/member_gallery" custom v-slot="{ navigate }">
                    <button class="btn" id="view" @click="navigate" style="max-width: 260px; height: 50px" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color}">View All Member Galleries</button>
                </router-link>
            </div>
            <div class="section" style="padding: none">
                <div class="card" style="height: auto; border: none; margin-top: -1px" :style="{backgroundColor: homeStore.clubSettings.background_color}">
                    <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
                        <div class="pics">
                            <div v-for="(item, index) in row" :key="item.id || index" class="pics-items">
                                <div v-if="item.profile_image_url">
                                    <!-- Profile Image -->
                                    <img :src="item.profile_image_url" :alt="item.username" style="max-width: 100%;" />

                                    <!-- Username -->
                                    <div class="pics-infos">
                                        <div class="pics-infos" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.secondary_color}">{{ item.username.length > 10 ? item.username.slice(0, 10) + '...' : item.username }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Latest" style="width: 30%;background-color: #EBE6E1;" :style="{backgroundColor: homeStore.clubSettings.accent_color, opacity: '50%', color: homeStore.clubSettings.text_color}">
                    <h5 style="font-size: 20px" :style="{color: homeStore.clubSettings.text_color}">Latest Members</h5>
                    <div class="row">
                        <div class="col-6 mb-3" v-for="latestMember in homeStore.homeData?.data?.latestMembers?.members.slice(0, 6)" :key="latestMember.id">
                            <div class="event-items text-center">
                                <img class="img-fluid" :src="latestMember.profile_image_url" alt="Profile Picture" style="width:60px; height: 60px; border-radius: 7px" />
                                <div class="event-details" :style="{color: homeStore.clubSettings.text_color}">
                                    <span>{{ latestMember.username }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="latest-interaction" style="background-color: #99816B; padding-top: 50px; padding-left: 30px; padding-bottom: 20px" :style="{backgroundColor: homeStore.clubSettings.secondary_color}">
            <h5 class="name" :style="{color: homeStore.clubSettings.text_color}">Latest Interactions</h5>
            <h6 class="role" :style="{color: homeStore.clubSettings.text_color}">A preview of comments and reactions on the photos & other posts on the club website</h6>
            <div class="row" style="margin-top: 20px">
                <div class="col-md-6">
                    <div class="comments-card" :style="{backgroundColor: homeStore.clubSettings.background_color}">
                        <h5 class="name" :style="{color: homeStore.clubSettings.text_color}">Recent Comments</h5>
                        <div class="row" v-for="interaction  in homeStore.homeData.data?.latestInteractions" :key="interaction.id">
                            <div class="col-md-2">
                                <img :src="interaction.image_url" class="img-fluid" alt="Interaction Image" style="max-width: 50px; height: 50px"/>
                            </div>
                            <div class="col-md-7">
                                <p :style="{color: homeStore.clubSettings.text_color}">
                                    <label class="role" :style="{color: homeStore.clubSettings.text_color}">{{ interaction.comments[0]?.interacted_by?.username || interaction.uploaded_by.username }}</label>&nbsp;&nbsp;
                                    {{ interaction.comments[0]?.comment || 'No comment yet' }}
                                </p>
                                <a href="#" :style="{color: homeStore.clubSettings.text_color}">Remove</a> |
                                <a href="#" :style="{color: homeStore.clubSettings.text_color}">Translate</a>
                            </div>
                            <div class="col-md-3">
                                <label for="date" :style="{color: homeStore.clubSettings.text_color}">
                                    {{ timeAgo(interaction.comments[0]?.created_at || interaction.created_at) }}
                                </label>
                            </div>
                            <div class="divider2" :style="{ border: '1px solid ' + homeStore.clubSettings.background_color, color: homeStore.clubSettings.background_color }"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="comments-cards" :style="{ backgroundColor: homeStore.clubSettings.background_color }">
                        <h5 class="name" :style="{ color: homeStore.clubSettings.text_color }">Recent Likes</h5>

                        <div class="row">
                            <div class="col-md-2 like-item" v-for="interaction in homeStore.homeData.data?.latestInteractions" :key="interaction.id">
                                <img :src="interaction.image_url" class="profile-img" alt="User" />
                                <span class="heart-icon" :style="{ backgroundColor: homeStore.clubSettings.accent_color, color: homeStore.clubSettings.background_color }">❤</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="d-flex justify-content-between mb-3" style=" padding-left: 25px; font-size: 20px; padding-right: 20px; padding-top: 50px;">
                <div>
                    <h5 class="name" :style="{color: homeStore.clubSettings.text_color}">Latest Updates</h5>
                    <p class="role" :style="{color: homeStore.clubSettings.text_color}">Latest results from our camera club competitions, and news posted on our website</p>
                </div>

                <router-link to="/member_gallery" custom v-slot="{ navigate }">
                    <button class="btn" id="view" @click="navigate" style="max-width: 200px; height: 50px" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.primary_color}">View All Results</button>
                </router-link>
            </div>
            <div class="section" style=" background-color: #EBE6E1; margin-top: 0px" :style="{backgroundColor: homeStore.clubSettings.background_color}">
                <div class="row">
                    <div class="col-md-4">
                        <div class="cardddd" style="width: 100%; background-color: #EBE6E1; height: auto" :style="{backgroundColor: homeStore.clubSettings.background_color}">
                            <h5 style="font-size: 20px" :style="{color: homeStore.clubSettings.text_color}">Latest News</h5>
                            <div class="row" v-for="clubnew in homeData.data?.clubNews" :key="clubnew.id" style="margin-bottom: 10px">
                                <div class="col-md-2">
                                    <img :src="clubnew.featured_image_url" alt="Com" style="width: 50px; height: 50px" />
                                </div>
                                <div class="col-md-6">
                                    <p class="text-secondar" :style="{color: homeStore.clubSettings.text_color}">{{ clubnew.title }}</p>
                                </div>
                                <div class="col-md-4">
                                    <div class="event-time" style="text-align: right">
                                        <small class="event-date" :style="{color: homeStore.clubSettings.text_color}">{{ formatDate(clubnew.created_at) }}</small><br />
                                        <small class="event-time-details" :style="{color: homeStore.clubSettings.text_color}">{{ formatTime(clubnew.created_at) }}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group">
                                <router-link to="/news" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.primary_color}">View All</button>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="card" style="height: auto; border: none; background-color: #EBE6E1; width: 1015px" :style="{backgroundColor: homeStore.clubSettings.background_color}">
                        <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
                            <div class="pics">
                                <div v-for="(item, index) in row" :key="item.id || index" class="pics-items" :class="{ 'bottom-left-radius': rowIndex === chunkedCards.length - 1 && index === 0, 'bottom-right-radius': rowIndex === chunkedCards.length - 1 && index === row.length - 1 }">
                                    <div v-if="item.profile_image_url">
                                        <!-- Profile Image -->
                                        <img :src="item.profile_image_url" :alt="item.username" style="max-width: 100%;" />

                                        <!-- Username -->
                                        <div class="pics-infos">
                                            <div class="pics-infos" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.secondary_color}">{{ item.username.length > 10 ? item.username.slice(0, 10) + '...' : item.username }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4" style="background-color: #ebe6e1; border-radius: 15px; height: 125px; padding: 25px 30px; font-size: 20px; margin-top: 50px" :style="{backgroundColor: homeStore.clubSettings.secondary_color}">
            <div>
                <h5 class="fw-semibold mb-1" :style="{color: homeStore.clubSettings.text_color}">
                    Ready to join the club & work on something exciting?
                </h5>
                <p :style="{color: homeStore.clubSettings.text_color, fontSize: '14px', fontWeight: '400', lineHeight: '20px', letterSpacing: '0%'}">
                    Join the club and let’s create something amazing.
                </p>
            </div>

            <router-link to="/club" custom v-slot="{ navigate }">
                <button class="btn" id="view" @click="navigate" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color}">
                    Join Club
                </button>
            </router-link>
        </div>

        <div style="padding-top:30px">
            <h5 class="name" style="text-align: center" :style="{ color: homeStore.clubSettings.text_color }">{{homeStore.clubSettings.footer_text}}</h5>
            <p class="names" style="text-align: center; margin-left: 24%; margin-right: 23%" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.clubSettings.footer_desc}}</p>
        </div>

        <div class="row align-items-center py-4" style="height: auto">
            <div class="col-md-4 text-end pe-4">
                <h5 class="fw-bold mb-4" :style="{color: homeStore.clubSettings.text_color}">Contact</h5>
                <div class="contact-item mb-3">
                    <p class="mb-1" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.homeData?.data?.user.address}}</p>
                    <div class="icon-circles" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color}"><i class="fas fa-map-marker-alt"></i>
                    </div>
                </div>
                <div class="contact-item mb-3">
                    <p class="mb-1" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.homeData?.data?.user.phone}}</p>
                    <div class="icon-circles" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color}"><i class="fas fa-phone"></i></div>
                </div>
                <div class="contact-item mb-3">
                    <p class="mb-1" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.homeData?.data?.user.email}}</p>
                    <div class="icon-circles" :style="{color: homeStore.clubSettings.text_color, backgroundColor: homeStore.clubSettings.accent_color}"><i class="fas fa-envelope"></i></div>
                </div>
            </div>

            <div class="col-md-4 text-center mb-3 mb-md-0">
                <img :src="homeStore.clubSettings.footer_img_url" alt="sample" class="rounded-img" />
            </div>

            <div class="col-md-4">
                <h5 class="fw-bold mb-4" :style="{color: homeStore.clubSettings.text_color}">Social Links</h5>
                <div class="social-link d-flex align-items-center mb-3">
                    <div class="icon-circles me-3" :style="{color: homeStore.clubSettings.background_color, backgroundColor: homeStore.clubSettings.text_color}"><i class="fab fa-facebook-f"></i>
                    </div>
                    <div>
                        <p class="fw-bold mb-0" :style="{color: homeStore.clubSettings.text_color}">Facebook</p>
                        <p class="mb-0" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.clubSettings.fb_link}}</p>
                    </div>
                </div>
                <div class="social-link d-flex align-items-center mb-3">
                    <div class="icon-circles me-3" :style="{color: homeStore.clubSettings.background_color, backgroundColor: homeStore.clubSettings.text_color}"><i class="fab fa-instagram"></i>
                    </div>
                    <div>
                        <p class="fw-bold mb-0" :style="{color: homeStore.clubSettings.text_color}">Instagram</p>
                        <p class="mb-0" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.clubSettings.insta_link}}</p>
                    </div>
                </div>
                <div class="social-link d-flex align-items-center mb-3">
                    <div class="icon-circles me-3" :style="{color: homeStore.clubSettings.background_color, backgroundColor: homeStore.clubSettings.text_color}"><i class="fab fa-flickr"></i>
                    </div>
                    <div>
                        <p class="fw-bold mb-0" :style="{color: homeStore.clubSettings.text_color}">Flickr</p>
                        <p class="mb-0" :style="{color: homeStore.clubSettings.text_color}">{{homeStore.clubSettings.flickr_link}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from "@/stores/UserStore";
import { useHomeStore } from '@/stores/ClubData';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/* global $ */

const user = useUserStore();
const homeStore = useHomeStore();
const { homeData } = storeToRefs(homeStore);
const cards = computed(() => homeData.value?.data?.memberGalleries || []);
const cardes = computed(() => homeData.value?.data?.clubGalleries?.original?.data || []);

const chunkedCards = computed(() => {
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < cards.value.length; i += chunkSize) {
        chunks.push(cards.value.slice(i, i + chunkSize));
    }
    return chunks;
});

const chunkCards = computed(() => {
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < cardes.value.length; i += chunkSize) {
        chunks.push(cardes.value.slice(i, i + chunkSize));
    }
    return chunks;
});

const navItems = ref([{
        label: 'Home',
        to: '/home'
    },
    {
        label: 'Events',
        to: '/event'
    },
    {
        label: 'Competitions',
        to: '/competitions'
    },
    {
        label: 'Galleries',
        to: '/gallery'
    },
    {
        label: 'News',
        to: '/news'
    },
    {
        label: 'Club',
        to: '/club'
    }
]);

const currentRoute = ref('/home');

const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const timeAgo = (date) => {
  return dayjs(date).fromNow();
};



const formatTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
};

onMounted(async () => {
    $("#datepicker").datepicker();
    console.log(homeStore)
    let domain = window.location.hostname.split('.')[0];
    console.log(domain)
    try {
        await homeStore.fetchHomeData(domain);
    } catch (error) {
        console.error("Error fetching home data:", error);
    }
});
</script>

<style scoped>
.custom-navbar {
    background-color: #fff;
    padding: 0.8rem 2rem;
    border-bottom: 1px solid #ddd;
    font-family: 'Segoe UI', sans-serif;
}

.logo-img {
    width: 250px;
    height: 75px;
}

.nav-link {
    font-family: Inter;
    font-weight: 600;
    font-style: Semi Bold;
    font-size: 18px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #4C4036
}

.nav-link.active,
.nav-link:hover {
    color: #8d2d3f;
    border-bottom: 2px solid #8d2d3f;
}

.contents {
    padding: 20px;
    height: 100%;
    transition: all 0.3s;
}

.club-banner {
    background-color: #c54058;
    color: white;
    border-radius: 4px;
    margin: 1%
}

.icon-circle {
    width: 30px;
    height: 30px;
    border: 1px solid white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}

.icon-circle:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.icon-circles {
    width: 30px;
    height: 30px;
    background-color: #99816b;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.rounded-img {
    height: 250px;
    width: 400px;
    border-radius: 30px;
}

.contact-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
}

.social-link i {
    font-size: 14px;
}

.comments-card {
    width: 97%;
    height: 440px;
    max-height: 440px;
    overflow-y: auto;
    margin-left: 0%
}

.comments-cards {
    margin-left: -2%;
    width: 97%;
    height: 440px;
    max-height: 440px;
    overflow-y: auto;
}

.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
}

.hero-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 60px;
  width: 825px;
  height: 558px;
  margin-left: 5%;
  border-radius: 12px;
}

.hero-overlay h1 {
  font-size: 72px;
  margin-bottom: 10px;
  margin-top: 50px
}

.text {
  font-size: 36px;
  margin-bottom: 30px;
}

.location {
  font-size: 14px;
  color: #ccc;
  margin-top: 20px;
}

.social-icons i {
  font-size: 20px;
  margin-right: 12px;
  cursor: pointer;
}

.ui-datepicker .ui-datepicker-header {
  background-color: blue;
  color: green !important;
}

</style>
