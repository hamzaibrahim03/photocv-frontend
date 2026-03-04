<template>
<div class="cardddd d-flex flex-column" style="padding: 35px">
    <h5 class="head">{{ heading }}</h5>

    <div class="event-list" style="margin-bottom: 10px" v-for="c in noticecomments.slice(0, 2)" :key="c.id">
        <div v-for="comment in c.comments" :key="comment.id" class="event-item">
            <img v-if="comment.user?.profile_image_url" class="img-fluid event-img" :src="comment.user.profile_image_url" @error="comment.user.profile_image_url = null" />
            <div v-else class="event-img fallback-box d-flex justify-content-center align-items-center">
                <i class="fa-regular fa-user" style="font-size: 24px; color: gray"></i>
            </div>
            <div class="event-details">
                <div class="event-info" style="display: flex; flex-direction: column">
                    <span id="ename">{{ comment.comment }}</span>
                </div>
            </div>
            <div class="event-time" id="edate">
                <small class="event-date galtext">{{ formatDate(comment.created_at) }}</small><br />
                <small class="event-time-details galtext">{{ formatTime(comment.created_at) }}</small>
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
import { useNoticeComments } from "@/stores/club_admin/NoticeComments";

export default {
    props: {
        heading: {
            type: String,
            default: "Recent Comments on this Notice",
        },
    },
    setup() {
        const {
            noticecomments,
            fetchNoticeComments
        } = useNoticeComments();

        onMounted(() => {
            fetchNoticeComments();
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
            noticecomments,
            fetchNoticeComments,
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
     font-size: 16px;
     line-height: 100%;
     letter-spacing: 0%;
}
 .event-img, .fallback-box {
     width: 100%;
     max-width: 50px;
     height: 50px;
     border-radius: 5px;
     object-fit: cover;
     background-color: #ddd;
     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
 .fallback-box {
     font-size: 14px;
     color: #888;
}
</style>
