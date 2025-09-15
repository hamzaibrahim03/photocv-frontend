<template>
  <div class="header" id="head">
    <div class="left-header">
      {{ title }}
    </div>

    <div class="right-header">
      <a href="notification.html" class="icon"
        ><i class="bi bi-bell mx-3"></i
      ></a>
      <div class="admin-dropdown">
        <img :src="dashboardData?.data?.user_details?.profile_image" alt="profile image" style="cursor: pointer" />
        <span v-if="dashboardData?.data?.user_details?.username">Welcome, {{ dashboardData?.data?.user_details?.username }}</span>
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
import {
    useDashboardStore
} from '@/stores/club_admin/DashboardStore';
import {
    useUserStore
} from '@/stores/club_admin/UserStore';
import defineProps from 'vue'
import {
    computed
} from 'vue';

// ✅ Access store
const user = useUserStore();
const dashboardStore = useDashboardStore();
const dashboardData = computed(() => dashboardStore.dashboardData);

// ✅ Define props
defineProps({
  title: {
    type: String,
    default: "Dashboard"
  }
});

// ✅ Logout function
const handleLogout = async () => {
  await user.logout();
};
</script>



<style scoped>
</style>
