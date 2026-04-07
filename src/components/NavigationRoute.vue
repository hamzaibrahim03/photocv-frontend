<template>
<div class="sidebar">
    
    <!-- Top Logo -->
    <img src="@/assets/images/photo.png" style="margin-left: 25px" />
    <div class="divider3"></div>

    <!-- CLUB ADMIN -->
    <template v-if="user.role === 'club_admin'">

        <router-link to="#" style="font-size: 24px">
            <img src="@/assets/images/eye.png" id="side-logo" />
            My Club
        </router-link>

        <router-link 
            to="/dashboard" 
            :class="{ active: isActiveGroup(['Dashboard']) }"
        >
            <img :src="Dashboard" style="width: 20px; height: 20px" /> Dashboard
        </router-link>

        <router-link 
            to="/event" 
            :class="{ active: isActiveGroup(['Event','eventsingle','events_add','events_edit']) }"
        >
            <img :src="Event" style="width: 20px; height: 20px" /> Events
        </router-link>

        <router-link 
            to="/competitions" 
            :class="{ active: isActiveGroup(['Competitions','competitionsingle','comp_edit','CompetitionsAdd','CompetitionSettings']) }"
        >
            <img :src="Competition" style="width: 20px; height: 20px" /> Competitions
        </router-link>

        <router-link 
            to="/members" 
            :class="{ active: isActiveGroup(['MembersRoute','MemberAdd','member_edit','MembersRequest','MemberSingle']) }"
        >
            <img :src="Member" style="width: 20px; height: 20px"/> Members
        </router-link>

        <router-link 
            to="/gallery" 
            :class="{ active: isActiveGroup(['GalleryRoute']) }"
        >
            <img :src="Gallery" style="width: 20px; height: 20px"/> Galleries
        </router-link>

        <router-link 
            to="/notices" 
            :class="{ active: isActiveGroup(['NoticeRoute','noticeadd','noticeedit','noticesingle']) }"
        >
            <img :src="Notice" style="width: 20px; height: 20px"/> Notices
        </router-link>

        <router-link 
            to="/news" 
            :class="{ active: isActiveGroup(['NewsRoute','newssingle','news_edit','NewsAdd']) }"
        >
            <img :src="News" style="width: 20px; height: 20px"/> News
        </router-link>

        <router-link 
            to="/pages" 
            :class="{ active: isActiveGroup(['PagesRoute']) }"
        >
            <img :src="Page" style="width: 20px; height: 20px"/> Pages
        </router-link>

        <router-link 
            to="/club" 
            :class="{ active: isActiveGroup(['Club']) }"
        >
            <i class="bi bi-people" style="width: 20px; height: 20px"></i> Club
        </router-link>

    </template>

    <!-- MEMBER -->
    <template v-else-if="user.role === 'member'">

        <router-link to="#">
            <img src="@/assets/images/eyep.png" />
            My Profile
        </router-link>

        <router-link 
            to="/about" 
            :class="{ active: isActiveGroup(['about']) }"
        >
            <img :src="About" style="width: 20px; height: 20px" /> About Me
        </router-link>

        <router-link 
            to="/portfolio" 
            :class="{ active: isActiveGroup(['portfolio']) }"
        >
            <img :src="Portfolio" style="width: 20px; height: 20px" /> Portfolio
        </router-link>

        <router-link 
            to="/gear" 
            :class="{ active: isActiveGroup(['gear']) }"
        >
            <img :src="Gear" style="width: 20px; height: 20px" /> Gear
        </router-link>

        <router-link 
            to="/learn" 
            :class="{ active: isActiveGroup(['learn']) }"
        >
            <img :src="Learn" style="width: 20px; height: 20px" /> Learning
        </router-link>

        <router-link 
            to="/post" 
            :class="{ active: isActiveGroup(['post']) }"
        >
            <img :src="Post" style="width: 20px; height: 20px" /> Posts
        </router-link>

        <router-link 
            to="/plans" 
            :class="{ active: isActiveGroup(['plans']) }"
        >
            <img :src="Plan" style="width: 20px; height: 20px" /> Plans
        </router-link>

    </template>

    <div class="divider1"></div>

    <!-- COMMON -->
    <router-link 
        to="/settings" 
        :class="{ active: isActiveGroup(['settings']) }"
    >
        <img :src="Settings" style="width: 20px; height: 20px" /> Settings
    </router-link>

    <a href="#" @click.prevent="handleLogout">
        <img :src="Logout" style="width: 20px; height: 20px" /> Logout
    </a>

</div>
</template>

<script setup>
import { useUserStore } from "@/stores/club_admin/UserStore";
import { useRouter, useRoute } from "vue-router";

import About from "@/assets/icons/navigation/about.svg"
import Competition from "@/assets/icons/navigation/competition.svg"
import Dashboard from "@/assets/icons/navigation/dashboard.svg"
import Event from "@/assets/icons/navigation/events.svg"
import Gallery from "@/assets/icons/navigation/galleries.svg"
import Settings from "@/assets/icons/navigation/settings.svg"
import Member from "@/assets/icons/navigation/members.svg"
import Logout from "@/assets/icons/navigation/logout.svg"
import Portfolio from "@/assets/icons/navigation/portfolio.svg"
import Post from "@/assets/icons/navigation/post.svg"
import Notice from "@/assets/icons/navigation/notice.svg"
import News from "@/assets/icons/navigation/news.svg"
import Page from "@/assets/icons/navigation/pages.svg"
import Learn from "@/assets/icons/navigation/learn.svg"
import Gear from "@/assets/icons/navigation/gear.svg"
import Plan from "@/assets/icons/navigation/plans.svg"

const router = useRouter();
const route = useRoute();
const user = useUserStore();

const isActiveGroup = (names) => names.includes(route.name);

const handleLogout = async () => {
    await user.logout();
    router.push("/");
};
</script>

<style scoped>
/* Default */
.sidebar a,
.sidebar .router-link-active {
  color: black;
}

/* Active link */
.sidebar a.active,
.sidebar .router-link-active {
  color: #CC445E;
}

/* Icon default */
.sidebar .nav-icon {
  width: 20px;
  height: 20px;
  transition: 0.3s;
}

/* 🔥 Icon active */
.sidebar a.active .nav-icon,
.sidebar .router-link-active .nav-icon {
  filter: brightness(0) saturate(100%) invert(32%) sepia(58%) saturate(585%) hue-rotate(314deg) brightness(95%) contrast(92%);
}
</style>