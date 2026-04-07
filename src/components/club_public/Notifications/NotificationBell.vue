<template>
  <div class="notification-wrapper">
    <button class="bell-btn" @click.stop="toggle">
      <i class="fa-regular fa-bell text-lg mx-3" :style="{ fontSize: '22px' }"></i>
      <span v-if="unreadCount" class="badge rounded-pill badge-notification bg-danger">
        {{ unreadCount }}
      </span>
    </button>

    <NotificationDropdown
      v-if="open"
      @close="open = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/club_public/NotificationData'
import NotificationDropdown from './NotificationDropdown.vue'

const open = ref(false)
const store = useNotificationStore()

onMounted(() => {
  if (!store.notifications.length) {
    store.fetchNotifications()
  }
})

const unreadCount = computed(() => store.unreadCount)

const toggle = () => {
  open.value = !open.value
}
</script>

<style scoped>
.notification-wrapper {
   position: relative;
}
.bell-btn {
   background: none;
   border: none;
   font-size: 22px;
   cursor: pointer;
   position: relative;
}
.badge {
   position: absolute;
   top: 0px;
   right: 0px;
   background: #6aa96a;
   color: #fff;
   font-size: 11px;
   border-radius: 50%;
}
</style>
