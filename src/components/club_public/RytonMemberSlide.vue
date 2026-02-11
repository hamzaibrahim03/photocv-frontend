<template>
  <div :style="{ backgroundColor: Color.background_color, fontFamily: Color.fonts }">
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
		<div class="viewer"  :class="{ 'drawer-open': showComments }">
			<section>
				<div class="top-bar">
					<button class="back-btn" @click="$router.back()">❮ &nbsp; Back</button>
				</div>
				<div class="image-section">
					<button class="nav-arrow left" @click="prev">‹</button>
					<div class="image-wrapper">
						<img v-if="current" :src="current.image" class="main-image" @click="openLightbox"/>
						<button class="expand-btn" @click="openFullscreen">⤢</button>
					</div>
					<button class="nav-arrow right" @click="next">›</button>
					<button class="open-comments" @click="showComments = true">
						❮
					</button>
				</div>
				<div class="d-flex image-info" v-if="current">
					<img v-if="profileImage" :src="profileImage" class="profile-img"/>
					<div class="text">
						<h3 class="title">
							{{ current.title }}
						</h3>
						<span class="meta">
							by {{ fullName }}
						</span>
					</div>
				</div>
				<div class="thumbs-wrapper">
					<div class="thumbnails" ref="thumbContainer">
						<div v-for="(img, i) in images" :key="img.id" class="thumb" :class="{ active: i === currentIndex }" @click="goTo(i)" :ref="el => thumbRefs[i] = el">
							<img :src="img.image" />
						</div>
					</div>
				</div>
        <CommentsDrawer v-if="showComments && current" :key="current.id" :photo="current"  @close="showComments = false"/>
        <VueEasyLightbox :visible="lightboxVisible" :imgs="lightboxImages" :index="currentIndex" @hide="closeLightbox"/>
			</section>
			<footer class="site-footer">
				<div class="footer-content">
					<p class="memtext" id="fcopy">Copyright &copy; 2025 – {{Club.club_name}}</p>
					<p class="memtext">Powered by <a href="https://cameraclub.website" target="_blank" :style="{color: Color.text_color, fontWeight: 'bold'}">cameraclub.website</a></p>
				</div>
			</footer>
		</div>
	</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue"
import VueEasyLightbox from 'vue-easy-lightbox'
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useRytonSingleMemGalStore } from "@/stores/club_public/RytonSingleMemberGallery"
import CommentsDrawer from "@/components/club_public/CommentsDrawMember.vue"
import { useRytonGalleryStore } from '@/stores/club_public/RytonGallery';
import Loader from "@/components/LoaderAll.vue";

const thumbContainer = ref(null)
const thumbRefs = ref([])
const rytongalleryStore = useRytonGalleryStore();
const route = useRoute()
const showComments = ref(false)
const currentIndex = ref(0)
const memData = computed(() => rytongalleryStore.galleryData?.data?.clubSettings?.original?.data || {});
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});

const galleryStore = useRytonSingleMemGalStore()
const {
  galleryImages,
  profileImage,
  firstName,
  lastName
} = storeToRefs(galleryStore)

const images = computed(() => galleryImages.value || [])

const current = computed(() => {
  return images.value[currentIndex.value] || null
})

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`.trim()
})

const next = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goTo = (index) => {
  currentIndex.value = index
}

const lightboxVisible = ref(false)

const lightboxImages = computed(() =>
  images.value.map(img => img.image)
)

const openLightbox = () => {
  lightboxVisible.value = true
}

const closeLightbox = () => {
  lightboxVisible.value = false
}

const openFullscreen = () => {
  const el = document.querySelector(".main-image")
  if (el?.requestFullscreen) el.requestFullscreen()
}

onMounted(async () => {
  const galleryId = route.params.id
  await galleryStore.fetchRytonSingleMemGalData(galleryId)
})

watch(currentIndex, async () => {
  await nextTick()
  const activeThumb = thumbRefs.value[currentIndex.value]
  const container = thumbContainer.value

  if (activeThumb && container) {
    const offset =
      activeThumb.offsetLeft -
      container.clientWidth / 2 +
      activeThumb.clientWidth / 2

    container.scrollTo({
      left: offset,
      behavior: "smooth",
    })
  }
})
</script>


<style scoped>
.viewer {
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.top-bar {
  padding: 18px 30px;
}

.back-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}

.image-section {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  position: relative;
}

.main-image {
  max-width: 70vw;
  max-height: 60vh;
  border-radius: 16px;
  box-shadow: 0 30px 80px rgba(0,0,0,.7);
}

.expand-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,.7);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 42px;
  color: #fff;
  background: rgba(0,0,0,.6);
  border: none;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
}

.nav-arrow.left { left: 30px; }
.nav-arrow.right { right: 30px; }

.open-comments {
  position: fixed;
  top: 10%;
  right: 1%;
  width: 60px;
  height: 60px;
  background: rgba(0,0,0,.85);
  color: #fff;
  border: none;
  font-size: 26px;
  border-radius: 12px 0 0 12px;
  cursor: pointer;
}

.image-info {
  padding: 18px 30px;
  border-top: 1px solid rgba(255,255,255,.1);
}

.info-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.profile-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.text {
	padding: 0 10px;
}

.text .title {
  margin: 0;
  padding: 0;
  font-family: Inter;
font-weight: 600;
font-style: Semi Bold;
font-size: 40px;
line-height: 100%;
letter-spacing: 0%;
color:rgba(255, 255, 255, 1);
}

.meta {
  font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 20px;
line-height: 100%;
letter-spacing: 0%;
color:rgba(255, 255, 255, 1);
}

.viewer {
  transition: transform 0.3s ease;
}

.viewer.drawer-open .image-section {
  transform: translateX(-200px);
}

.viewer.drawer-open .nav-arrow.left {
  left: 210px;
}

.viewer.drawer-open .nav-arrow.right {
  right: 510px;
}

.thumbs-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}
.thumbnails {
  display: flex;
  gap: 30px;
  padding: 14px 20px 20px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  max-width: 1610px;
}

.thumbnails::-webkit-scrollbar {
  display: none;
}

.thumb {
  flex: 0 0 auto;
  width: 296px;
  height: 220px;
  overflow: hidden;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb.active {
  opacity: 1;
  outline: 2px solid #fff;
}


 .site-footer {
     padding-top: 25px;
     padding-bottom: 10px;
     text-align: center;
     font-size: 14px;
     color: #555;
     border-top: 1px solid #ddd;
     margin-top: 40px;
}
 .site-footer a {
     color: #007bff;
     text-decoration: none;
}
 .site-footer a:hover {
     text-decoration: underline;
}
</style>