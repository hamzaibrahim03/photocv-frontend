<template>
  <div class="comments-card d-flex flex-column">
    <h5 class="mb-3">{{ Heading }}</h5>

    <div class="row" style="margin-bottom: 10px" v-for="co in randomcompetitions.slice(0, 5)" :key="co.id">
      <div class="col-md-2">
        <img :src="co.featured_image_url" alt="Eve" style="width: 50px; height: 50px"  />
      </div>
      <div class="col-md-6">
        <p class="text-secondar">{{co.name}}</p>
      </div>
      <div class="col-md-4">
        <div class="event-time" style="text-align: right">
          <small class="event-date">{{formatDate(co.start_date)}}</small><br />
          <small class="event-time-details">{{formatTime(co.start_date)}}</small>
        </div>
      </div>
    </div>
    <div class="button-group mt-auto">
      <button class="btn btn-sm" id="view">View All</button>
      <button class="btn btn-sm" id="new">Add New</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useMoreCompetitions } from "@/stores/MoreCompetitions";
/* global $ */

export default {
  props: {
    Heading: {
      type: String,
      default: "More Competitions",
    },
  },
  setup() {
    const { randomcompetitions, fetchRandomCompetitions } = useMoreCompetitions();

    onMounted(() => {
      $("#datepicker").datepicker();
      fetchRandomCompetitions();
    });

    // ✅ Only one formatDate here
    const formatDate = (date) => {
      const d = new Date(date);
      return isNaN(d) ? '' : d.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };

    const formatTime = (dateTime) => {
      return new Date(dateTime).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    };

    return {
      randomcompetitions,
      fetchRandomCompetitions,
      formatDate,
      formatTime,
    };
  },
};
</script>

<style scoped></style>
