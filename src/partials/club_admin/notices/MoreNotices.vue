<template>
  <div class="cardddd d-flex flex-column">
    <h5 style="font-size: 20px">{{ heading }}</h5>

    <div class="row" style="margin-bottom: 10px" v-for="c in randomnotices.slice(0, 5)" :key="c.id">
      <div class="col-md-2">
            <img :src="c.featured_image_url" alt="Eve" style="width: 50px; height: 50px" />
      </div>
      <div class="col-md-6">
        <p class="text-secondary">{{ c.title }}</p>
      </div>
      <div class="col-md-4">
        <div class="event-time" style="text-align: right">
          <small class="event-date">{{ formatDate(c.created_at) }}</small><br />
          <small class="event-time-details">{{ formatTime(c.created_at) }}</small>
        </div>
      </div>
    </div>

    <div class="button-group mt-auto">
      <router-link to="/notices" custom v-slot="{ navigate }">
        <button class="btn btn-sm" id="view" @click="navigate">View All</button>
      </router-link>
      <router-link to="/notice_single" custom v-slot="{ navigate }">
        <button class="btn btn-sm" id="new" @click="navigate">Add New</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useNoticeComments } from "@/stores/club_admin/MoreNotices";
/* global $ */

export default {
  props: {
    heading: {
      type: String,
      default: "More Notices",
    },
  },
  setup() {
    const { randomnotices, fetchRandomNotices } = useNoticeComments();

    onMounted(() => {
      $("#datepicker").datepicker();
      fetchRandomNotices();
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
      randomnotices,
      fetchRandomNotices,
      formatDate,
      formatTime,
    };
  },
};
</script>

<style scoped>
.cardddd {
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
}

.button-group button {
    margin-right: 8px;
}
</style>
