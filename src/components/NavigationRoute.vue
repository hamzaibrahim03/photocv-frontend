<template>
<div class="sidebar">
    <!-- Common Top Image -->
    <img src="@/assets/images/photo.png" style="margin-left: 25px" />
    <div class="divider3"></div>
    <!-- Conditional Menu Based on Role -->
    <template v-if="user.role === 'club_admin'">
        <!-- Club Admin Menu -->
        <a href="#"><img src="@/assets/images/eye.png" alt="Logo" class="img-fluid mb-3" />&nbsp;&nbsp;My Club</a>
        <a href="/dashboard"><img :src="Dashboard" alt="point-icon" style="width: 15px; height: 15px" /> Dashboard</a>
        <a href="/event"><img :src="Event" alt="event" style="width: 15px; height: 15px" /> Events</a>
        <a href="/competitions"><img :src="Competition" alt="point-icon" style="width: 15px; height: 15px" /> Competitions</a>
        <a href="/members"><img :src="Member" alt="point-icon" style="width: 15px; height: 15px" /> Members</a>
        <a href="/gallery"><img :src="Gallery" alt="point-icon" style="width: 15px; height: 15px" /> Galleries</a>
        <a href="/notices"><img :src="Notice" alt="point-icon" style="width: 15px; height: 15px" /> Notices</a>
        <a href="/news"><img :src="News" alt="point-icon" style="width: 15px; height: 15px" /> News</a>
        <a href="/pages"><img :src="Page" alt="point-icon" style="width: 15px; height: 15px" /> Pages</a>
        <a href="/club"><i class="bi bi-people"></i> Club</a>
    </template>

    <template v-else-if="user.role === 'member'">
        <!-- photographer Menu -->
        <a href="#"><img src="@/assets/images/eyep.png" alt="Logo" class="img-fluid mb-3" />&nbsp;My Profile</a>
        <a href="/about"><img :src="About" alt="point-icon" style="width: 15px; height: 15px" /> About Me</a>
        <a href="/portfolio"><img :src="Portfolio" alt="point-icon" style="width: 15px; height: 15px" /> Portfolio</a>
        <a href="/gear"><img :src="Gear" alt="point-icon" style="width: 15px; height: 15px" /> Gear</a>
        <a href="/learn"><img :src="Learn" alt="point-icon" style="width: 15px; height: 15px" /> Learning</a>
        <a href="/post"><img :src="Post" alt="point-icon" style="width: 15px; height: 15px" /> Posts</a>
        <a href="/plans"><img :src="Plan" alt="point-icon" style="width: 15px; height: 15px" /> Plans</a>
    </template>

    <div class="divider1"></div>

    <!-- Common Links -->
    <a href="/settings"><img :src="Settings" alt="point-icon" style="width: 15px; height: 15px" /> Settings</a>
    <a href="#" @click.prevent="handleLogout"><img :src="Logout" alt="point-icon" style="width: 15px; height: 15px" /> Logout</a>
</div>
</template>

<script setup>
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
import {
    useUserStore
} from "@/stores/UserStore";
const user = useUserStore();
const handleLogout = async () => {
    await user.logout();
};
</script>
