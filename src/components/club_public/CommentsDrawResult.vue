<template>
    <div class="drawer-overlay" @click.self="$emit('close')">
        <div class="drawer">
            <!-- TOP -->
            <div class="top">
                <span class="title">Details</span>
                <button class="close" @click="$emit('close')">×</button>
            </div>
            <!-- EXIF -->
            <div class="block">
                <div class="block-head" @click="exifOpen = !exifOpen">
                    <span>EXIF Details</span>
                    <span class="chev">{{ exifOpen ? "⌃" : "⌄" }}</span>
                </div>

                <div v-if="exifOpen" class="exif-grid">
                    <div class="exif-item">
                        <label>Camera</label><br>
                        <span>{{ exif?.camera_model }}</span>
                    </div>
                    <div class="exif-item">
                        <label>Focal Length</label><br>
                        <span>{{ exif?.focal_length }}</span>
                    </div>

                    <div class="exif-item">
                        <label>Lens</label><br>
                        <span>{{ exif?.lens }}</span>
                    </div>
                    <div class="exif-item">
                        <label>Aperture</label><br>
                        <span>{{ exif?.aperture }}</span>
                    </div>

                    <div class="exif-item">
                        <label>Shutter Speed</label><br>
                        <span>{{ exif?.shutter_speed }}</span>
                    </div>
                    <div class="exif-item">
                        <label>ISO</label><br>
                        <span>{{ exif?.iso }}</span>
                    </div>
                </div>
            </div>

            <!-- COMMENTS -->
            <div class="block comments-block">
                <div class="block-head" @click="commentsOpen = !commentsOpen">
                    <span>Comments</span>
                    <span class="chev">{{ commentsOpen ? "⌃" : "⌄" }}</span>
                </div>

                <div v-if="commentsOpen" class="comments" ref="commentsRef">
                    <div class="comment" v-for="c in comments" :key="c.id">
                        <strong>{{ c.user?.name || "User" }}</strong>
                        <p>{{ c.body }}</p>
                        <small>{{ time(c.created_at) }}</small>
                    </div>

                    <p v-if="!loading && !comments.length" class="empty">
                        No comments yet
                    </p>
                    <!-- INPUT -->
                    <div class="input-bar">
                        <input v-model="newComment" placeholder="Add a comment..." @keyup.enter="postComment" />
                        <button @click="postComment">➤</button>
                    </div>
                </div>
            </div>
            <label></label>
            <span></span>
        </div>
    </div>
</template>


<script setup>
import { ref, watch, nextTick, computed } from "vue"
import { useRytonSingleClubGalStore } from "@/stores/club_public/RytonSingleClubGallery"
import commentsApi from "@/api/club_public/allcomments"

const props = defineProps({ photo: Object })
const galleryStore = useRytonSingleClubGalStore()

const comments = ref([])
const newComment = ref("")
const loading = ref(false)
const commentsRef = ref(null)

const exifOpen = ref(true)
const commentsOpen = ref(true)

const exif = computed(() => galleryStore?.galleryImages?.[0]?.exif || {});
// const meta = computed(() => galleryStore?.galleryImages?.[0]?.metadata || {});
const fetchComments = async () => {
  if (!props.photo?.photo_id) return
  loading.value = true
  const res = await commentsApi.getCommentsByPhoto(props.photo.photo_id)
  comments.value = res.data?.data || []
  await nextTick()
  commentsRef.value.scrollTop = commentsRef.value.scrollHeight
  loading.value = false
}

const postComment = async () => {
  if (!newComment.value.trim()) return
  await commentsApi.postComment(props.photo.photo_id, newComment.value)
  newComment.value = ""
  fetchComments()
}

const time = t => new Date(t).toLocaleDateString()

watch(() => props.photo?.photo_id, fetchComments, { immediate: true })
</script>


<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: flex-end;
}

.drawer {
  width: 360px;
  background: #121212;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
}

/* TOP */
.top {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #1f1f1f;
}

.close {
  background: none;
  border: none;
  color: #aaa;
  font-size: 18px;
}

/* BLOCK */
.block {
  padding: 14px 16px;
  border-bottom: 1px solid #1f1f1f;
}

.block-head {
  display: flex;
  justify-content: space-between;
  color: #ddd;
  cursor: pointer;
  font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 16px;
line-height: 20px;
letter-spacing: 0px;

}

/* EXIF */
.exif-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.exif-item label {
  font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 12px;
line-height: 20px;
letter-spacing: 0px;
color: rgba(255, 255, 255, 0.4);
}

.exif-item span {
  font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 16px;
line-height: 20px;
letter-spacing: 0px;
color: rgba(255, 255, 255, 0.9);
}

/* COMMENTS */
.comments {
  margin-top: 12px;
  max-height: 280px;
  overflow-y: auto;
}

.comment {
  margin-bottom: 14px;
}

.comment strong {
  font-size: 13px;
}

.comment p {
  font-size: 13px;
  color: #ccc;
  margin: 2px 0;
}

.comment small {
  font-size: 11px;
  color: #777;
}

/* INPUT */
.input-bar {
  margin-top: auto;
  padding: 12px;
  display: flex;
  gap: 8px;
  border-top: 1px solid #1f1f1f;
}

.input-bar input {
  flex: 1;
  background: #1e1e1e;
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
}

.input-bar button {
  background: #1db954;
  border: none;
  padding: 0 14px;
  border-radius: 6px;
}
</style>

