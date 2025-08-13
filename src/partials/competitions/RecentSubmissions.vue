<template>
  <div class="comments-card mt-5">
    <h5 class="mb-3">{{ Heading }}</h5>

    <div class="row" v-for="co in recentsubmissions.slice(0, 4)" :key="co.id">
        <div class="col-md-2">
            <img :src="co.entry_image" alt="image" />
        </div>
        <div class="col-md-6">
            <b>{{co.member_username}}</b>
            <p>{{co.competition_name}}</p>
        </div>
        <div class="col-md-4">
            <div class="event-time" style="text-align: right">
                <small class="event-date">{{formatDate(co.submitted_at)}}</small><br />
                <small class="event-time-details">{{formatTime(co.submitted_at)}}</small>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useMoreCompetitions } from "@/stores/RecentSubmissions";
/* global $ */

export default {
  props: {
    Heading: {
      type: String,
      default: "Recent Submissions",
    },
  },
  setup() {
    const { recentsubmissions, fetchRecentSubmissions } = useMoreCompetitions();

    onMounted(() => {
      $("#datepicker").datepicker();
      fetchRecentSubmissions();
    });

    // ✅ Only one formatDate here
    const formatDate = (date) => {
      const d = new Date(date);
      return isNaN(d) ? '' : d.toLocaleDateString(undefined, {
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
      recentsubmissions,
      fetchRecentSubmissions,
      formatDate,
      formatTime,
    };
  },
};
</script>

<style scoped></style>
