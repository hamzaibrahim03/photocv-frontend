<template>
  <div class="stat-card">
    <small class="ca-details">Events</small>
    <h3 class="number">{{ MemberCount }}</h3>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEventStore } from "@/stores/EventStore";

const {
  memberCount,
  fetchEvents
} = useEventStore()

const MemberCount = memberCount
onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
</style>
