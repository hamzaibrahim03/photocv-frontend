<template>
<div class="cardddd d-flex flex-column" style="padding: 35px">
    <h5 class="head">{{ heading }}</h5>

    <div class="event-list" style="margin-bottom: 10px" v-for="c in pagecomments.slice(0, 4)" :key="c.id">
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
import {
    onMounted
} from "vue";
import {
    usePageComments
} from "@/stores/club_admin/PageComments";

export default {
    props: {
        heading: {
            type: String,
            default: "Recent Comments on this Page",
        },
    },
    setup() {
        const {
            pagecomments,
            fetchPageComments
        } = usePageComments();

        onMounted(() => {
            fetchPageComments();
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
            pagecomments,
            fetchPageComments,
            formatDate,
            formatTime,
        };
    },
};
</script>

<style scoped></style>
