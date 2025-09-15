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

        <div class="contents">
            <section id="herocontainer">
                <div class="container">
                    <div :style="{backgroundColor: Color.background_color, paddingBottom: '15px', height: 'auto', border: 'none'}">
                        <div class="hero-grid" :style="{ backgroundColor: Color.background_color, alignItems: 'center'}">
                            <div class="hero-image">
                                <img :src="Color.header_img_url" alt="hero" style="border-radius: 20px" />
                            </div>

                            <div class="hero-content">
                                <h1 id="clubheading" class="heading" :style="{ color: Color.text_color }">
                                    {{ Color.header_title }}
                                </h1>
                                <p id="clubsub" class="subhead" v-html="Color.header_description" :style="{ color: Color.text_color, marginTop: '20px'}"></p>
                                <button class="btn" id="learn-more" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.accent_color}">
                                    Learn More
                                </button>
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
                            <div class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color }">
                                <i class="fab fa-facebook-f"></i>
                            </div>
                            <div class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color }">
                                <i class="fab fa-instagram"></i>
                            </div>
                            <div class="icon-circles" :style="{ color: Color.primary_color, backgroundColor: Color.background_color }">
                                <span class="flickr-dots"><i class="fa-solid fa-circle"></i><i class="fa-solid fa-circle"></i></span>
                            </div>
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

                            <button class="btn" id="club-gallery" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.accent_color}">
                                View All Club Galleries
                            </button>
                        </div>
                        <div class="clubpics">
                            <div v-for="(item, index) in chunkCards.flat()" :key="item.id || index" class="clubpics-item" :class="getPositionClass(index, chunkCards.flat().length)">
                                <div v-if="item.photos && item.photos.length">
                                    <img :src="item.photos[0].image" :alt="item.photos[0].title" style="object-fit: cover; object-position: top;"/>
                                    <div class="clubpics-info" :class="getPositionClass(index, chunkCards.flat().length)" :style="{ backgroundColor: hexToRgba(Color.primary_color, 0.7) }">
                                        <span :style="{ color: Color.background_color }">
                                            {{ item.gallery_name.length > 7 ? item.gallery_name.slice(0, 7) + '...' : item.gallery_name }}
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
                                    <div class="event-item" v-for="event in Events" :key="event.id || index" style="margin-bottom: 10px">
                                        <img v-if="event.featured_image_url" class="img-fluid event-img" :src="event.featured_image_url" alt="Event" @error="event.featured_image_url = null" />
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
                                    <button class="btn btn-sm" id="view-all" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.primary_color}">
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div class="cardddd" :style="{border: '1px solid' + Color.primary_color, padding: '0px'}">
                                <Calendar />
                            </div>

                            <div class="cardddd d-flex flex-column" :style="{backgroundColor: Color.secondary_color, padding: '35px'}">
                                <h5 class="head" :style="{color: Color.text_color}">Upcoming Competitions</h5>
                                <div class="event-list" v-if="Comps.length">
                                    <div class="event-item" v-for="comp in Comps" :key="comp.id || index" style="margin-bottom: 10px">
                                        <img v-if="comp.featured_image_url" class="img-fluid event-img" :src="comp.featured_image_url" alt="Comp" @error="comp.featured_image_url = null" />
                                        <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                        </div>
                                        <div class="event-details">
                                            <div class="event-info" style="display: flex; flex-direction: column">
                                                <span id="ename" :style="{color: Color.text_color}">{{ comp.name }}</span>
                                                <span id="espeaker" :style="{color: Color.primary_color}">Judge: {{ comp.judging_panel }}</span>
                                            </div>
                                            <div class="galtext" id="edate">
                                                <small class="galtext" :style="{color: Color.text_color}">{{ formatDate(comp.start_date) }}</small><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="button-group mt-auto">
                                    <button class="btn btn-sm" id="view-all" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.primary_color}">
                                        View All
                                    </button>
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

                            <button class="btn" id="member-gallery" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.accent_color}">
                                View All Member Galleries
                            </button>
                        </div>
                        <div class="upcoming-section" style="display:flex">
                            <div class="card" style="height: auto; border: none; margin-top: -1px" :style="{backgroundColor: Color.background_color, margin: '0px'}">
                                <div class="pics">
                                    <div v-for="(item, index) in chunkedCards.flat()" :key="item.id || index" class="pics-items" :class="{ 'top-left': index === 0, 'top-right': index === 4, 'bottom-left': index === 5, 'bottom-right': index === 9}">
                                        <div v-if="item.image_url">
                                            <img :src="item.image_url" :alt="item.username" style="object-fit: cover; object-position: top;" />
                                            <div class="pics-infos" :class="{ 'top-left': index === 0, 'top-right': index === 4, 'bottom-left': index === 5, 'bottom-right': index === 9}" :style="{backgroundColor: hexToRgba(Color.primary_color, 0.7) }">
                                                <div :style="{color: Color.background_color}">
                                                    {{ item.gallery_name.length > 7 ? item.gallery_name.slice(0, 7) + '...' : item.gallery_name }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="cardddd" style="background-color: #EBE6E1; padding: 35px; height: 360px" :style="{backgroundColor: Color.secondary_color, opacity: '60%',color: Color.text_color}">
                                <h5 class="head" :style="{color: Color.text_color}">Latest Members</h5>
                                <div class="row" style="padding-top: 30px;">
                                    <div class="col-6" style="margin-bottom: 20px;" v-for="latestMember in homeStore.homeData?.data?.latestMembers?.members.slice(0, 6)" :key="latestMember.id">
                                        <div class="event-items text-center" style="gap: 20px">
                                            <img v-if="latestMember.profile_image_url" class="img-fluid event-img" :src="latestMember.profile_image_url" alt="Profile" @error="latestMember.profile_image_url = null" style="width:50px; height: 50px; border-radius: 7px;  object-fit: cover; object-position: top;" />
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

            <section class="container" :style="{backgroundColor: Color.secondary_color, maxWidth: '1920px'}">
                <div id="latest-interaction" style="background-color: #99816B;" :style="{backgroundColor: Color.secondary_color}">
                    <h5 id="clubheading" class="heading" :style="{color: Color.text_color, marginBottom: '12px'}">Latest interactions</h5>
                    <h6 id="clubsub" class="subhead" :style="{color: Color.text_color}">A preview of comments and reactions on the photos & other posts on the club website</h6>
                    <div class="row" style="margin-top: 30px;">
                        <div class="col-12 col-md-6 mb-4">
                            <div class="card comments-card shadow-sm" :style="{ backgroundColor: Color.background_color, margin: '0px' }">
                                <div class="card-header border-0" :style="{ backgroundColor: Color.background_color }">
                                    <h5 class="mb-0" :style="{ color: Color.text_color, paddingLeft: '-25px'}">Recent Comments</h5>
                                </div>

                                <div class="card-body overflow-auto" style="max-height: 360px; margin-left: -21px; padding:5px">
                                    <div class="row g-2 align-items-start pb-2 mb-3" v-for="interaction in Interaction" :key="interaction.id">
                                        <div class="col-3 col-sm-2 text-center">
                                            <img :src="interaction.image_url" alt="Interaction Image" class="img-fluid" id="comimg" />
                                        </div>

                                        <div class="col-9 col-sm-7">
                                            <p id="comtext" :style="{ color: Color.text_color }">
                                                <strong>
                                                    {{ interaction.comments[0]?.interacted_by?.username || interaction.uploaded_by.username }}
                                                </strong>
                                                &nbsp; {{ interaction.comments[0]?.comment || 'No comment yet' }}
                                            </p>
                                            <div>
                                                <a href="#" id="comreply" class="small me-3" :style="{ color: Color.text_color }">Reply</a>
                                            </div>
                                        </div>

                                        <div class="col-12 col-sm-3 text-sm-end mt-2 mt-sm-0">
                                            <span class="small" id="comdate" :style="{ color: Color.text_color }">
                                                {{ timeAgo(interaction.comments[0]?.created_at || interaction.created_at) }}
                                            </span>
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
                                                <img :src="interaction.image_url" class="img-fluid" id="likeimg" alt="User" />
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

                        <button class="btn" id="view-results" @click="navigate" :style="{color: Color.background_color, backgroundColor: Color.primary_color}">
                            View All Results
                        </button>
                    </div>
                    <div class="upcoming-section" style="display: flex">
                        <div class="cardddd" style="margin-left: 0px; background-color: #EBE6E1; padding: 35px; height: 380px" :style="{backgroundColor: Color.secondary_color}">
                            <h5 class="head" :style="{color: Color.text_color}">Latest News</h5>
                            <div class="event-list" v-if="News.length">
                                <div class="event-item" v-for="clubnew in News" :key="clubnew.id || index" style="margin-bottom: 10px;">
                                    <img v-if="clubnew.featured_image_url" class="img-fluid event-img" :src="clubnew.featured_image_url" alt="News" @error="clubnew.featured_image_url = null" />
                                    <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                                    </div>
                                    <div class="event-details">
                                        <span class="prehead" id="pname" :style="{color: Color.text_color, fontWeight: '400'}">{{ clubnew.title }}</span>
                                        <div class="galtext" id="edate">
                                            <small class="galtext" :style="{color: Color.text_color}">{{ formatDate(clubnew.created_at) }}</small><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group mt-auto">
                                <button class="btn btn-sm" id="view-all" @click="navigate" :style="{ color: Color.background_color, backgroundColor: Color.primary_color}">
                                    View All
                                </button>
                            </div>
                        </div>

                        <div class="card" :style="{ backgroundColor: Color.background_color, width: '60%', height: 'auto', border: 'none', borderRadius: '10px' }">
                            <div class="resultpics">
                                <div v-for="(item, index) in chunkedcards.flat()" :key="item.id || index" class="resultpics-items" :class="{ 'top-left': index === 0, 'top-right': index === 4, 'bottom-left': index === 5, 'bottom-right': index === 9}">
                                    <div v-if="item.image && item.image.length">
                                        <img v-if="item.image" :src="item.image" :alt="item.gallery_name" style="object-fit: cover; object-position: top;" />
                                        <div class="resultpics-infos" :style="{backgroundColor: hexToRgba(Color.primary_color, 0.7) }" :class="{ 'top-left': index === 0, 'top-right': index === 4, 'bottom-left': index === 5, 'bottom-right': index === 9}">
                                            <div :style="{ color: Color.background_color }">
                                                {{ item.gallery_name.length > 7 ? item.gallery_name.slice(0, 7) + '...' : item.gallery_name }}
                                            </div>
                                        </div>
                                    </div>
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
                            <p id="clubsub" class="head" :style="{color: Color.text_color}">
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
                                <h5 class="head mb-4" :style="{ color: Color.text_color, paddingBottom: '15px' }">Contact</h5>

                                <div class="contact-item mb-3 d-flex justify-content-md-end justify-content-center align-items-center" id="cla" :style="{paddingBottom: '10px'}">
                                    <p class="footer-text mb-0" :style="{ color: Color.text_color, textAlign: 'left' }">{{ User.address }}</p>
                                    <div class="icon-circles ms-3" :style="{ color: Color.background_color, backgroundColor: Color.accent_color }">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                </div>

                                <div class="contact-item mb-3 d-flex justify-content-md-end justify-content-center align-items-center" id="cla" :style="{paddingBottom: '10px'}">
                                    <p class="footer-text mb-0" :style="{ color: Color.text_color }">{{ User.phone }}</p>
                                    <div class="icon-circles ms-3" :style="{ color: Color.background_color, backgroundColor: Color.accent_color }">
                                        <i class="fas fa-phone"></i>
                                    </div>
                                </div>

                                <div class="contact-item d-flex justify-content-md-end justify-content-center align-items-center" id="cla">
                                    <p class="footer-text mb-0" :style="{ color: Color.text_color }">{{ User.email }}</p>
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

                                <div v-if="Color.fb_link_option === 1 && Color.fb_link" class="social-item d-flex align-items-center justify-content-md-start justify-content-center mb-3" id="cle">
                                    <div class="ficon-circles me-3" :style="{ color: Color.background_color, backgroundColor: Color.text_color }">
                                        <i class="fab fa-facebook-f"></i>
                                    </div>
                                    <div>
                                        <p class="footer-text fw-bold mb-1" :style="{ color: Color.text_color }">Facebook</p>
                                        <a :href="Color.fb_link" target="_blank" class="footer-link" :style="{ color: Color.text_color }">
                                            {{ Color.fb_link }}
                                        </a>
                                    </div>
                                </div>

                                <div v-if="Color.insta_link_option === 1 && Color.insta_link" class="social-item d-flex align-items-center justify-content-md-start justify-content-center mb-3" id="cle">
                                    <div class="ficon-circles me-3" :style="{ color: Color.background_color, backgroundColor: Color.text_color }">
                                        <i class="fab fa-instagram"></i>
                                    </div>
                                    <div>
                                        <p class="footer-text fw-bold mb-1" :style="{ color: Color.text_color }">Instagram</p>
                                        <a :href="Color.insta_link" target="_blank" class="footer-link" :style="{ color: Color.text_color }">
                                            {{ Color.insta_link }}
                                        </a>
                                    </div>
                                </div>

                                <div v-if="Color.flickr_link_option === 1 && Color.flickr_link" class="social-item d-flex align-items-center justify-content-md-start justify-content-center" id="cle">
                                    <div class="ficon-circles me-3" :style="{ color: Color.background_color, backgroundColor: Color.text_color }">
                                        <span class="flickr-dots"><i class="fa-solid fa-circle"></i><i class="fa-solid fa-circle"></i></span>
                                    </div>
                                    <div>
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
                    <p class="memtext">Copyright &copy; 2025 – {{Club.club_name}}</p>
                    <p class="memtext">Powered by <a href="https://cameraclub.website" target="_blank" :style="{color: Color.text_color, fontWeight: 'bold'}">cameraclub.website</a></p>
                </div>
            </footer>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useHomeStore } from '@/stores/club_public/ClubData';
import { storeToRefs } from 'pinia';
import Loader from "@/components/LoaderAll.vue";
import Calendar from "@/components/club_public/CalendarRyton.vue";
import Pro from "@/assets/icons/event_list/pro.svg"
import Cal from "@/assets/icons/event_list/cal.svg"
import Cam from "@/assets/icons/event_list/cam.svg"
import Mess from "@/assets/icons/event_list/mess.svg"
import Heart from "@/assets/icons/Heart.svg"
import '@/assets/css/clubstyle.css'
import '@/assets/dist/calendar-gc.min.css'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from "vue-router";

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

/* global $ */
dayjs.extend(relativeTime);

const isLoading = ref(true);
const homeStore = useHomeStore();
const {
    homeData
} = storeToRefs(homeStore);

const memData = computed(() => homeStore.homeData?.data?.clubSettings?.original?.data || {});
const evData = computed(() => homeStore.homeData?.data?.clubSettings?.original?.data?.upcoming_event_days_count || {});
const Events = computed(() => homeStore.homeData?.data?.upcomingEvents || []);
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
            image_url: firstGallery?.photos?. [0]?.image_url || null
        };
    }).filter(card => card.image_url);
});
const Interaction = computed(() =>
  Array.isArray(homeStore.homeData.data?.latestInteractions)
    ? homeStore.homeData.data.latestInteractions
    : []
);

const picture = computed(() => {
    const competitions = homeStore.homeData?.data?.latestResults?.original?.data || [];

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
const User = computed(() => homeStore.homeData.data?.user || {});

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const chunkCards = computed(() => {
    const chunkSize = 5;
    const chunks = [];
    for (let i = 0; i < cardes.value.length; i += chunkSize) {
        chunks.push(cardes.value.slice(i, i + chunkSize));
    }
    return chunks;
});

function updateColumns() {
  if (window.innerWidth < 360) {
    columns.value = 1; // mobile
  } else if (window.innerWidth < 576) {
    columns.value = 2; // tablet
  }else if (window.innerWidth < 992) {
    columns.value = 3;
  } else {
    columns.value = 5; // desktop
  }
}

// const formatTime = (datetimeStr) => {
//     const date = new Date(datetimeStr);
//     return date.toLocaleTimeString("en-US", {
//         weekday: "short",
//         hour: "2-digit",
//         minute: "2-digit",
//     });
// };

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


const chunkedcards = computed(() => {
    const chunkdSize = 5;
    const chunkds = [];
    for (let i = 0; i < picture.value.length; i += chunkdSize) {
        chunkds.push(picture.value.slice(i, i + chunkdSize));
    }
    return chunkds;
});

onMounted(async () => {
    document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-dropdown")) {
      isDropdownOpen.value = false;
    }
  });
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
        isLoading.value = false; // ✅ loader hide
    }

    const option = {
        dayNames: ["su", "mo", "tu", "we", "th", "fr", "sa"],
        render: function (date, items) {
            if (!items || items.length === 0) {
                return `
        <td class="day current-month">
          <a type="button" class="btn-gc-cell">
            <span class="day-number">${date.getDate()}</span>
          </a>
        </td>
      `;
            }

            if (items.length === 1) {
                const ev = items[0];
                return `
        <td class="day current-month event">
          <a type="button" class="btn-gc-cell">
            <span class="day-number" style="color:${ev.dateColor}">${date.getDate()}</span>
          </a>
          <div class="gc-event ${ev.className}">${ev.eventName}</div>
        </td>
      `;
            }

            let badges = items
                .map(
                    ev =>
                    `<div class="gc-event style="margin-bottom:0px; display:flex" ${ev.className}">${ev.eventName}</div>`
                )
                .join("");

            return `
      <td class="day current-month event">
        <a type="button" class="btn-gc-cell">
          <span class="day-number" style="color:#CC445E">${date.getDate()}</span>
        </a>
        <div style="margin:0;display:flex;overflow-x:auto;width:70px;gap:5px;">
          ${badges}
        </div>
      </td>
    `;
        }
    };

    const events = computed(() =>
        Events.value.map((event, index) => ({
            date: new Date(event.event_date),
            eventName: event.name?.length > 7 ?
                event.name.substring(0, 7) + "..." :
                event.name || `Event #${index + 1}`,
            type: "event",
            className: "badge bg-info",
            dateColor: "#99816B"
        }))
    );

    const comps = computed(() =>
        Comps.value.map((comp, index) => ({
            date: new Date(comp.start_date),
            eventName: comp.name?.length > 7 ?
                comp.name.substring(0, 7) + "..." :
                comp.name || `Comps #${index + 1}`,
            type: "competition",
            className: "badge bg-success",
            dateColor: "#CC445E"
        }))
    );

    const allEvents = computed(() => [...events.value, ...comps.value]);

    let calendar = $("#calendar").calendarGC(option);

    calendar.setEvents(allEvents.value);

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
.Latest {
    background: white;
    width: 35%;
    height: 370px;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
}

.comments-card {
    width: 97%;
    height: 350px;
    overflow-y: auto;
    margin-left: 0%;
    border-radius: 10px;
    padding: 20px 20px;
}

.comments-cards {
    margin-left: -2%;
    width: 97%;
    height: 350px;
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
    border-radius: 5px;
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

.flickr-dots i {
    font-size: 3px;
    padding-bottom: 12px;
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
</style>
