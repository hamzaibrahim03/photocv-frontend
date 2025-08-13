<template>
  <div class="event-card">
    <small class="ca-details">Next Event</small>
    <div class="row">
      <div class="col-md-5">
        <h3 class="number">{{EventDay}}</h3>
      </div>
      <div class="days col-md-7">
        <span>days to go</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEventStore } from "@/stores/EventStore";

const {
  eventDay,
  fetchEvents
} = useEventStore()

const EventDay = eventDay
onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
</style>
