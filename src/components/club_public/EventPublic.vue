<template>
<div :style="{ backgroundColor: Color.background_color, fontFamily: Color.fonts }">
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
        <nav class="navbar navbar-expand-lg custom-navbar shadow-sm" :style="{ position: 'sticky', top: '0', zIndex: '1001', backgroundColor: Color.background_color, height: '108px' }">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="/">
                    <img :src="Color.logo_url" class="img-fluid" id="logo" alt="Ryton" style="max-height: 60px" />
                </a>
                <button class="navbar-toggler" type="button" @click="toggleNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" :class="{ show: isNavOpen }" id="navbarSupportedContent">
                    <ul class="navbar-nav mb-2 mb-lg-0 custom-nav">
                        <li class="nav-item">
                            <a class="nav-link" :class="{ active: $route.path === '/' }" @click.prevent="router.push('/'); closeNav()" :style="{ color: Color.text_color, fontFamily: 'Inter', fontSize: '18px' }">
                                Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#events" @click="closeNav" :style="{ color: Color.text_color }">
                                Events
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#events" @click="closeNav" :style="{ color: Color.text_color }">
                                Competitions
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#gal" @click="closeNav" :style="{ color: Color.text_color }">
                                Galleries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#newscontainer" @click="closeNav" :style="{ color: Color.text_color }">
                                News
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#joincontainer" @click="closeNav" :style="{ color: Color.text_color }">
                                Club
                            </a>
                        </li>
                    </ul>
                </div>  
                <div class="right-header d-flex align-items-center">
                    <a href="notification.html" class="icon">
                        <i class="fa-regular fa-bell text-lg mx-3" :style="{ fontSize: '18px' }"></i>
                    </a>
                    <div class="divider" :style="{ width: '2px', height: '46px', margin: '0 10px', background:'#333' }"></div>

                    <div class="admin-dropdown position-relative">
                        <a href="#" class="icon" @click.prevent="toggleDropdown">
                            <img v-if="User && User.isLoggedIn && User.profile_image_url" :src="User.profile_image_url" alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                            <i v-else class="fa-regular fa-user-circle" :style="{ color: Color.accent_color, fontSize: '38px' }"></i>
                        </a>

                        <router-link v-if="!User || !User.isLoggedIn" to="/login" custom v-slot="{ navigate }">
                            <span @click="navigate" id="login">
                                Login <i class="fa-solid fa-chevron-down text-xs text-gray-500"></i>
                            </span>
                        </router-link>
                        <div class="dropdown-menu" v-show="isDropdownOpen">
                            <a href="#" @click.prevent="handleLogout">Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>


        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
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
                                <div class="row" style="padding-left: 3%">
                                    <div class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color }"><i class="fab fa-facebook-f"></i></div>
                                    <div class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color }"><i class="fab fa-instagram"></i></div>
                                    <div class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color }"><span class="flickr-dots"><i class="fa-solid fa-circle"></i><i class="fa-solid fa-circle"></i></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[1]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div class="card-section" style="width: 100%;" id="cl">
                                <div class="stat-card" :style="{width: '50%', backgroundColor: Color.accent_color, color: Color.background_color}">
                                    <small class="ca-details">Members</small>
                                    <h3 class="number">{{ memData.total_members }}</h3>
                                </div>
                                <div class="event-card" :style="{width: '50%', backgroundColor: Color.primary_color}">
                                    <small class="ca-details">Next Event</small>
                                    <div class="row">
                                        <h3 class="number">{{ evData.remaining_days }}&nbsp;<span class="days">days to go</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[2]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div v-if="Events.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img v-if="Events[0].images" :src="Events[0].featured_image_url" alt="Event Image" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ Events[0].name || 'Untitled Event' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0">{{ formatDate(Events[0].event_date) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>                  
                                            <p class="text-secondary">
                                                {{ Events[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <button class="btn me-2" id="view" @click="navigate" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[3]?.url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="Notice.featured_image_url" alt="Notice Image" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ Notice.title || 'Untitled Event' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0">{{ formatDate(Notice.created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary">
                                                {{ Notice.description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <button class="btn me-2" id="view" @click="navigate" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[4]?.url}) no-repeat center center / cover`}">
                        <div class="hero-overlay">
                            <div v-if="News.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%;">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="News[0].featured_image_url" alt="News Image" />
                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ News[0].title || 'Untitled Event' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0">{{ formatDate(News[0].created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Mess" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cam" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Pro" alt="icon" style="width: 20px; height: 20px" />
                                                        <img :src="Cal" alt="icon" style="width: 20px; height: 20px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary">
                                                {{ News[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <button class="btn me-2" id="view" :style="{backgroundColor: Color.accent_color, color: Color.background_color}">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>