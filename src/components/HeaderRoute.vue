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
        <img :src="profile_image_url" alt="profile image" style="cursor: pointer" />
        <span v-if="username">Welcome, {{ username }}</span>
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
    useUserStore
} from '@/stores/club_admin/UserStore';
import defineProps from 'vue'
import { storeToRefs } from 'pinia'

const user = useUserStore();
const { username, profile_image_url } = storeToRefs(user)

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
