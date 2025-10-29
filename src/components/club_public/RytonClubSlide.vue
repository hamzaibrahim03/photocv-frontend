<template>
  <div
    class="slideshow-wrapper"
    :style="{
      backgroundColor: Color.background_color || '#000',
      color: Color.text_color || '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 0',
    }"
  >
    <h2 class="text-3xl font-medium mb-6">{{ galleryName }}</h2>

    <!-- Carousel -->
    <Carousel
      ref="carousel"
      :items-to-show="3"
      :wrap-around="true"
      :transition="800"
      :model-value="startIndex"
      @slide-start="onSlideChange"
      class="gallery-carousel"
    >
      <Slide
        v-for="(img, index) in galleryImages"
        :key="index"
        class="carousel-slide"
      >
        <div
          class="slide-container"
          :class="{ active: currentIndex === index }"
          @click="openLightbox(index)"
        >
          <img
            :src="img.image || img.url"
            :alt="img.title || 'Gallery Image'"
            class="main-image"
          />
        </div>
      </Slide>

      <!-- Arrows -->
      <template #addons>
        <div class="carousel-nav">
          <button class="nav-btn prev" @click="prevSlide">‹</button>
          <button class="nav-btn next" @click="nextSlide">›</button>
        </div>
      </template>
    </Carousel>

    <!-- Lightbox -->
    <VueEasyLightbox
      :visible="showLightbox"
      :imgs="galleryImages.map((i) => i.image || i.url)"
      :index="lightboxIndex"
      @hide="showLightbox = false"
    />

    <!-- Footer -->
    <footer class="site-footer">
                <div class="footer-content">
                    <p class="memtext" id="fcopy">Copyright &copy; 2025 – {{Club.club_name}}</p>
                    <p class="memtext">Powered by <a href="https://cameraclub.website" target="_blank" :style="{color: Color.text_color, fontWeight: 'bold'}">cameraclub.website</a></p>
                </div>
            </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import VueEasyLightbox from "vue-easy-lightbox";
import { useRytonSingleClubGalStore } from "@/stores/club_public/RytonSingleClubGallery";

const store = useRytonSingleClubGalStore();
const galleryImages = ref([]);
const showLightbox = ref(false);
const lightboxIndex = ref(0);
const carousel = ref(null);
const currentIndex = ref(0);
const startIndex = ref(0);

// Theme colors
const memData = computed(
  () => store.sinclubgalData?.data?.clubSettings?.original?.data?.settings || {}
);
const Club = computed(() => memData.value.club || {});
const Color = computed(() => memData.value.settings || {});
const galleryName = computed(() => store.galleryName);

// Load gallery and set start index
onMounted(() => {
  const saved = localStorage.getItem("selectedImages");
  const start = localStorage.getItem("startIndex");

  if (saved) galleryImages.value = JSON.parse(saved);
  else if (store.sinclubgalData?.data?.gallery?.length)
    galleryImages.value = store.sinclubgalData.data.gallery;

  if (start) {
    startIndex.value = parseInt(start);
    setTimeout(() => {
      carousel.value.slideTo(startIndex.value);
      currentIndex.value = startIndex.value;
    }, 500);
  }
});

// Open Lightbox
const openLightbox = (index) => {
  lightboxIndex.value = index;
  showLightbox.value = true;
};

// Carousel navigation
const prevSlide = () => carousel.value.prev();
const nextSlide = () => carousel.value.next();

// Track current slide for center highlight
const onSlideChange = ({ currentSlide }) => {
  currentIndex.value = currentSlide;
};
</script>

<style scoped>
.gallery-carousel {
  width: 90%;
  margin: 0 auto 40px;
  position: relative;
}

/* Slide container default (side images) */
.slide-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s ease;
  transform: scale(0.85) translateY(60px); /* ↓ side images move down */
  opacity: 0.6;
  height: 950px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.45);
}

/* Active (center) image */
.slide-container.active {
  transform: scale(1.15) translateY(-60px); /* ↑ main image moves up */
  opacity: 1;
  z-index: 2;
}

/* Image sizing */
.main-image {
  width: 100%;
  height: 950px;
  object-fit: cover;
}

.slide-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 16px;
}

/* ✅ Navigation Arrows */
.carousel-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
  pointer-events: none;
}

.nav-btn {
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  font-size: 42px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn.prev {
  position: absolute;
  left: -60px;
}

.nav-btn.next {
  position: absolute;
  right: -60px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
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
