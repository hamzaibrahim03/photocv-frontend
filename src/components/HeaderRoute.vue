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
            <img :src="dashboardData?.data?.user_details?.profile_image" alt="profile image" />
            <span v-if="first_name"> {{ first_name }}&nbsp;<i class="fa-solid fa-chevron-down"></i></span>
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
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/club_admin/DashboardStore";
import { computed } from "vue";

const user = useUserStore();
const {
    first_name
} = storeToRefs(user)
const router = useRouter();
const dashboardStore = useDashboardStore();
const dashboardData = computed(() => dashboardStore.dashboardData);
defineProps({
    title: {
        type: String,
        default: "Dashboard"
    }
});

const handleLogout = async () => {
    await user.logout();
  router.push("/")

};
</script>

<style scoped>
.admin-dropdown img {
    cursor: pointer;
}
</style>
