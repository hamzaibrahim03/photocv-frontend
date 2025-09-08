<template>
<NavigationRoute />
<HeaderRoute />

<section class="content">
    <div class="dashboard-card">

        <div class="profile-card">
            <div class="profile-left">
                <img class="img-fluid" :src="dashboardData?.data?.user_details?.profile_image" alt="Profile Picture" />
                <div class="profile-info" style="margin-left:15px">
                    <p class="greeting">{{ greetingMessage }} {{ dashboardData?.data?.user_details?.username }}</p>
                    <h2 class="name">{{ dashboardData?.data?.user_details?.first_name }}</h2>
                    <p class="role">{{ dashboardData?.data?.user_details?.role }}</p>
                </div>
            </div>
            <div class="profile-icons">
                <div class="icon">
                    <span>20</span>
                    <img :src="Image" alt="image-icon" style="width: 15px; height: 15px" />
                </div>
                <div class="icon">
                    <span>53</span>
                    <img :src="Comment" alt="comment-icon" style="width: 15px; height: 15px" />
                </div>
                <div class="icon">
                    <span>39</span>
                    <img :src="Point" alt="point-icon" style="width: 15px; height: 15px" />
                </div>
            </div>
        </div>

        <div class="card-section">
            <MembersComponent :details="'Members'" :number="recordsTotal" />
            <EventsComponent />
        </div>
    </div>

    <div class="upcoming-section">

        <div class="upcard d-flex flex-column" id="up">
            <h5 style="font-size: 20px">Upcoming Events</h5>

            <div class="event-list" v-if="upcomingEvents.length">
                <div class="event-item" v-for="event in upcomingEvents" :key="event.id || index">
                    <img class="img-fluid" :src="event.featured_image_url" alt="Event" />
                    <div class="event-details">
                        <span class="event-title">{{ event.name }}</span>
                        <div class="event-time" style="text-align: right">
                            <small class="event-date">{{ formatDate(event.event_date) }}</small><br />
                            <small class="event-time-details">{{ formatTime(event.event_date) }}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="button-group mt-auto">
                <router-link to="/event" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
                <router-link to="/events_add" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="new" @click="navigate">Add New</button>
                </router-link>
            </div>
        </div>

        <div class="upcard d-flex flex-column" id="ups" style="margin-left: 2.5rem">
            <h5 style="font-size: 20px">Upcoming Competitions</h5>

            <div class="event-list" v-if="dashboardData?.data?.competitions?.length">
                <div class="event-item" v-for="competition in upcomingCompetitions" :key="competition.id || index">
                    <img class="img-fluid" :src="competition.featured_image_url" alt="Com" />
                    <div class="event-details">
                        <span class="event-title">{{ competition.name }}</span>
                        <div class="event-time" style="text-align: right">
                            <small class="event-date">{{ formatDate(competition.start_date) }}</small><br />
                            <small class="event-time-details">{{ formatTime(competition.start_date) }}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-group mt-auto">
                <router-link to="/competitions" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
                <router-link to="/comp_edit" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="new" @click="navigate">Add New</button>
                </router-link>
            </div>
        </div>

        <div class="upcards" style="width: 45%">
            <div id="datepicker"></div>
        </div>
    </div>

    <div class="section">

        <div class="Latest flex-column">
            <h5 style="font-size: 20px; margin-bottom: 20px">Latest Members</h5>
            <div class="row">
                <div class="col-6" style="height: 100%; margin-bottom: 18px" v-for="member in dashboardData?.data?.latest_members.slice(0, 6)" :key="member.id">
                    <div class="event-items text-center">
                        <img class="img-fluid" :src="member.profile_image_url" alt="Profile Picture" style="width: 60px; height: 60px;" />
                        <div class="event-details">
                            <span>{{ member.username }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-group mt-auto d-flex gap-2">
                <router-link to="/members" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
                <router-link to="/members" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="edit" @click="navigate">Add New</button>
                </router-link>
            </div>
        </div>

        <div class="cardd">
            <div class="d-flex justify-content-between mb-3" style="padding-left: 20px; font-size: 20px; padding-right: 20px; padding-top: 20px">
                <h5 class="title">Member Galleries</h5>
                <router-link to="/mem_gallery" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
            </div>

            <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
                <div class="pic">
                    <div v-for="(item, index) in row" :key="item.id || index" class="pic-item">
                        <div v-if="item.profile_image_url">
                            <!-- Profile Image -->
                            <img :src="item.profile_image_url" alt="Profile Image" style="width: 170px; height: 147px" />

                            <!-- Username -->
                            <div class="pic-info">
                                <div class="pic-info">{{ item.username.length > 10 ? item.username.slice(0, 10) + '...' : item.username }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="carddd">
            <div class="d-flex justify-content-between mb-3" style="padding-left: 10px; font-size: 15px; padding-right: 10px; padding-top: 20px">
                <h5>Recent Results</h5>
                <button class="btn btn-sm" id="view">View All</button>
            </div>


            <div class="row g-0">
                <div class="col-6" style="height: 100%; margin-bottom: 25px" v-for="page in dashboardData?.data?.pages.slice(0, 6)" :key="page.id">
                    <div class="event-items text-center">
                        <img class="img-fluid" :src="page.featured_image_url" alt="Profile Picture" style="width: 60px; height: 60px;" />
                        <div class="event-details">
                            <span>{{ page.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cardddd d-flex flex-column">
            <h5 style="font-size: 20px">Recent Notices</h5>

            <div class="row" style="margin-bottom: 7px" v-for="notice in recentNotices" :key="notice.id">
                <div class="col-md-2">
                    <img :src="notice.featured_image_url" alt="Com" style="width: 50px; height: 50px" />
                </div>
                <div class="col-md-6">
                    <p class="text-secondary" style="text-align: left">{{ notice.title }}</p>
                </div>
                <div class="col-md-4">
                    <div class="event-time" style="text-align: right">
                        <small class="event-date">{{ formatDate(notice.created_at) }}</small><br />
                        <small class="event-time-details">{{ formatTime(notice.created_at) }}</small>
                    </div>
                </div>
            </div>

            <div class="button-group mt-auto">
                <router-link to="/notices" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
                <router-link to="/notice_single" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="new" @click="navigate">Add New</button>
                </router-link>
            </div>
        </div>

        <div class="cardddd d-flex flex-column">
            <h5 style="font-size: 20px">Latest News</h5>
            <div class="row" style="margin-bottom: 7px" v-for="news in latestNews" :key="news.id">
                <div class="col-md-2">
                    <img :src="news.featured_image_url" alt="Com" style="width: 50px; height: 50px" />
                </div>
                <div class="col-md-6">
                    <p class="text-secondar" style="text-align: left">{{ news.title }}</p>
                </div>
                <div class="col-md-4">
                    <div class="event-time" style="text-align: right">
                        <small class="event-date">{{ formatDate(news.publish_date) }}</small><br />
                        <small class="event-time-details">{{ formatTime(news.publish_date) }}</small>
                    </div>
                </div>
            </div>

            <div class="button-group mt-auto">
                <router-link to="/news" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
                <button class="btn btn-sm" id="new">Add New</button>
            </div>
        </div>

    </div>

    <div class="section">
        <div class="Latest flex-column">
            <h5 style="font-size: 20px">Recent Pages</h5>
            <div class="row">
                <div class="col-6" style="height: 100%; margin-bottom: 25px" v-for="page in dashboardData?.data?.pages.slice(0, 6)" :key="page.id">
                    <div class="event-items text-center">
                        <img class="img-fluid" :src="page.featured_image_url" alt="Profile Picture" style="width: 60px; height: 60px;" />
                        <div class="event-details">
                            <span>{{ page.title }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-group mt-auto">
                <router-link to="/members" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
                <router-link to="/members" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="edit" @click="navigate">Add New</button>
                </router-link>
            </div>
        </div>

        <div class="cardd">
            <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 10px">
                <h5>Club Galleries</h5>
                <router-link to="/club_gallery" custom v-slot="{ navigate }">
                    <button class="btn btn-sm" id="view" @click="navigate">View All</button>
                </router-link>
            </div>

            <div v-for="(row, rowIndex) in chunkCards" :key="rowIndex" class="row-wrapper">
                <div class="pic">
                    <div v-for="(item, index) in row" :key="item.id || index" class="pic-item">
                        <div v-if="item.photos && item.photos.length">
                            <img :src="item.photos[0].image" :alt="item.photos[0].title" style="width: 170px; height: 147px" />
                            <div class="pic-info">{{ item.gallery_name.length > 10 ? item.gallery_name.slice(0, 10) + '...' : item.gallery_name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import {
    useDashboardStore
} from '@/stores/DashboardStore';
import {
    onMounted,
    computed
} from 'vue';
import NavigationRoute from "@/components/NavigationRoute.vue";
import Image from "@/assets/icons/dashboard/profile_image.svg"
import Comment from "@/assets/icons/dashboard/comment.svg"
import Point from "@/assets/icons/dashboard/point.svg"
import HeaderRoute from "@/components/HeaderRoute.vue";
import MembersComponent from "@/partials/club_admin/dashboard/MembersComponent.vue";
import EventsComponent from "@/partials/club_admin/dashboard/EventsComponent.vue";

/* global $ */

// Store & Data Setup
const dashboardStore = useDashboardStore();
const dashboardData = computed(() => dashboardStore.dashboardData);

// Greeting message logic
const hour = new Date().getHours();
const greetingMessage = computed(() => {
    if (hour >= 5 && hour < 12) return "Good morning!";
    if (hour === 12) return "Good noon!";
    if (hour > 12 && hour < 17) return "Good afternoon!";
    if (hour >= 17 && hour < 21) return "Good evening!";
    return "Good night!";
});

// Format functions
const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit"
    });
};
// Upcoming Events
const upcomingEvents = computed(() => {
    const allEvents = dashboardStore.dashboardData?.data?.events || [];
    const now = new Date();

    return allEvents.filter(event => {
        const eventDate = new Date(event.event_date);
        return eventDate >= now;
    }).sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
});

// Upcoming Competitions
const upcomingCompetitions = computed(() => {
    const allCompetitions = dashboardStore.dashboardData?.data?.competitions || [];
    const now = new Date();

    return allCompetitions.filter(competition => {
        const competitionDate = new Date(competition.start_date);
        return competitionDate >= now;
    }).sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
});

// Latest News
const latestNews = computed(() => {
    const allNews = dashboardStore.dashboardData?.data?.club_news || [];
    const now = new Date();

    return allNews
        .filter(news => new Date(news.publish_date) <= now)
        .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))
        .slice(0, 6);
});

// Recent Notices
const recentNotices = computed(() => {
    const notices = dashboardStore.dashboardData?.data?.member_notices || [];
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 30);

    return notices
        .filter(notice => {
            const createdDate = new Date(notice.created_at);
            return createdDate >= oneWeekAgo && createdDate <= now;
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6);
});

// Cards from member_galleries
const cards = computed(() => dashboardData.value?.data?.member_galleries || []);
const cardes = computed(() => dashboardData.value?.data?.clubGalleries?.original?.data || []);

// Chunked cards for layout
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

// Fetch on mount
onMounted(async () => {
  try {
    const highlightedDatesMap = {};

    await dashboardStore.fetchDashboardData();

    // Fill competitions
    dashboardStore.dashboardData.data.competitions.forEach(comp => {
      const fullDate = new Date(comp.start_date);
      const normalizedDate = $.datepicker.formatDate('yy-mm-dd', fullDate);
      if (!highlightedDatesMap[normalizedDate]) {
        highlightedDatesMap[normalizedDate] = { competitions: [], events: [] };
      }
      highlightedDatesMap[normalizedDate].competitions.push(comp.name);
    });

    // Fill events
    dashboardStore.dashboardData.data.events.forEach(event => {
      const fullDate = new Date(event.event_date);
      const normalizedDate = $.datepicker.formatDate('yy-mm-dd', fullDate);
      if (!highlightedDatesMap[normalizedDate]) {
        highlightedDatesMap[normalizedDate] = { competitions: [], events: [] };
      }
      highlightedDatesMap[normalizedDate].events.push(event.name);
    });

    $("#datepicker").datepicker({
      beforeShowDay: function (date) {
        const dateString = $.datepicker.formatDate('yy-mm-dd', date);
        const entry = highlightedDatesMap[dateString];
        const classes = [];

        if (entry) {
          if (entry.competitions.length) classes.push("highlight-date-competition");
          if (entry.events.length) classes.push("highlight-date-event");
        }

        // Highlight today's date
        const today = new Date();
        if (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          classes.push("highlight-today");
        }

        // Tooltip only (no badge)
        const tooltip = entry
          ? entry.competitions.concat(entry.events).join(", ")
          : "";

        return [true, classes.join(" "), tooltip];
      }
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
  }
});


</script>

<style scoped>
#news {
    margin-left: -5px;
}

.calen {
    margin-left: 5px;
}

#notice {
    margin-left: -15px;
}

.pic {
    display: flex;
    width: 99.5%;
}

.pic-item {
    position: relative;
    overflow: hidden;
}
</style>
