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
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ backgroundImage: `url(${Color.cover_images[0]?.image_medium_url})` }">
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
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[1]?.image_medium_url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div class="card-section" style="width: 100%;">
                                <div class="stat-card" :style="{width: '50%', backgroundColor: Color.accent_color, color: Color.background_color}">
                                    <small class="ca-details">Members</small>
                                    <h3 class="number">{{ memData.total_members }}</h3>
                                </div>
                                <div class="event-card" :style="{width: '50%', backgroundColor: Color.primary_color}">
                                    <small class="ca-details">Next Event</small>
                                    <div class="row">
                                        <h3 v-if="evData?.remaining_days !== undefined && evData?.remaining_days !== null" class="number">
                                            {{ String(evData.remaining_days).padStart(2, '0') }}
                                            &nbsp;<span class="days">days to go</span>
                                        </h3>

                                        <h3 v-else class="days" :style="{ color: Color.background_color }">
                                            No upcoming events
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[2]?.image_medium_url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div v-if="SinEvents.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img v-if="SinEvents[0].images" :src="SinEvents[0].featured_thumb_url" alt="Event Image" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2" :style="{color: Color.text_color}">{{ SinEvents[0].name || 'Untitled Event' }}</h5>
                                                <div class="d-flex w-100 justify-content-between align-items-center">
                                                    <p class="date mb-0" :style="{color: Color.accent_color}">{{ formatDate(SinEvents[0].event_date) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="SinEvents[0].types?.[0]?.icon_url" :alt="SinEvents[0].types?.[0]?.name" class="virtual" style="width: 25px; height: 25px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary" :style="{color: Color.text_color}">
                                                {{ SinEvents[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex event-button">
                                            <router-link :to="{ name: 'EventSinglePublic', params: { id: SinEvents[0].id } }" custom v-slot="{ navigate }">
                                                <button class="btn me-2" id="view" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">View</button>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[3]?.image_medium_url}) no-repeat center center / cover`, color: '#E7EFF233' }">
                        <div class="hero-overlay">
                            <div class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="Notice.featured_image_thumb" alt="Notice Image" />

                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ Notice.title || 'Untitled Notice' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0" :style="{color: Color.accent_color}">{{ formatDate(Notice.created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="Notice.notice_type?.icon_url" :alt="Notice.notice_type?.name" class="virtual" style="width: 25px; height: 25px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary">
                                                {{ Notice.description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <router-link :to="{ name: 'NoticeSinglePublic', params: { id: Notice.id } }" custom v-slot="{ navigate }">
                                                <button class="btn me-2" id="view" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">View</button>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="Color.cover_images && Color.cover_images.length" class="hero-section" :style="{ background: `url(${Color.cover_images[4]?.image_medium_url}) no-repeat center center / cover`}">
                        <div class="hero-overlay">
                            <div v-if="News.length" class="custom-card mb-3 p-3" style="margin-top: 10%; width: 100%;">
                                <div class="d-flex flex-column flex-sm-row gap-3" style="flex: 1">
                                    <img :src="News[0].featured_image_thumb" alt="News Image" />
                                    <div>
                                        <div>
                                            <div class="events-card">
                                                <h5 class="mb-2">{{ News[0].title || 'Untitled News' }}</h5>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="date mb-0" :style="{color: Color.accent_color}">{{ formatDate(News[0].created_at) || 'Date Not Available' }}</p>
                                                    <div class="icon-container d-flex gap-2">
                                                        <img :src="News[0].club_news_type?.icon_url" :alt="News[0].club_news_type?.name" class="virtual" style="width: 25px; height: 25px" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="text-secondary">
                                                {{ News[0].description || 'No description provided.' }}
                                            </p>
                                        </div>
                                        <div class="button-group mt-3 d-flex">
                                            <router-link :to="{ name: 'NewsSinglePublic', params: { id: News[0].id } }" custom v-slot="{ navigate }">
                                                <button class="btn me-2" id="view" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">View</button>
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
            <section id="herocontainer">
                <div class="container">
                    <div :style="{backgroundColor: Color.background_color, paddingBottom: '15px', height: 'auto', border: 'none'}">
                        <div class="hero-grid" :style="{ backgroundColor: Color.background_color, alignItems: 'center'}">
                            <div class="hero-image">
                                <img :src="Color.header_img_medium_url" alt="hero" style="border-radius: 20px" />
                            </div>

                            <div class="hero-content">
                                <h1 id="clubheading" class="heading" :style="{ color: Color.text_color, fontWeight: '400' }">
                                    {{ Color.header_title }}
                                </h1>
                                <p id="clubsub" class="subhead" v-html="Color.header_description" :style="{ color: Color.text_color}"></p>
                                <router-link :to="{ name: 'ClubPublic' }" custom v-slot="{ navigate }">
                                    <button class="btn" id="learn-more" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">Learn More</button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="clubcontainer">
                <div class="container">
                    <div class="club-banners d-flex justify-content-between align-items-center px-4 py-2" :style="{backgroundColor: Color.primary_color}">
                        <div style="margin-left: 5px">
                            <div id="bhead" class="head" style="text-align: left" :style="{color: Color.background_color}">{{Club.club_name}}</div>
                            <small id="bpre" class="prehead" style="text-align: left" :style="{alignItems: 'left', color: Color.background_color}">{{Club.tag_line}}</small>
                        </div>

                        <div class="d-flex gap-2" style="margin-right: 5px">
                            <a href="#" target="_blank" rel="noopener noreferrer" class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color, textDecoration: 'none' }">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color, textDecoration: 'none' }">
                                <i class="fab fa-instagram"></i>
                            </a>

                            <a href="#" target="_blank" rel="noopener noreferrer" class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color, textDecoration: 'none' }">
                                <span class="flickr-dots" style="font-weight: bold"><i class="fa fa-circle" aria-hidden="true"></i><i class="fa fa-circle" aria-hidden="true"></i></span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="galcontainer">
                <div class="container">
                    <div style="height: auto; border: none" :style="{backgroundColor: Color.background_color}">
                        <div class="d-flex justify-content-between align-items-end mb-3" id="cl">
                            <div style="align-items: flex-end">
                                <h5 id="clubheading" :style="{color: Color.text_color, marginBottom: '15px'}">Club Galleries</h5>
                                <p id="clubsub" :style="{color: Color.text_color}">
                                    A preview of galleries made up of amazing photographs from club members
                                </p>
                            </div>

                            <router-link :to="{ name: 'ClubGalleryPublic' }" custom v-slot="{ navigate }">
                                <button class="btn" id="club-gallery" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.accent_color}">
                                    View All Club Galleries
                                </button>
                            </router-link>
                        </div>
                        <div class="clubpics">
                            <div v-for="(item, index) in chunkCards.flat()" :key="item.id || index" class="clubpics-item" :class="getPositionClass(index, chunkCards.flat().length)">
                                <div v-if="item.photos && item.photos.length">
                                    <img :src="item.photos[0].thumb_url" :alt="item.photos[0].title" style="object-fit: cover; object-position: top;" />
                                    <div class="clubpics-info" :class="getPositionClass(index, chunkCards.flat().length)" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.7) }">
                                        <span :style="{ color: Color.background_color }">
                                            {{ item.gallery_name}}
                                        </span>
                                    </div>
                                </div>
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
                                    <div class="event-item" v-for="event in Events.slice(0, 3)" :key="event.id || index" style="margin-bottom: 10px" @click="goToEvents(event.id)">
                                        <img v-if="event.featured_thumb_url" class="img-fluid event-img" :src="event.featured_thumb_url" alt="Event" @error="event.featured_thumb_url = null" :style="{backgroundColor: Color.primary_color}" />
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
                                <div v-else class="d-flex flex-column justify-content-center align-items-center" style="min-height: 250px;" :style="{ color:Color.primary_color }">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M8.4 8.3999C7.69687 8.70665 7.09678 9.20911 6.67125 9.8474C6.24572 10.4857 6.01272 11.2329 6 11.9999V39.9999C6 41.0608 6.42143 42.0782 7.17157 42.8283C7.92172 43.5785 8.93913 43.9999 10 43.9999H38C38.7694 43.9983 39.5221 43.7748 40.1677 43.3562C40.8133 42.9376 41.3245 42.3417 41.64 41.6399" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M42 31V12C42 10.9391 41.5786 9.92172 40.8284 9.17157C40.0783 8.42143 39.0609 8 38 8H19" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M32 4V12" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 20H20" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M42 20H31" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4 4L44 44" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span>No events found</span>
                                    <span style="text-align: center; width: 420px">There are currently no events scheduled. Check back soon for updates!</span>
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
                                    <div class="event-item" v-for="comp in Comps.slice(0, 3)" :key="comp.id || index" style="margin-bottom: 10px" @click="goToComps(comp.id)">
                                        <img v-if="comp.featured_thumb_url" class="img-fluid event-img" :src="comp.featured_thumb_url" alt="Comp" @error="comp.featured_thumb_url = null" :style="{backgroundColor: Color.primary_color}" />
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>
                                        <div class="event-details">
                                            <div class="event-info" style="display: flex; flex-direction: column">
                                                <span id="ename" :style="{color: Color.text_color}">{{ comp.name }}</span>
                                                <span id="espeaker" :style="{ color: Color.primary_color }">
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
                                <div v-else class="d-flex flex-column justify-content-center align-items-center" style="min-height: 250px;" :style="{ color:Color.primary_color }">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M8.4 8.3999C7.69687 8.70665 7.09678 9.20911 6.67125 9.8474C6.24572 10.4857 6.01272 11.2329 6 11.9999V39.9999C6 41.0608 6.42143 42.0782 7.17157 42.8283C7.92172 43.5785 8.93913 43.9999 10 43.9999H38C38.7694 43.9983 39.5221 43.7748 40.1677 43.3562C40.8133 42.9376 41.3245 42.3417 41.64 41.6399" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M42 31V12C42 10.9391 41.5786 9.92172 40.8284 9.17157C40.0783 8.42143 39.0609 8 38 8H19" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M32 4V12" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 20H20" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M42 20H31" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4 4L44 44" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span>No competitions found</span>
                                    <span style="text-align: center; width: 400px">There are currently no competitions scheduled. Check back soon for updates!</span>
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

            <section id="membercontainer">
                <div class="container">
                    <div id="gal" style="margin-bottom: 10px; background-color: #EBE6E1;" :style="{backgroundColor: Color.background_color}">
                        <div class="d-flex justify-content-between align-items-end mb-3" id="cl" style=" padding-top: 20px;">
                            <div>
                                <h5 id="clubheading" :style="{color: Color.text_color, marginBottom: '15px'}">Member Galleries</h5>
                                <p id="clubsub" :style="{color: Color.text_color}">A preview of galleries uploaded by our amazing photographers from the club</p>
                            </div>

                            <router-link :to="{ name: 'MemberGalleryPublic' }" custom v-slot="{ navigate }">
                                <button class="btn" id="member-gallery" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">
                                    View All Member Galleries
                                </button>
                            </router-link>
                        </div>

                        <div class="upcoming-section" style="display:flex">
                            <div class="card" style="height: auto; border: none; margin-top: -1px; padding-bottom: 0" :style="{backgroundColor: Color.background_color, margin: '0px'}">
                                <div class="pics">
                                    <div v-for="(item, index) in chunkedCards.flat()" :key="item.id || index" class="pics-items" :class="getPositionClass(index, chunkedCards.flat().length)">
                                        <div v-if="item.image_url">
                                            <img :src="item.image_url" :alt="item.username" style="object-fit: cover; object-position: top;" />
                                            <div class="pics-infos" :class="getPositionClass(index, chunkedCards.flat().length)" :style="{backgroundColor: hexToRgba(Color.primary_color, 0.7) }">
                                                <div :style="{color: Color.background_color}">
                                                    {{ item.gallery_name}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="lcardddd" style="background-color: #EBE6E1;" :style="{backgroundColor: hexToRgba(Color.secondary_color, 0.7) ,color: Color.text_color}">
                                <h5 class="head" :style="{color: Color.text_color}">Latest Members</h5>
                                <div class="row" style="padding-top: 30px;">
                                    <div class="col-6" style="margin-bottom: 20px;" v-for="latestMember in homeStore.homeData?.data?.latestMembers?.members.slice(0, 6)" :key="latestMember.id">
                                        <div class="event-items text-center" style="gap: 20px">
                                            <img v-if="latestMember.profile_image_url" class="img-fluid event-img" :src="latestMember.profile_image_url" alt="Profile" @error="latestMember.profile_image_url = null" :style="{width:'50px', height: '50px', borderRadius: '7px',  objectFit: 'cover', objectPosition: 'top', backgroundColor: Color.primary_color}" />
                                            <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                            </div>
                                            <div class="memtext" id="memname" :style="{color: Color.text_color}">
                                                <span>{{ latestMember.first_name +' '+ latestMember.last_name}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="latest-interaction" :style="{backgroundColor: Color.secondary_color}">
                <div class="container" style="background-color: #99816B;" :style="{backgroundColor: Color.secondary_color}">
                    <h5 id="clubheading" class="heading" :style="{color: Color.text_color, marginBottom: '12px'}">Latest interactions</h5>
                    <h6 id="clubsub" class="subhead" :style="{color: Color.text_color}">A preview of comments and reactions on the photos & other posts on the club website</h6>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-12 col-md-6 mb-4">
                            <div class="card comments-card shadow-sm" :style="{ backgroundColor: Color.background_color, margin: '0px' }">
                                <div class="card-header border-0" :style="{ backgroundColor: Color.background_color }">
                                    <h5 class="mb-0" :style="{ color: Color.text_color, paddingLeft: '-25px'}">Recent Comments</h5>
                                </div>

                                <div class="card-body overflow-auto" style="max-height: 360px; margin-left: -21px; padding:5px">
                                    <div class="event-item d-flex" v-for="comment in flatComments" :key="comment.id" style="padding: 0px 35px; gap: 30px; margin-bottom: 20px">
                                        <img :src="comment.image_url" alt="Interaction Image" class="img-fluid" id="comimg" />

                                        <div class="event-details d-flex justify-content-between align-items-start">
                                            <div class="event-info">
                                                <div class="d-flex align-items-center">
                                                    <p id="comtext" :style="{ color: Color.text_color }">
                                                        <strong>
                                                            {{ comment.interacted_by?.username || comment.uploaded_by.username }}
                                                        </strong>
                                                        &nbsp; {{ comment.comment || 'No comments yet' }}
                                                    </p>
                                                </div>
                                                <div>
                                                    <a href="#" id="comreply" class="small me-3" :style="{ color: Color.text_color }">
                                                        Reply
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="galtext ms-3">
                                                <span class="small" id="comdate" :style="{ color: Color.text_color }">
                                                    {{ timeAgo(comment.created_at) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="comments-cards p-4 shadow-sm" :style="{ backgroundColor: Color.background_color }">
                                <div class="card-header border-0" :style="{ backgroundColor: Color.background_color }">
                                    <h5 class="mb-0" :style="{ color: Color.text_color, paddingLeft: '-25px'}">Recent Likes</h5>
                                </div>

                                <div class="card-body">
                                    <div class="interaction-grid">
                                        <div class="interaction-item" v-for="interaction in Interaction.slice(0, 10)" :key="interaction.id">
                                            <div class="like-card text-center position-relative">
                                                <img :src="interaction.images.thumb_url" class="img-fluid" id="likeimg" alt="User" />
                                                <span class="heart-icon" :style="{ backgroundColor: Color.accent_color, color: Color.background_color }">
                                                    <img :src="Heart" alt="icon" style="width: 14px; height: 13px" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="newscontainer">
                <div class="container">
                    <div class="events d-flex justify-content-between align-items-end mb-3" id="cl" :style="{backgroundColor: Color.background_color}">
                        <div>
                            <h5 id="clubheading" :style="{color: Color.text_color, marginBottom: '15px'}">Latest Updates</h5>
                            <p id="clubsub" class="subhead" :style="{color: Color.text_color}">Latest results from our camera club competitions, and news posted on our website</p>
                        </div>

                        <router-link :to="{ name: 'RytonCompetitionResults' }" custom v-slot="{ navigate }">
                            <button class="btn" id="view-results" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.primary_color}">
                                View All Results
                            </button>
                        </router-link>
                    </div>
                    <div class="upcoming-sectionss" style="display: flex">
                        <div class="ncardddd d-flex flex-column" style="background-color: #EBE6E1;" :style="{backgroundColor: Color.secondary_color}">
                            <h5 class="head" :style="{color: Color.text_color}">Latest News</h5>
                            <div class="event-list" v-if="News.length" style="padding-top: 20px">
                                <div class="event-item" v-for="clubnew in News.slice(0, 3)" :key="clubnew.id || index" style="margin-bottom: 10px;" @click="goToNews(clubnew.id)">
                                    <img v-if="clubnew.featured_image_thumb" class="img-fluid event-img" :src="clubnew.featured_image_thumb" alt="News" @error="clubnew.featured_image_thumb = null" />
                                    <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                    </div>
                                    <div class="event-details">
                                        <span class="prehead" id="pname" :style="{color: Color.text_color, fontWeight: '600'}">{{ clubnew.title }}</span>
                                        <div class="galtext" id="edate">
                                            <small class="galtext" :style="{color: Color.text_color}">{{ formatDate(clubnew.created_at) }}</small><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="d-flex flex-column justify-content-center align-items-center" style="min-height: 250px;" :style="{ color: Color.primary_color}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M8.4 8.3999C7.69687 8.70665 7.09678 9.20911 6.67125 9.8474C6.24572 10.4857 6.01272 11.2329 6 11.9999V39.9999C6 41.0608 6.42143 42.0782 7.17157 42.8283C7.92172 43.5785 8.93913 43.9999 10 43.9999H38C38.7694 43.9983 39.5221 43.7748 40.1677 43.3562C40.8133 42.9376 41.3245 42.3417 41.64 41.6399" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M42 31V12C42 10.9391 41.5786 9.92172 40.8284 9.17157C40.0783 8.42143 39.0609 8 38 8H19" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M32 4V12" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 20H20" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M42 20H31" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 4L44 44" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>No news found</span>
                                <span style="text-align: center; width: 420px">There are currently no news scheduled. Check back soon for updates!</span>
                            </div>
                            <div class="button-group mt-auto">
                                <router-link :to="{ name: 'NewsPublic' }" custom v-slot="{ navigate }">
                                    <button class="btn btn-sm" id="view-all" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.primary_color}">
                                        View All
                                    </button>
                                </router-link>
                            </div>
                        </div>

                        <div class="card" :style="{ backgroundColor: Color.background_color, width: '60%', height: 'auto', border: 'none', borderRadius: '10px', marginTop: '13px' }">
                            <div class="resultpics" v-if="chunkedcards.flat().length">
                                <div v-for="(item, index) in chunkedcards.flat()" :key="item.id || index" class="resultpics-items" :class="getPositionClass(index, chunkedcards.flat().length)">
                                    <div v-if="item.image && item.image.length">
                                        <img v-if="item.image" :src="item.image" :alt="item.gallery_name" style="object-fit: cover; object-position: top;" />
                                        <div class="resultpics-infos" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.7) }" :class="getPositionClass(index, chunkedcards.flat().length)">
                                            <div :style="{ color: Color.background_color }">
                                                {{ item.gallery_name}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="d-flex flex-column justify-content-center align-items-center" style="min-height: 250px;" :style="{ color: Color.primary_color}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M8.4 8.3999C7.69687 8.70665 7.09678 9.20911 6.67125 9.8474C6.24572 10.4857 6.01272 11.2329 6 11.9999V39.9999C6 41.0608 6.42143 42.0782 7.17157 42.8283C7.92172 43.5785 8.93913 43.9999 10 43.9999H38C38.7694 43.9983 39.5221 43.7748 40.1677 43.3562C40.8133 42.9376 41.3245 42.3417 41.64 41.6399" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M42 31V12C42 10.9391 41.5786 9.92172 40.8284 9.17157C40.0783 8.42143 39.0609 8 38 8H19" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M32 4V12" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 20H20" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M42 20H31" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 4L44 44" stroke="#8EA390" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>No Latest Updates</span>
                                <span style="text-align: center; width: 420px">There are currently no results to display. Check back soon for updates!</span>
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
                            <img :src="Color.footer_img_medium_url" alt="sample" class="footer-img" />
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
import {
    ref,
    onMounted,
    computed,
    onUnmounted
} from 'vue';
import {
    useHomeStore
} from '@/stores/club_public/ClubData';
import {
    storeToRefs
} from 'pinia';
import Loader from "@/components/LoaderAll.vue";
import Calendar from "@/components/club_public/Calendars/CalendarRyton.vue";
import Heart from "@/assets/icons/Heart.svg"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    useUserStore
} from '@/stores/club_admin/UserStore';
import {
    useRouter
} from "vue-router";

const columns = ref(5);

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
const {
    username,
    profile_image_url
} = storeToRefs(user)

const handleLogout = async () => {
    await user.logout();
};

dayjs.extend(relativeTime);

const isLoading = ref(true);
const homeStore = useHomeStore();
const {
    homeData
} = storeToRefs(homeStore);

const memData = computed(() => homeStore.homeData?.data?.clubSettings?.original?.data || {});
const evData = computed(() => homeStore.homeData?.data?.clubSettings?.original?.data?.upcoming_event_days_count || {});
const Events = computed(() => homeStore.homeData?.data?.upcomingEvents || []);
const SinEvents = computed(() => homeStore.homeData?.data?.singleEvent || []);
const News = computed(() => homeStore.homeData?.data?.clubNews || {});
const Notice = computed(() => homeStore.homeData?.data?.latest_notice?.original?.data || {});
const cardes = computed(() => homeData.value?.data?.clubGalleries?.original?.data || []);
const Comps = computed(() => homeStore.homeData?.data?.upcomingCompetitions || []);
const Club = computed(() => homeStore.homeData?.data?.clubSettings.original.data.club || {});
const Color = computed(() => homeStore.clubSettings || {});
const cards = computed(() => {
    const members = homeData.value?.data?.memberGalleries || [];

    return members.map(member => {
        const firstGallery = member.galleries?. [0];

        return {
            id: member.id,
            username: member.username,
            gallery_name: firstGallery?.gallery_name || "No Gallery",
            image_url: firstGallery?.photos?. [0]?.thumb_url || null
        };
    }).filter(card => card.image_url);
});

const Interaction = computed(() =>
    Array.isArray(homeStore.homeData.data?.latestInteractions) ?
    homeStore.homeData.data.latestInteractions : []
);

const flatComments = computed(() => {
    if (!Array.isArray(Interaction.value)) return [];

    let all = [];

    Interaction.value.forEach((interaction) => {
        if (Array.isArray(interaction.comments)) {
            interaction.comments.forEach((comment) => {
                all.push({
                    ...comment,
                    image_url: interaction.images.thumb_url,
                    uploaded_by: interaction.uploaded_by,
                });
            });
        }
    });

    return all.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
});

const picture = computed(() => {
    const competitions = homeStore.homeData?.data?.latestResults?.original?.data || [];

    return competitions.flatMap(comp => {
            const members = comp?.competition_members || [];

            return members.flatMap(member =>
                (member.entries || [])
                .filter(entry => entry.position === 1 && entry.is_published === true)
                .map(entry => ({
                    id: entry.id,
                    image: entry.entry_image_thumb,
                    gallery_name: entry.entry_image_title || "No Name"
                }))
            );
        })
        .slice(0, 10)
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";

    const day = date.getDate();
    const month = date.toLocaleString("en-GB", {
        month: "long"
    });
    const year = date.getFullYear();

    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";

    return `${day}${suffix} ${month} ${year}`;
};

const chunkCards = computed(() => {
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < cardes.value.length; i += chunkSize) {
        chunks.push(cardes.value.slice(i, i + chunkSize));
    }
    return chunks;
});

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

const chunkedCards = computed(() => {
    const chunkSize = 5;
    const rowChunks = [];

    for (let i = 0; i < cards.value.length; i += chunkSize) {
        rowChunks.push(cards.value.slice(i, i + chunkSize));
    }

    return rowChunks.slice(0, 2);
});

const timeAgo = (date) => {
    return dayjs(date).fromNow();
};

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

const chunkedcards = computed(() => {
    const chunkdSize = 5;
    const chunkds = [];
    for (let i = 0; i < picture.value.length; i += chunkdSize) {
        chunkds.push(picture.value.slice(i, i + chunkdSize));
    }
    return chunkds;
});

const goToNews = (id) => {
  router.push({
    name: "NewsSinglePublic",
    params: { id }
  });
};

const goToEvents = (id) => {
  router.push({
    name: "EventSinglePublic",
    params: { id }
  });
};

const goToComps = (id) => {
  router.push({
    name: "CompetitionSinglePublic",
    params: { id }
  });
};

const userRole = "club_admin"
onMounted(async () => {
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".admin-dropdown")) {
            isDropdownOpen.value = false;
        }
    });
    if (userRole === "club_admin") {
        await import("@/assets/css/clubstyle.css");
    } else {
        await import("@/assets/css/style.css");
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    const carouselEl = document.querySelector('#carouselExampleIndicators')
    if (carouselEl && window.bootstrap) {
        new window.bootstrap.Carousel(carouselEl)
    }

    let domain = window.location.hostname.split('.')[0];
    try {
        await homeStore.fetchHomeData(domain);

    } catch (error) {
        console.error("Error fetching home data:", error);
    } finally {
        isLoading.value = false;
    }

});

onUnmounted(() => {
    window.removeEventListener("resize", updateColumns);
});

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
</script>

<style scoped>
.Latest {
    background: white;
    width: 35%;
    height: 370px;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
}

.comments-card {
    width: 99%;
    height: 330px;
    overflow-y: auto;
    margin-left: 0%;
    border-radius: 10px;
    padding: 20px 20px;
}

.comments-cards {
    margin-left: 1%;
    width: 99%;
    height: 330px;
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
    border-radius: 7px;
    object-fit: cover;
    background-color: #D6DFD2;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.event-item {
    gap: 20px;
}

.fallback-box {
    font-size: 14px;
    color: #D6DFD2;
    ;
}

.icon-circles .flickr-dots i,
.flickr-dots i {
    font-size: 8px;
    padding-bottom: 10px;
    margin: 1px;
}

.clubpics-item.top-left img {
    border-top-left-radius: 10px !important;
}

.clubpics-item.top-right img {
    border-top-right-radius: 10px !important;
}

.clubpics-item.bottom-left img {
    border-bottom-left-radius: 10px !important;
}

.clubpics-item.bottom-right img {
    border-bottom-right-radius: 10px !important;
}

.clubpics-info.bottom-left {
    border-bottom-left-radius: 10px;
}

.clubpics-info.bottom-right {
    border-bottom-right-radius: 10px;
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

.resultpics-items.top-left img {
    border-top-left-radius: 10px;
}

.resultpics-items.top-right img {
    border-top-right-radius: 10px;
}

.resultpics-items.bottom-left img {
    border-bottom-left-radius: 10px;
}

.resultpics-items.bottom-right img {
    border-bottom-right-radius: 10px;
}

.resultpics-infos.bottom-left {
    border-bottom-left-radius: 10px;
}

.resultpics-infos.bottom-right {
    border-bottom-right-radius: 10px;
}

.clubpics-item.special-radius img,
.clubpics-info.special-radius {
    border-bottom-right-radius: 10px;
}

.pics-items.special-radius img,
.pics-infos.special-radius {
    border-bottom-right-radius: 10px;
}

.resultpics-items.special-radius img,
.resultpics-infos.special-radius {
    border-bottom-right-radius: 10px;
}

@media only screen and (max-width: 767px) {
    .comments-cards {
        width: 100%;
        margin: 0 auto;
    }
}

@media only screen and (max-width: 991px) {

    .right-header .profile-mobile,
    .right-header .divider,
    .notification-desktop,
    .down {
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
