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
      @slide-end="onSlideChange"
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
console.log(galleryName)
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
  const total = galleryImages.value.length;
  const visibleCount = 3; // same as :items-to-show="3"
  const centerOffset = Math.floor(visibleCount / 2);
  currentIndex.value = (currentSlide + centerOffset) % total;
};

</script>

<style scoped>
.gallery-carousel {
  width: 88%;
  margin: 0 auto 60px;
  position: relative;
}

/* Base style for all slides */
.slide-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.6s ease;
  transform: scale(0.85) translateY(70px); /* side images slightly lower */
  opacity: 0.6;
  height: 950px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
}

/* Active (center) image: lifted up and highlighted */
.slide-container.active {
  transform: scale(1.12) translateY(-60px);
  opacity: 1;
  z-index: 3;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
  border: 3px solid rgba(255, 255, 255, 0.4);
}

/* Image inside slides */
.main-image {
  width: 100%;
  height: 950px;
  object-fit: cover;
  transition: all 0.6s ease;
}

.slide-container.active .main-image {
  filter: brightness(1.1);
}

/* Caption overlay (optional, but matches photography gallery look) */
.slide-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 16px;
}

/* --- Navigation Arrows --- */
.carousel-nav {
  position: absolute;
  top: 48%;
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
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(6px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0);
  font-size: 42px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn.prev {
  position: absolute;
  left: -75px;
}

.nav-btn.next {
  position: absolute;
  right: -75px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* --- Footer --- */
.site-footer {
  padding-top: 25px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 60px;
}

.site-footer a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.site-footer a:hover {
  text-decoration: underline;
}

/* --- Responsive adjustments --- */
@media (max-width: 992px) {
  .slide-container {
    height: 450px;
  }
  .slide-container.active {
    transform: scale(1.05) translateY(-40px);
  }
  .nav-btn.prev {
    left: -40px;
  }
  .nav-btn.next {
    right: -40px;
  }
}

@media (max-width: 768px) {
  .slide-container {
    height: 360px;
  }
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 28px;
  }
}

</style>
