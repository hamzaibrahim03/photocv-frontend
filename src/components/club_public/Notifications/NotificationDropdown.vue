<template>
    <div class="dropdown" ref="dropdownRef" @click.stop>
        <div class="header">
            <h4>Notifications</h4>
            <button class="close" @click="$emit('close')">×</button>
        </div>

        <div class="filter-bar">
            <span class="tab active">All</span>

            <select v-model="selectedCategory" class="filter-select">
                <option value="all">- Select -</option>
                <option value="social">Social</option>
                <option value="profile">Profile & Activity</option>
                <option value="club">Club / Events</option>
                <option value="notice">Notices / News</option>
            </select>
        </div>

        <div class="list">
            <div v-for="item in filteredNotifications" :key="item.id" class="item" @click="handleClick(item)">
                <img :src="item.actor?.profile_image_url || defaultAvatar" class="avatar"/>

                <div class="content">
                    <p class="note">
  <strong>{{ item.data?.actor_name }}</strong>
  {{ cleanBody(item) }}

  <template v-if="item.type === 'photo_liked'">
    “{{ item.data?.photo_title }}”
  </template>
</p>

                    <span class="date">{{ formatDate(item.created_at) }}</span>
                </div>

                <span v-if="!item.read_at" class="dot"></span>
            </div>

            <p v-if="!filteredNotifications.length" class="d-flex flex-column justify-content-center align-items-center">
                No notifications
            </p>
        </div>

        <div class="footer" @click="store.markAllAsRead(); $emit('close')">
            Mark all as read
        </div>
    </div>
</template>


<script setup>
import { useNotificationStore } from '@/stores/club_public/NotificationData'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const store = useNotificationStore()
const dropdownRef = ref(null)
const emit = defineEmits(['close'])
const selectedCategory = ref('all')
const defaultAvatar =
  'https://ui-avatars.com/api/?background=6aa96a&color=fff&name=User'

const formatDate = (date) => {
    const d = new Date(date)
    return isNaN(d) ? '' : d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

const handleClick = (item) => {
  if (!item.read_at) {
    store.markAsRead(item.id)
  }

  // optional: navigate to photo / comment
  // router.push(...)
}
const cleanBody = (item) => {
  if (!item?.data?.body) return ''

  if (item.type === 'photo_commented') {
    return item.data.body.replace(/“.*?”/, '')
  }

  return item.data.body
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    emitClose()
  }
}

const emitClose = () => {
  emit('close')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const filteredNotifications = computed(() => {
  if (selectedCategory.value === 'all') {
    return store.notifications
  }
  return store.notifications.filter(
    n => n.category === selectedCategory.value
  )
})

</script>


<style scoped>
.dropdown {
  position: absolute;
  right: 0;
  top: 70px;
  width: 510px;
  background: #fff;
  border-radius: 23.72px;
  box-shadow: 0px 3.56px 17.79px 0px #0000001A;
  z-index: 999;
  height: 576px;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 31px;
  margin-left: 0px;
  background-color: white;
  width: 100%;
  border-radius: 23px;
}

.header h4 {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 18.98px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
}

.close {
  background-color: white;
  color: black;
  width: 15px;
  height: 15px;
  border: none;
  top: 10px;
  right: 41px
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 31px;
  border-bottom: 1px solid #eee;
}

.tab {
  font-family: Inter;
  font-weight: 500;
  font-style: Medium;
  font-size: 16.47px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  color: black;
  border-bottom: 2px solid #6aa96a;
  padding-bottom: 4px;
}

.filter-select {
  padding: 0px 13px;
  border-radius: 4.84px;
  border: 0.65px solid #4C403666;
  font-size: 13px;
  width: 182px;
  height: 32px;
  background-color: white;
}


.content {
  margin-left: 0px;
  width: 81%;
  background-color: white;
}

.list {
  max-height: 360px;
  overflow-y: auto;
}

.item {
  display: flex;
  gap: 20px;
  padding: 10px 31px;
  position: relative;
}

.avatar {
  width: 30.84px;
  height: 30.84px;
  border-radius: 50%;
}
.note {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 14.23px;
  line-height: 100%;
  letter-spacing: 0px;
  color: #333333
}

.dot {
  width: 9px;
  height: 9px;
  background: #6aa96a;
  border-radius: 50%;
  position: absolute;
  right: 14px;
}

.footer {
    display: flex;
    text-align: center;
    padding: 10px;
    bottom: 10px;
    position: absolute;
    left: 200px;
    background-color: white;
    font-family: Arimo;
    font-weight: 400;
    font-style: Regular;
    font-size: 16.6px;
    line-height: 23.72px;
    letter-spacing: 0px;
    color: #7FA483;
    cursor: pointer;
    border-top: 1px solid #ccc;
    border-top-width: 100%
}
.date {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 9.49px;
  line-height: 100%;
  letter-spacing: 0px;
  color:  #787878;
}
</style>
