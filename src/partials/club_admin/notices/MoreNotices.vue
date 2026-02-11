<template>
<div class="cardddd d-flex flex-column" :style="{ padding: '35px' }">
    <h5 class="head">{{ heading }}</h5>
    <div class="event-list" v-if="randomnotices.length">
        <div class="event-item" v-for="c in randomnotices.slice(0, 6)" :key="c.id" style="margin-bottom: 10px">
            <img v-if="c.featured_image_url" class="img-fluid event-img" :src="c.featured_image_url" @error="c.featured_image_url = null" />
            <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center"></div>
            <div class="event-details">
                <div class="event-info" style="display: flex; flex-direction: column">
                    <span id="ename">{{ c.title }}</span>
                </div>

                <div class="event-time" id="edate">
                    <small class="event-date galtext">{{ formatDate(c.created_at) }}</small><br />
                    <small class="event-time-details galtext">{{ formatTime(c.created_at) }}</small>
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
import { useNoticeComments } from "@/stores/club_admin/MoreNotices";

export default {
    props: {
        heading: {
            type: String,
            default: "More Notices",
        },
    },
    setup() {
        const {
            randomnotices,
            fetchRandomNotices
        } = useNoticeComments();

        onMounted(() => {
            fetchRandomNotices();
        });

        const formatDate = (date) => {
            const d = new Date(date);
            return isNaN(d) ?
                "" :
                d.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
        };

        const formatTime = (dateTime) => {
            return new Date(dateTime).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
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
     background: white;
     width: 90%;
     padding: 20px;
     height: 390px;
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
     font-weight: 500;
     font-style: Regular;
     font-size: 13px;
     line-height: 100%;
     letter-spacing: 0%;
}
 .event-img, .fallback-box {
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
