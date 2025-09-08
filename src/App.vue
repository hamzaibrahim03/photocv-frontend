<template>
<div id="app">
    <NavigationRoute v-if="isAuthPage" />  
    <router-view />
  </div>
</template>

<script setup>
import NavigationRoute from "@/components/NavigationRoute.vue";
import { onMounted } from 'vue';
import { useDashboardStore } from '@/stores/DashboardStore';

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchDashboardData();

  const token = localStorage.getItem('token');
  if (!token && window.location.pathname.startsWith('/')) {
    console.log("Token is from Apps.vue:", token);
  }
  console.log("Token is from App.vue:", token);
});
</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
