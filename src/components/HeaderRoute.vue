<template>
<div class="header" id="head">
    <div class="left-header">
        {{ title }}
    </div>

    <div class="right-header">
        <a class="icon">
            <NotificationBell />
        </a>
        <div class="admin-dropdown">
            <img :src="profile_image_url" alt="profile image" style="cursor: pointer" />
            <span v-if="username"> {{ username }}</span>
            <span v-else>Welcome, Guest</span>

            <div class="dropdown-menu">
                <a href="profile.html">Profile</a>
                <a href="#" @click.prevent="handleLogout">Log Out</a>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { useUserStore } from '@/stores/club_admin/UserStore';
import defineProps from 'vue'
import { storeToRefs } from 'pinia'
import NotificationBell from '@/components/club_public/Notifications/NotificationBell.vue'

const user = useUserStore();
const {
    username,
    profile_image_url
} = storeToRefs(user)

defineProps({
    title: {
        type: String,
        default: "Dashboard"
    }
});

const handleLogout = async () => {
    await user.logout();
};
</script>

<style scoped>
</style>
