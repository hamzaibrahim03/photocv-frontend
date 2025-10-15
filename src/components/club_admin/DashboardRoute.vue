<template>
<div :style="{ backgroundColor: 'white' }">
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
        <NavigationRoute />
        <HeaderRoute />

        <div class="content" style="margin-bottom: 20px">
            <section>
            <div class="container">
                <div class="dashboard-card" id="cl">
                    <div class="profile-card">
                        <div class="profile-left">
                            <img class="img-fluid" :src="dashboardData?.data?.user_details?.profile_image" alt="Profile Picture"/>
                            <div class="profile-info" style="margin-left: 15px">
                                <span class="greeting">
                                    {{ greetingMessage + dashboardData?.data?.user_details?.username }}
                                </span>
                                <h2 class="name">
                                    {{ dashboardData?.data?.user_details?.first_name }}
                                </h2>
                                <p class="role">
                                    {{ dashboardData?.data?.user_details?.role }}
                                </p>
                            </div>
                        </div>
                        <div class="profile-icons">
                            <div class="icon">
                                <span>20</span>
                                <img :src="Image" alt="image-icon" style="width: 15px; height: 15px"/>
                            </div>
                            <div class="icon">
                                <span>53</span>
                                <img :src="Comment" alt="comment-icon" style="width: 15px; height: 15px"/>
                            </div>
                            <div class="icon">
                                <span>39</span>
                                <img :src="Point" alt="point-icon" style="width: 15px; height: 15px"/>
                            </div>
                        </div>
                    </div>

                    <div class="card-section">
                        <div class="stat-card">
                            <small class="ca-details">Members</small>
                            <h3 class="number">{{ MemberCount }}</h3>
                        </div>

                        <div class="event-card">
                            <small class="ca-details">Next Event</small>
                            <div class="row">
                                <div class="col-md-5">
                                    <h3 class="number">{{EventDay}}</h3>
                                </div>
                                <div class="days col-md-7">
                                    <span>days to go</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>

            <section>
                <div class="container">
                    <div class="upcoming-sections">
                        <div class="cardddd d-flex flex-column" :style="{ padding: '35px'}">
                            <h5 class="head">Upcoming Events</h5>

                            <div class="event-list" v-if="upcomingEvents.length">
                                <div class="event-item" v-for="event in upcomingEvents" :key="event.id || index" style="margin-bottom: 10px">
                                    <img v-if="event.featured_image_url" class="img-fluid event-img" :src="event.featured_image_url" alt="Event" @error="event.featured_image_url = null" />
                                    <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                    </div>

                                    <div class="event-details">
                                        <div class="event-info" style="display: flex; flex-direction: column">
                                            <span id="ename">{{ event.name }}</span>
                                        </div>

                                        <div class="event-time" id="edate">
                                            <small class="event-date galtext">{{ formatDate(event.event_date) }}</small><br />
                                            <small class="event-time-details galtext">{{ formatTime(event.event_date) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="button-group mt-auto">
                                <router-link to="/event" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                                <router-link to="/events_add" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="new" @click="navigate">
                                        Add New
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <div class="cardddd d-flex flex-column" :style="{ padding: '35px'}">
                            <h5 class="head">Upcoming Competitions</h5>

                            <div class="event-list" v-if="dashboardData?.data?.competitions?.length">
                                <div class="event-item" v-for="comp in upcomingCompetitions" :key="comp.id || index" style="margin-bottom: 10px">
                                    <img v-if="comp.featured_image_url" class="img-fluid event-img" :src="comp.featured_image_url" alt="Event" @error="comp.featured_image_url = null" />
                                    <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                    </div>

                                    <div class="event-details">
                                        <div class="event-info" style="display: flex; flex-direction: column">
                                            <span id="ename">{{ comp.name }}</span>
                                        </div>

                                        <div class="event-time" id="edate">
                                            <small class="event-date galtext">{{ formatDate(comp.start_date) }}</small><br />
                                            <small class="event-time-details galtext">{{ formatTime(comp.start_date) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group mt-auto">
                                <router-link to="/competitions" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                                <router-link to="/comp_edit" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="new" @click="navigate">
                                        Add New
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <div class="cardddd d-flex flex-column" style="height: auto; padding: 0">
                            <Calendar />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="upcoming-section" style="display: flex">
                        <div class="lcardddd d-flex flex-column" :style="{color: '#333333'}">
                            <h5 class="head" :style="{color: '#333333'}">Latest Members</h5>
                            <div class="row" style="padding-top: 30px;">
                                <div class="col-6" style="margin-bottom: 20px;" v-for="latestMember in dashboardData?.data?.latest_members.slice(0, 6)" :key="latestMember.id">
                                    <div class="event-items text-center" style="gap: 20px">
                                        <img v-if="latestMember.profile_image_url" class="img-fluid event-img" :src="latestMember.profile_image_url" alt="Profile" @error="latestMember.profile_image_url = null" :style="{width:'50px', height: '50px', borderRadius: '7px',  objectFit: 'cover', objectPosition: 'top', backgroundColor: '#7FA483'}" />
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>
                                        <div class="memtext" id="memname" :style="{color: '#333333'}">
                                            <span>{{ latestMember.first_name +' '+ latestMember.last_name}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group mt-auto">
                                <router-link to="/notices" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                                <router-link to="/notice_single" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="new" @click="navigate">
                                        Add New
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <div class="card" style="height: auto; border: none; margin-top: -1px; padding-bottom: 0" :style="{backgroundColor: 'white', margin: '0px'}">
                            <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 10px">
                                <h5 class="head">Member Galleries</h5>
                                <router-link to="/club_gallery" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                            </div>
                            <div class="pics">
                                <div v-for="(item, index) in chunkedCards.flat() || []" :key="item.id || index" class="pics-items" :class="getPositionClass(index, chunkedCards.flat().length)">
                                    <div v-if="item.image_url">
                                        <img :src="item.image_url" :alt="item.username" style="object-fit: cover; object-position: top;"/>
                                        <div class="pics-infos" :class="getPositionClass(index, chunkedCards.flat().length)" :style="{ backgroundColor: hexToRgba('#7FA483', 0.7) }">
                                            <div :style="{ color: 'white' }">
                                                {{ item.gallery_name }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="upcoming-sections">
                        <div class="cardddd d-flex flex-column" style="padding: 35px">
                            <div class="d-flex justify-content-between mb-3">
                                <h5 class="head">Recent Results</h5>
                                <button class="btn btn-sm" id="view">View All</button>
                            </div>

                            <div class="row" style="padding-top: 30px">
                                <div class="col-6" style="margin-bottom: 20px" v-for="item in picture.slice(0, 6)" :key="item.id">
                                    <div class="event-items text-center" style="gap: 20px">
                                        <img v-if="item.image" class="img-fluid event-img" :src="item.image" :alt="item.gallery_name" @error="item.image = null"/>
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>
                                        <div class="memtext" id="memname" :style="{ color: '#333333' }">
                                            <span>{{ item.gallery_name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="cardddd d-flex flex-column" style="padding: 35px">
                            <h5 class="head" :style="{color: '#333333'}">Recent Notices</h5>
                            <div class="event-list" v-if="recentNotices.length" style="padding-top: 20px">
                                <div class="event-item" v-for="notice in recentNotices" :key="notice.id || index" style="margin-bottom: 10px;">
                                    <img v-if="notice.featured_image_url" class="img-fluid event-img" :src="notice.featured_image_url" alt="News" @error="notice.featured_image_url = null" />
                                    <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                    </div>
                                    <div class="event-details">
                                        <span id="pname" :style="{color: '#333333', fontWeight: '600'}">{{ notice.title }}</span>
                                        <div class="event-time" id="edate">
                                            <small class="event-date galtext">{{ formatDate(notice.created_at) }}</small><br />
                                            <small class="event-time-details galtext">{{ formatTime(notice.created_at) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group mt-auto">
                                <router-link to="/notices" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                                <router-link to="/notice_single" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="new" @click="navigate">
                                        Add New
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <div class="cardddd d-flex flex-column" style="padding: 35px">
                            <h5 class="head" :style="{color: '#333333'}">Latest News</h5>
                            <div class="event-list" v-if="latestNews.length" style="padding-top: 20px">
                                <div class="event-item" v-for="news in latestNews" :key="news.id || index" style="margin-bottom: 10px;">
                                    <img v-if="news.featured_image_url" class="img-fluid event-img" :src="news.featured_image_url" alt="News" @error="news.featured_image_url = null" />
                                    <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                    </div>
                                    <div class="event-details">
                                        <span id="pname" :style="{color: '#333333', fontWeight: '600'}">{{ news.title }}</span>
                                        <div class="event-time" id="edate">
                                            <small class="event-date galtext">{{ formatDate(news.publish_date) }}</small><br />
                                            <small class="event-time-details galtext">{{ formatTime(news.publish_date) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group mt-auto">
                                <router-link to="/notices" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                                <router-link to="/notice_single" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="new" @click="navigate">
                                        Add New
                                    </button>
                                </router-link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="upcoming-section" style="display: flex">
                        <div class="lcardddd d-flex flex-column" :style="{color: '#333333'}">
                            <h5 class="head">Recent Pages</h5>
                            <div class="row" style="padding-top: 30px;">
                                <div class="col-6" style="margin-bottom: 20px;" v-for="page in dashboardData?.data?.pages.slice(0, 6)" :key="page.id">
                                    <div class="event-items text-center" style="gap: 20px">
                                        <img v-if="page.featured_image_url" class="img-fluid event-img" :src="page.featured_image_url" alt="Profile" @error="page.featured_image_url = null" :style="{maxWidth:'60px', height: '60px', borderRadius: '7px',  objectFit: 'cover', objectPosition: 'top', backgroundColor: '#7FA483'}" />
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>
                                        <div class="memtext" id="memname" :style="{color: '#333333'}">
                                            <span>{{ page.title }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group mt-auto">
                                <router-link to="/members" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                                <router-link to="/members" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="edit" @click="navigate">
                                        Add New
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <div class="card" style="height: auto; border: none; margin-top: -1px; padding-bottom: 0" :style="{backgroundColor: 'white', margin: '0px'}">
                            <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 10px">
                                <h5 class="head">Club Galleries</h5>
                                <router-link to="/club_gallery" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view" @click="navigate">
                                        View All
                                    </button>
                                </router-link>
                            </div>
                            <div class="pics">
                                <div v-for="(item, index) in chunkCards.flat()" :key="item.id || index" class="pics-items" :class="getPositionClass(index, chunkCards.flat().length)">
                                    <div v-if="item.photos && item.photos.length">
                                        <img :src="item.photos[0].image" :alt="item.photos[0].title"/>
                                        <div class="pics-infos" :class="getPositionClass(index, chunkCards.flat().length)" :style="{ backgroundColor: hexToRgba('#7FA483', 0.7) }">
                                            {{ item.gallery_name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="site-footer">Copyright &copy; 2024 photo.cv</footer>
        </div>
        
    </div>
</div>
</template>

<script setup>
import { useDashboardStore } from "@/stores/club_admin/DashboardStore";
import { onMounted, computed, onUnmounted, ref } from "vue";
import NavigationRoute from "@/components/NavigationRoute.vue";
import Image from "@/assets/icons/dashboard/profile_image.svg";
import Comment from "@/assets/icons/dashboard/comment.svg";
import Point from "@/assets/icons/dashboard/point.svg";
import HeaderRoute from "@/components/HeaderRoute.vue";
import Calendar from "@/components/club_admin/Calendars/CalendarDashboard.vue"
import Loader from "@/components/LoaderAll.vue";

const dashboardStore = useDashboardStore();
const dashboardData = computed(() => dashboardStore.dashboardData);
const columns = ref(5); 
const isLoading = ref(true);
const MemberCount = dashboardStore?.dashboardData?.data?.total_members_count
const EventDay = dashboardStore?.dashboardData?.data?.upcoming_event?.remaining_days

const hour = new Date().getHours();
const greetingMessage = computed(() => {
  if (hour >= 5 && hour < 12) return "Good morning!";
  if (hour === 12) return "Good noon!";
  if (hour > 12 && hour < 17) return "Good afternoon!";
  if (hour >= 17 && hour < 21) return "Good evening!";
  return "Good night!";
});

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (datetimeStr) => {
  const date = new Date(datetimeStr);
  return date.toLocaleTimeString("en-US", {
      weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const upcomingEvents = computed(() => {
  const allEvents = dashboardStore.dashboardData?.data?.events || [];
  const now = new Date();

  return allEvents
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= now;
    })
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
});

const upcomingCompetitions = computed(() => {
  const allCompetitions =
    dashboardStore.dashboardData?.data?.competitions || [];
  const now = new Date();

  return allCompetitions
    .filter((competition) => {
      const competitionDate = new Date(competition.start_date);
      return competitionDate >= now;
    })
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
});

const latestNews = computed(() => {
  const allNews = dashboardStore.dashboardData?.data?.club_news || [];
  const now = new Date();

  return allNews
    .filter((news) => new Date(news.publish_date) <= now)
    .sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date))
    .slice(0, 6);
});

const recentNotices = computed(() => {
  const notices = dashboardStore.dashboardData?.data?.member_notices || [];
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 30);

  return notices
    .filter((notice) => {
      const createdDate = new Date(notice.created_at);
      return createdDate >= oneWeekAgo && createdDate <= now;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);
});
 
const cards = computed(() => {
    const members = dashboardData.value?.data?.member_galleries || [];

    return members.map(member => {
        const firstGallery = member.galleries?. [0];

        return {
            id: member.id,
            username: member.username,
            gallery_name: firstGallery?.gallery_name || "No Gallery",
            image_url: firstGallery?.photos?. [0]?.image_url || null
        };
    }).filter(card => card.image_url);
});
const cardes = computed(
  () => dashboardData.value?.data?.clubGalleries?.original?.data || []
);

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

const picture = computed(() => {
    const competitions = dashboardStore.dashboardData?.data?.recent_results?.original?.data || [];

    return competitions.flatMap(comp => {
        const members = comp?.competition_members || [];

        return members.flatMap(member =>
            (member.entries || [])
            .filter(entry => entry.position === 1 && entry.is_published === 1)
            .map(entry => ({
                id: entry.id,
                image: entry.entry_image_url,
                gallery_name: entry.entry_image_title || "No Name"
            }))
        );
    });
});

function updateColumns() {
  if (window.innerWidth < 575) {
    columns.value = 1; 
  } else if (window.innerWidth < 991) {
    columns.value =2;
  } else if (window.innerWidth < 1199) {
    columns.value = 3;
  } else {
    columns.value = 5;
  }
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
  try {
    await dashboardStore.fetchDashboardData();
   

  } catch (error) {
    console.error("Error fetching home data:", error);
  } finally {
        isLoading.value = false; 
    }
  updateColumns();

});
onUnmounted(() => {
  window.removeEventListener("resize", updateColumns);
});

function getPositionClass(index, total) {
  const row = Math.floor(index / columns.value);
  const col = index % columns.value;
  const lastIndex = total - 1;

  if (index === 0) return "top-left";

  if (row === 0 && col === columns.value - 1) return "top-right";

  if (row === Math.floor(lastIndex / columns.value) && col === 0) return "bottom-left";

  if (index === lastIndex) return "bottom-right";

  return "";
}
</script>

<style scoped>
.container {
  max-width: 1810px;
  padding: 0 15px;
  margin: 0 auto;
}
.dashboard-card {
  gap: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.profile-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px 25px;
  border-radius: 12px;
  width: 68%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  height: 158px;
}

.profile-left {
  display: flex;
  align-items: left;
}

.profile-left img {
  width: 100%;
  max-width: 108px;
  height: 108px;
  border-radius: 50%;
}

.greeting {
  color: #99816b;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  font-family: Inter;
}

.name {
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  color: #4c4036;
  font-family: Inter;
}

.names {
  font-family: Inter;
  font-weight: 400;
  font-size: 18.68px;
  line-height: 20.76px;
  letter-spacing: 0%;
}

.namess {
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #4c4036;
  padding-left: 20px;
  font-family: Inter;
  text-align: justify;
}

.left-header-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role {
  color: #cc445e;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  font-family: Inter;
}

.profile-icons {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.profile-icon {
  display: flex;
  flex-direction: column;
}

.icons {
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  gap: 5px;
}

.icon {
  display: flex;
  align-items: center;
  color: #cc445e;
  font-size: 14px;
  gap: 5px;
}

.icon i {
  margin-right: 5px;
}

.stat-card {
  background: #cc445e;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 50%;
  font-family: Inter;
  font-size: 1.2rem;
  height: 158px;
}

.event-card {
  background: #755840;
  color: white;
  padding: 20px;
  height: 158px;
  border-radius: 8px;
  text-align: center;
  font-family: Inter;
  font-size: 1.2rem;
  width: 50%;
}

.number {
  font-weight: 500;
  font-size: 48px;
  font-family: Inter;
  line-height: 100%;
  color: white;
  margin-top: 30px;
}

.ca-details {
  font-weight: 400;
  font-size: 20px;
  font-family: Inter;
  line-height: 100%;
}

.days {
  margin-top: 35px;
  font-weight: 400;
  font-family: Inter;
  font-size: 16px;
  line-height: 100%;
}
.card-section {
  display: flex;
  gap: 15px;
  width: 30%;
}

.upcoming-sections {
  display: flex;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: start;
  width: 101%;
  flex-wrap: wrap;
  gap: 40px;
}

.cardddd {
  background: white;
  width: 32%;
  padding: 20px;
  height: 390px;
  border-radius: 10px;
}

.cardddd:last-child {
  background: white;
  width: 30%;
  padding: 20px;
  height: 390px;
  border-radius: 10px;
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

#view {
  width: 100%;
  max-width: 120px;
  height: 40px;
  border-radius: 7px;
  background-color: #99816b;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  font-family: Inter;
  color: white;
}

#edit {
  width: 100%;
  max-width: 120px;
  height: 40px;
  border-radius: 7px;
  background-color: #4c4036;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: white;
  font-family: Inter;
}

#new {
  width: 100%;
  max-width: 120px;
  height: 40px;
  border-radius: 7px;
  background-color: #4c4036;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: white;
  font-family: Inter;
}

.lcardddd {
  background: white;
  width: 32.3%;
  padding: 40px;
  height: 430px;
  border-radius: 10px;
}

.card {
  background: white;
  border-radius: 10px;
  flex: 1;
  width: 65%;
  height: auto;
  padding-bottom: 15px;
  border: none;
}

.upcoming-section {
  display: flex;
  border-radius: 10px;
  align-items: start;
  width: 100%;
  flex-wrap: wrap;
  gap: 40px;
}

.pics {
  align-items: start;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 99.8%;
}

.pics-items {
  position: relative;
  overflow: hidden;
  align-self: start;
}

.pics-items img {
  width: 100%;
  height: 179px;
  object-fit: cover;
  object-position: top;
}

.pics-infos {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 5px;
  font-size: 12px;
  font-weight: 600;
  font-family: Inter;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px
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
    border-radius: 5px;
    object-fit: cover;
    background-color: #f0f0f0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.fallback-box {
    font-size: 14px;
    color: #888;
}

.icon-circles .flickr-dots i, .flickr-dots i{
    font-size: 8px;
    padding-bottom: 8px;
    margin: 1px;
}

.pics-items.top-left img {
    border-top-left-radius: 10px;
}

.pics-items.top-right img {
    border-top-right-radius: 10px;
}

.pics-items.bottom-left img {
    border-bottom-left-radius: 10px;
}

.pics-items.bottom-right img {
    border-bottom-right-radius: 10px;
}
.pics-infos.bottom-left {
    border-bottom-left-radius: 10px;
}

.pics-infos.bottom-right {
    border-bottom-right-radius: 10px;
}

@media only screen and (max-width: 1399px) {
    .profile-card {
        width: 60%
    }

    .card-section {
        width: 40%;
    }

    .cardddd {
    width: 47% !important;
    margin: 0;
  }

  .cardddd:last-child {
    margin: 0 auto;
  }

  .lcardddd {
      width: 47% !important;
      margin: 0;
  }

  .pics-items img {
    width: 100%;
    height: 175px;
    object-fit: cover;
    object-position: top;
  }
}

@media only screen and (max-width: 1199px) {
    .cardddd {
    width: 100% !important;
    margin: 0;
  }

  .cardddd:last-child {
    margin: 0 auto;
  }

  .lcardddd {
    width: 100% !important;
    margin: 0;
    height: 390px;
  }
}

@media only screen and (max-width: 991px) {
    .profile-card {
        width: 100%;
    }

    .card-section {
        width: 100%;
    }

     #cl {
    flex-direction: column !important;
    align-items: start !important;
  }

  .pics {
      grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 767px) {
    .pics {
      grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (max-width: 575px) {
}

@media only screen and (max-width: 359px) {
}

</style>
