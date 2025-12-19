<template>
  <div class="slideshow-wrapper">
    <!-- HEADER -->
    <header class="top-bar">
      <button @click="$router.back()">← Back</button>
      <span>{{ galleryName }}</span>
    </header>

    <!-- MAIN -->
    <div class="content">
      <!-- IMAGE -->
      <div class="image-area">
        <button class="nav left" @click="prev">‹</button>

        <img :src="current.entry_image" />

        <button class="nav right" @click="next">›</button>

        <div class="caption">
          <h3>{{ current.entry_image_title }}</h3>
          <p>by {{ current.member_name }}</p>
        </div>
      </div>

      <!-- SIDEBAR -->
      <aside class="info-panel">
        <h4>EXIF Details</h4>
        <ul>
          <li>Camera: {{ current.exif.camera_model || "—" }}</li>
          <li>Lens: {{ current.exif.lens || "—" }}</li>
          <li>ISO: {{ current.exif.iso || "—" }}</li>
          <li>Aperture: {{ current.exif.aperture || "—" }}</li>
          <li>Shutter: {{ current.exif.shutter_speed || "—" }}</li>
        </ul>
      </aside>
    </div>

    <!-- THUMBNAILS -->
    <div class="thumbs">
      <img
        v-for="(img, i) in images"
        :key="img.entry_id"
        :src="img.entry_image"
        :class="{ active: i === index }"
        @click="index = i"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRytonSingleCompResultStore } from "@/stores/club_public/RytonSingleResult";

const route = useRoute();
const store = useRytonSingleCompResultStore();

const images = ref([]);
const index = ref(0);

const current = computed(() => store.sincompresData?.competitionResult?.original?.data?.entries[index.value] || {});

const next = () => {
  if (index.value < images.value.length - 1) index.value++;
};

const prev = () => {
  if (index.value > 0) index.value--;
};

onMounted(async () => {
  const compId = route.params.galleryId;
  const photoId = Number(route.params.photoId);

  await store.fetchRytonSingleCompResData(compId);

  images.value = store.sincompresData.data.entries.filter(
    e => e.is_published === 1
  );

  index.value = images.value.findIndex(e => e.entry_id === photoId);
});
</script>
<style scoped>
.slideshow-wrapper {
  position: fixed;
  inset: 0;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.top-bar {
  padding: 16px;
  display: flex;
  gap: 20px;
}

.content {
  flex: 1;
  display: flex;
}

.image-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-area img {
  max-height: 80vh;
  max-width: 80%;
  object-fit: contain;
}

.nav {
  position: absolute;
  font-size: 40px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.left { left: 20px; }
.right { right: 20px; }

.info-panel {
  width: 300px;
  background: #111;
  padding: 20px;
}

.thumbs {
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow-x: auto;
}

.thumbs img {
  height: 60px;
  opacity: 0.5;
  cursor: pointer;
}

.thumbs img.active {
  opacity: 1;
  border: 2px solid white;
}

</style>