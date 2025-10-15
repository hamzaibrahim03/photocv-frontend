<template>
<div class="cardddd d-flex flex-column" :style="{ padding: '35px', height: 'auto'}">
        <h5 class="head">{{ Heading }}</h5>
        <div class="event-list" v-if="recentsubmissions.length">
            <div class="event-item" v-for="co in recentsubmissions.slice(0, 4)" :key="co.id" style="margin-bottom: 10px">
                <img v-if="co.entry_image" class="img-fluid event-img" :src="co.entry_image" alt="Event" @error="co.entry_image = null"/>
                <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                </div>
                <div class="event-details" style="display: flex">
                    <div class="event-info" style="display: flex; flex-direction: column">
                        <span id="ename">{{ co.member_username }}</span>
                        <span id="espeaker"> {{ co.competition_name }}</span>
                    </div>

                    <div class="event-time" id="edate">
                        <small class="event-date galtext">{{ formatDate(co.submitted_at) }}</small><br />
                        <small class="event-time-details galtext">{{ formatTime(co.submitted_at) }}</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-group mt-auto">
            <router-link to="/event" custom v-slot="{ navigate }">
                <button class="btn btn-sm" id="view" @click="navigate">
                    View All
                </button>
            </router-link>
            <router-link to="/events_add" custom v-slot="{ navigate }">
                <button class="btn btn-sm" id="new" @click="navigate">
                    Add New
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useMoreCompetitions } from "@/stores/club_admin/RecentSubmissions";

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
      fetchRecentSubmissions();
    });

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

<style scoped>
.cardddd {
    background: white;
  width: 90%;
  padding: 20px;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.button-group button {
    margin-right: 8px;
}

.event-list {
  padding-top: 30px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.event-item img {
  width: 100%;
  max-width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
}

.event-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  font-size: 0.875rem;
  width: 100%;
}

#ename {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0%;
}

#espeaker {
  font-family: Inter;
  font-weight: 400;
  font-style: Regular;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0%;
}

.event-img,
.fallback-box {
    width: 100%;
    max-width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
    background-color: #f0f0f0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.fallback-box {
    font-size: 14px;
    color: #888;
}
</style>
