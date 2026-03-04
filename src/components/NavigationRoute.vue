<template>
<div class="sidebar">
    <img src="@/assets/images/photo.png" style="margin-left: 25px" />
    <div class="divider3"></div>
    <template v-if="user.role === 'club_admin'">
        <a href="#" style="font-size: 24px"><img src="@/assets/images/eye.png" alt="Logo" class="img-fluid mb-3" id="side-logo" />My Club</a>
        <a href="/dashboard" :class="{ active: $route.path === '/dashboard' }"><img :src="Dashboard" alt="point-icon" style="width: 20px; height: 20px;" /> Dashboard</a>
        <a href="/event" :class="{ active: $route.path === '/event' }"><img :src="Event" alt="event" style="width: 20px; height: 20px" /> Events</a>
        <a href="/competitions" :class="{ active: $route.path === '/competitions' }"><img :src="Competition" alt="point-icon" style="width: 20px; height: 20px" /> Competitions</a>
        <a href="/members" :class="{ active: $route.path === '/members' }"><img :src="Member" alt="point-icon" style="width: 20px; height: 20px" /> Members</a>
        <a href="/gallery" :class="{ active: $route.path === '/gallery' }"><img :src="Gallery" alt="point-icon" style="width: 20px; height: 20px" /> Galleries</a>
        <a href="/notices" :class="{ active: $route.path === '/notices' }"><img :src="Notice" alt="point-icon" style="width: 20px; height: 20px" /> Notices</a>
        <a href="/news" :class="{ active: $route.path === '/news' }"><img :src="News" alt="point-icon" style="width: 20px; height: 20px" /> News</a>
        <a href="/pages" :class="{ active: $route.path === '/pages' }"><img :src="Page" alt="point-icon" style="width: 20px; height: 20px" /> Pages</a>
        <a href="/club" :class="{ active: $route.path === '/club' }"><i class="bi bi-people"></i> Club</a>
    </template>

    <template v-else-if="user.role === 'member'">
        <a href="#"><img src="@/assets/images/eyep.png" alt="Logo" class="img-fluid mb-3" />&nbsp;My Profile</a>
        <a href="/about" :class="{ active: $route.path === '/about' }"><img :src="About" alt="point-icon" style="width: 20px; height: 20px" /> About Me</a>
        <a href="/portfolio" :class="{ active: $route.path === '/portfolio' }"><img :src="Portfolio" alt="point-icon" style="width: 20px; height: 20px" /> Portfolio</a>
        <a href="/gear" :class="{ active: $route.path === '/gear' }"><img :src="Gear" alt="point-icon" style="width: 20px; height: 20px" /> Gear</a>
        <a href="/learn" :class="{ active: $route.path === '/learn' }"><img :src="Learn" alt="point-icon" style="width: 20px; height: 20px" /> Learning</a>
        <a href="/post" :class="{ active: $route.path === '/post' }"><img :src="Post" alt="point-icon" style="width: 20px; height: 20px" /> Posts</a>
        <a href="/plans" :class="{ active: $route.path === '/plans' }"><img :src="Plan" alt="point-icon" style="width: 20px; height: 20px" /> Plans</a>
    </template>

    <div class="divider1"></div>

    <a href="/settings" :class="{ active: $route.path === '/settings' }"><img :src="Settings" alt="point-icon" style="width: 20px; height: 20px" /> Settings</a>
    <a href="#" @click.prevent="handleLogout"><img :src="Logout" alt="point-icon" style="width: 20px; height: 20px" /> Logout</a>
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
} from "@/stores/club_admin/UserStore";
import { useRouter } from "vue-router";
const router = useRouter();
const user = useUserStore();
const handleLogout = async () => {
    await user.logout();
  router.push("/")

};
</script>
