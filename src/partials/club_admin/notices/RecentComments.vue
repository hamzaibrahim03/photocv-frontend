<template>
<div class="cardddd d-flex flex-column">
    <h5 style="font-size: 20px">{{ heading }}</h5>

    <div class="row" style="margin-bottom: 10px" v-for="c in noticecomments.slice(0, 4)" :key="c.id">
        <div v-for="comment in c.comments" :key="comment.id" class="row">
            <div class="col-md-2">
                <img :src="comment.user?.profile_image_url" alt="Com" style="width: 50px; height: 50px" />
            </div>
            <div class="col-md-5">
                <p class="text-secondary">{{ comment.comment }}</p>

            </div>
            <div class="col-md-5">
                <div class="event-time" style="text-align: right">
                    <small class="event-date">{{ formatDate(comment.created_at) }}</small><br />
                    <small class="event-time-details">{{ formatTime(comment.created_at) }}</small>
                </div>
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
import {
    onMounted
} from "vue";
import {
    useNoticeComments
} from "@/stores/club_admin/NoticeComments";

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
            noticecomments,
            fetchNoticeComments,
            formatDate,
            formatTime,
        };
    },
};
</script>

<style scoped></style>
