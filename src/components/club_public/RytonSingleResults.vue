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
                            <a href="#" class="icon profile-mobile">
                                <div style="cursor: pointer">
                                    <template v-if="profile_image_url">
                                        <img :src="profile_image_url" alt="User profile" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;" />
                                    </template>
                                    <template v-else>
                                        <i class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '44px' }"></i>
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
                        <h2 class="events-title" :style="{ color: Color.text_color }">Results</h2>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input v-model="search" type="search" class="search-input" id="dt-search-1" placeholder="Search" aria-controls="example1" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="competition-section">
                <div class="container">
                    <h2 class="heading">
                        {{ competitionTitle }} - {{ competitionSeason }}
                    </h2>
                    <div class="gallery-grid">
                        <div v-for="item in entries" :key="item.id" class="gallery-card" @click="openSlide(item)">
                            <img :src="item.image" class="gallery-img" />
                            <div class="overlay">
                                <div class="text">
                                    <p class="title">{{ item.title }}</p>
                                    <span class="author">by {{ item.author }}</span>
                                </div>
                                <img v-if="getMedalIcon(item.position)" :src="getMedalIcon(item.position).src" :alt="getMedalIcon(item.position).name" id="badge" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="suggestion-header d-flex justify-content-between align-items-center">
                        <h3 class="heading" :style="{fontWeight: '500'}">More from Club Galleries</h3>

                        <button id="view" :style="{color: Color.background_color, backgroundColor: Color.accent_color}" style="border: none">View All</button>
                    </div>

                    <div class="suggestion-gallery">
                        <div v-for="(item, index) in suggestion.slice(0, 10)" :key="index" class="suggestion-card" :class="getPositionClass(index, suggestion.length)">
                            <img :src="item.image" :alt="item.title" />
                            <div class="img-overlay" :class="getPositionClass(index, suggestion.length)" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.7), textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center' }">
                                <p class="photo-title">{{ item.title }}</p>
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

<script setup >
import {
    ref,
    onMounted,
    onUnmounted,
    computed
} from 'vue';
import {
    useRytonSingleCompResultStore
} from '@/stores/club_public/RytonSingleResult';
import {
    storeToRefs
} from 'pinia';
import Loader from "@/components/LoaderAll.vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    useUserStore
} from '@/stores/club_admin/UserStore';
import {
    useHomeStore
} from '@/stores/club_public/ClubData';
import {
    useRoute,
    useRouter
} from 'vue-router';
import NotificationBell from '@/components/club_public/Notifications/NotificationBell.vue'

dayjs.extend(relativeTime);

const columns = ref(5);
const route = useRoute();
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
const isLoading = ref(true);

const user = useUserStore();
const {
    username,
    profile_image_url
} = storeToRefs(user);

const entries = ref([]);

const resultStore = useRytonSingleCompResultStore();
const homeStore = useHomeStore();

const memData = computed(() =>
    resultStore.sincompresData?.clubSettings?.original?.data || {}
);

const competitionTitle = computed(() =>
    resultStore.sincompresData?.competitionResult?.original?.data?.name || {}
);

const competitionSeason = computed(() => {
    const startDate = resultStore.sincompresData?.competitionResult?.original?.data?.start_date;
    if (!startDate) return "";

    const startYear = dayjs(startDate).year();
    const endYear = startYear + 1;

    return `Season ${startYear}-${endYear}`;
});

const evData = computed(() =>
    resultStore.sincompresData?.clubSettings?.original?.data?.upcoming_event_days_count || {}
);

const Club = computed(() =>
    resultStore.sincompresData?.clubSettings?.original?.data?.club || {}
);

const Color = computed(() =>
    resultStore.sincompresData?.clubSettings?.original?.data?.settings || {}
);

const randomClubs = computed(() => {
    return resultStore.sincompresData?.clubGalleries || [];
});

const suggestion = computed(() => {
    return randomClubs.value.map(club => {
        const firstPhoto = club.photos?. [0];

        return {
            gallery_id: club.gallery_id,
            gallery_name: club.gallery_name,
            total_photos: club.total_photos,
            image: firstPhoto?.image || "",
            title: firstPhoto?.title || "",
            comments_count: firstPhoto?.comments_count || 0,
            likes_count: firstPhoto?.likes_count || 0,
            uploaded_by: firstPhoto?.uploaded_by || ""
        };
    });
});

const openSlide = (clickedImage) => {
    if (!clickedImage) return

    const allImages = entries.value 

    const startIndex = allImages.findIndex(
        img => img.id === clickedImage.id
    )

    localStorage.setItem("selectedImages", JSON.stringify(allImages))
    localStorage.setItem(
        "startIndex",
        startIndex >= 0 ? startIndex : 0
    )

    router.push({
        path: "/rytonresultslide",
        query: {
            gallery: route.params.id
        }
    })
}

const hexToRgba = (hex, alpha) => {
    let r = 0,
        g = 0,
        b = 0;

    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r},${g},${b},${alpha})`;
}

function getPositionClass(index, total) {
    const row = Math.floor(index / columns.value);
    const col = index % columns.value;
    const lastIndex = total - 1;

    let classes = [];

    if (index === 0) classes.push("top-left");

    if (row === 0 && col === columns.value - 1) {
        classes.push("top-right");

        if (total >= 6 && total <= 9) {
            classes.push("special-radius");
        }
    }

    if (row === Math.floor(lastIndex / columns.value) && col === 0) {
        classes.push("bottom-left");
    }

    if (index === lastIndex) classes.push("bottom-right");

    return classes.join(" ");
}

function updateColumns() {
    if (window.innerWidth < 575) {
        columns.value = 1;
    } else if (window.innerWidth < 991) {
        columns.value = 2;
    } else if (window.innerWidth < 1199) {
        columns.value = 3;
    } else {
        columns.value = 5;
    }
}

const getMedalIcon = (position) => {
    switch (position) {
        case 1:
            return {
                src: new URL('@/assets/icons/positions/1.svg',
                    import.meta.url).href, name: 'First Medal'
            };
        case 2:
            return {
                src: new URL('@/assets/icons/positions/2.svg',
                    import.meta.url).href, name: 'Second Medal'
            };
        case 3:
            return {
                src: new URL('@/assets/icons/positions/3.svg',
                    import.meta.url).href, name: 'Third Medal'
            };
        case 4:
            return {
                src: new URL('@/assets/icons/positions/4.svg',
                    import.meta.url).href, name: 'Forth Medal'
            };
        case 5:
            return {
                src: new URL('@/assets/icons/positions/5.svg',
                    import.meta.url).href, name: 'Fifth Medal'
            };
        case 6:
            return {
                src: new URL('@/assets/icons/positions/6.svg',
                    import.meta.url).href, name: 'Sixth Medal'
            };
        case 7:
            return {
                src: new URL('@/assets/icons/positions/7.svg',
                    import.meta.url).href, name: 'Seventh Medal'
            };
        case 8:
            return {
                src: new URL('@/assets/icons/positions/8.svg',
                    import.meta.url).href, name: 'Eighth Medal'
            };
        case 9:
            return {
                src: new URL('@/assets/icons/positions/9.svg',
                    import.meta.url).href, name: 'Ninth Medal'
            };
        case 10:
            return {
                src: new URL('@/assets/icons/positions/c.svg',
                    import.meta.url).href, name: 'Commended'
            };
        case 11:
            return {
                src: new URL('@/assets/icons/positions/h.svg',
                    import.meta.url).href, name: 'Highly'
            };
        case 12:
            return {
                src: new URL('@/assets/icons/positions/i.svg',
                    import.meta.url).href, name: 'Intermediate'
            };
        default:
            return {
                src: new URL('@/assets/icons/positions/i.svg',
                    import.meta.url).href, name: 'Intermediate'
            };
    }
};

onMounted(async () => {
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".admin-dropdown")) {
            isDropdownOpen.value = false;
        }
    });
    updateColumns();
    window.addEventListener("resize", updateColumns);

    const carouselEl = document.querySelector('#carouselExampleIndicators');
    if (carouselEl && window.bootstrap) {
        new window.bootstrap.Carousel(carouselEl);
    }

    try {
        const domain = window.location.hostname.split('.')[0];
        const id = route.params.id;

        await homeStore.fetchHomeData(domain);
        await resultStore.fetchRytonSingleCompResData(id);

        const apiEntries =
            resultStore.sincompresData?.competitionResult?.original?.data?.entries || [];

        const uniqueByPosition = new Map();

        apiEntries.forEach(item => {
            if (!uniqueByPosition.has(item.position)) {
                uniqueByPosition.set(item.position, {
                    id: item.id,
                    image: item.entry_image,
                    title: item.entry_image_title,
                    author: item.member_name || "Unknown",
                    position: item.position,
                    exif: item.exif ?? {},
                    comments: item.comments ?? [],
                    likes: item.likes_count
                });
            }
        });

        entries.value = Array.from(uniqueByPosition.values());

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        isLoading.value = false;
    }
});

onUnmounted(() => {
    window.removeEventListener("resize", updateColumns);
});
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

.events-header,
.season-header {
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
    gap: 20px
}

.search-bar:hover,
.search-bar:focus-within {
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

.suggestion-gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
}

.suggestion-card {
    position: relative;
    overflow: hidden;
}

.suggestion-card img {
    border-radius: 0;
    width: 100%;
    height: 295px;
    object-fit: cover;
    object-position: top;
}

.suggestion-card .img-overlay {
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
    height: 55px;
}

.top-left img {
    border-top-left-radius: 10px;
}

.top-right img {
    border-top-right-radius: 10px;
}

.bottom-left img {
    border-bottom-left-radius: 10px;
}

.bottom-right img {
    border-bottom-right-radius: 10px;
}

.bottom-left {
    border-bottom-left-radius: 10px;
}

.bottom-right {
    border-bottom-right-radius: 10px;
}

.special-radius img,
.special-radius {
    border-bottom-right-radius: 10px;
}

.icon-circles .flickr-dots i,
.flickr-dots i {
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

.competition-section {
    padding: 30px;
}

.heading {
    font-size: 20px;
    margin-bottom: 20px;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.gallery-card {
    position: relative;
    overflow: hidden;
}

.gallery-img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(108, 136, 94, 0.95);
    padding: 8px 10px;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.author {
    font-size: 11px;
    color: #e6e6e6;
}

.overlay .title {
    font-size: 12px;
}

.badge {
    font-size: 14px;
}
</style>
