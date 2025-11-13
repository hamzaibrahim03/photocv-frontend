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
                            <a class="nav-link" :class="{ active: $route.path === '/ryton' }" @click.prevent="router.push('/ryton'); closeNav()" :style="{ color: Color.text_color, fontFamily: 'Inter', fontSize: '18px' }">
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
                            <a class="nav-link" :class="{ active: $route.path === '/rytonclub' }" href="/rytonclub" :style="{ color: Color.text_color }">
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
                            <span v-if="username" class="notification-desktop">Welcome, {{ username }}</span>
                            <span v-else class="notification-desktop">Welcome, Guest</span><i class="fa-solid fa-chevron-down text-xs text-gray-500 down notification-desktop" @click.stop.prevent="toggleDropdown"></i>

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
            </div>
        </div>
        
        <div class="contents">
            <section>
                <div class="container" id="heads">
                    <div class="events-header">
                        <h2 class="heading" :style="{ color: Color.text_color }">{{about.title}}</h2>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input v-model="search" type="search" class="search-input" id="dt-search-1" placeholder="Search" aria-controls="example1" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container" id="overall">
                    <span class="head" v-html="about.description"></span>

                    <div class="divider4"></div>
                    <section>
                        <div class="container">
                            <h5 class="heading" :style="{ color: Color.text_color }">Club Officials</h5>

                            <div class="row">
                                <div class="col-md-4">
                                    <h2 class="main">Executive Committee</h2>
                                    <div v-for="person in getByRole('President')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{ color: Color.accent_color }">
                                            President
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('super_admin')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Chairman
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('club-admin')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Vice-Chair
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('Publicity & Events Officer')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Secretary
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('General Members')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Programme Secretary
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('General Members')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Treasurer
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h2 class="main">Competition Secretaries</h2>
                                    <div v-for="person in getByRole('General Members')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Prints
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('General Members')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            PDI
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('General Members')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            External
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <h2 class="main">Technical & Committee</h2>
                                    <div v-for="person in getByRole('General Members')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Webmaster
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('Internal Comp Secretary')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            IT Co-ordinator
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div v-for="person in getByRole('Social Secretary')" :key="person.email" class="official" >
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Social Secretary
                                        </h1>
                                        <h1 class="list" :style="{ color: Color.text_color }">
                                            {{ person.first_name }} {{ person.last_name }}
                                        </h1>
                                        <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                    </div>

                                    <div>
                                        <h1 class="list" :style="{color: Color.accent_color}">
                                            Committee Members
                                        </h1>
                                        <div v-for="person in getByRole('member').slice(0, 3)" :key="person.email" class="official">
                                            <h1 class="list" :style="{ color: Color.text_color }">
                                                {{ person.first_name }} {{ person.last_name }}
                                            </h1>
                                            <small class="email" :style="{ color: Color.text_color }">
                                            <i class="fa fa-envelope"></i> {{ person.email }}
                                        </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

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
import { useRytonClubStore } from '@/stores/club_public/RytonClub';
import Loader from "@/components/LoaderAll.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '@/stores/club_admin/UserStore';
import { useRouter } from "vue-router";
import { useHomeStore } from '@/stores/club_public/ClubData';
import { storeToRefs } from 'pinia'

const router = useRouter();
const isNavOpen = ref(false);
const isDropdownOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
const closeNav = () => (isNavOpen.value = false);
const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value);


const rytonclubStore = useRytonClubStore();
dayjs.extend(relativeTime);
const isLoading = ref(true);

const user = useUserStore();
const homeStore = useHomeStore();

const handleLogout = async () => {
  await user.logout();
};

const { username, profile_image_url } = storeToRefs(user)
const memData = computed(() => rytonclubStore.clubData?.data?.clubSettings?.original?.data || {});
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});
const about = computed(() => rytonclubStore.clubData?.data?.aboutUs || {});
const member = computed(() => rytonclubStore.clubData?.data?.clubOfficials)
const domain = window.location.hostname.split('.')[0];

const getByRole = (roleName) => {
  return member .value.filter(o => o.roles && o.roles.includes(roleName))
}
onMounted(async () => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) isDropdownOpen.value = false;
  });

  const carouselEl = document.querySelector('#carouselExampleIndicators');
  if (carouselEl && window.bootstrap) {
    new window.bootstrap.Carousel(carouselEl);
  }

  try {
    await rytonclubStore.fetchRytonClubData(domain);
    await homeStore.fetchHomeData(domain);
  } catch (error) {
    console.error("Error fetching ryton club data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.heading {
     font-family: Inter;
     font-weight: 400;
     font-style: Regular;
     font-size: 36px;
     line-height: 100%;
     letter-spacing: 0%;
}
#cluboff {
    margin-bottom: 70px;
}
.list {
    font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 20px;
line-height: 36px;
letter-spacing: 0%;
}
.main{
    font-family: Inter;
font-weight: 500;
font-style: Medium;
font-size: 28px;
line-height: 100%;
letter-spacing: 0%;
}
.email {
    font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 16px;
line-height: 20px;
letter-spacing: 0%
}
#overall {
     padding: 80px 70px 50px 100px;
}
#heads {
    padding: 60px 70px 20px 90px;
}
.divider4 {
  width: 1100px;
  height: 1px;
  background-color: rgba(217, 217, 217, 1);
  margin-top: 75px;
  margin-bottom: 70px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
}
.head {
    font-family: Inter;
font-weight: 500;
font-style: Medium;
font-size: 24px;
line-height: 100%;
letter-spacing: 0%;
width: 100%;
max-width: 1150px;

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
</style>