<template>
  <div class="cardd">
    <div 
    class="d-flex justify-content-between mb-3" 
    style="
        padding-left: 20px;
        font-size: 20px;
        padding-right: 20px;
        padding-top: 20px;
        ">
      <h5>Club Galleries</h5>
      <router-link to="/club_gallery" custom v-slot="{ navigate }">
        <button class="btn btn-sm" id="view" @click="navigate">View All</button>
      </router-link>
    </div>
    <div
      v-for="(row, rowIndex) in chunkedCards"
      :key="rowIndex"
      class="row-wrapper"
    >
      <div class="pic">
            <div v-for="(item, index) in row" :key="item.id" class="pic-item" :class="{
                'bottom-left-radius': rowIndex === 1 && index === 0,
                'bottom-right-radius': rowIndex === 1 && index === row.length - 1
                }">
                <img :src="item.img" alt="Gallery Image" />
                <div class="pic-info">
                    <span>{{ item.create }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClubGallery",
  data() {
    return {
      cards: [],
      loading: true,
    };
  },
  computed: {
    chunkedCards() {
      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < this.cards.length; i += chunkSize) {
        chunks.push(this.cards.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  mounted() {
    setTimeout(() => {
      this.cards = [
        {
          id: 1,
          img: require("@/assets/images/dashboard/c1.jpg"),
          create: "Nature",
        },
        {
          id: 2,
          img: require("@/assets/images/dashboard/c2.jpg"),
          create: "Indoors",
        },
        {
          id: 3,
          img: require("@/assets/images/dashboard/c3.jpg"),
          create: "Seascapes",
        },
        {
          id: 4,
          img: require("@/assets/images/dashboard/c4.jpg"),
          create: "Street",
        },
        {
          id: 5,
          img: require("@/assets/images/dashboard/c5.jpg"),
          create: "Potrait",
        },
        {
          id: 6,
          img: require("@/assets/images/dashboard/c6.jpg"),
          create: "Event",
        },
        {
          id: 7,
          img: require("@/assets/images/dashboard/c7.jpg"),
          create: "Weather",
        },
        {
          id: 8,
          img: require("@/assets/images/dashboard/c8.jpg"),
          create: "Architecture",
        },
        {
          id: 9,
          img: require("@/assets/images/dashboard/c9.jpg"),
          create: "Mono",
        },
        {
          id: 10,
          img: require("@/assets/images/dashboard/c10.jpg"),
          create: "Sunset",
        },
      ];
      this.loading = false;
    }, 1000);
  },
};
</script>

<style scoped>
.bottom-left-radius img,
.bottom-left-radius .pic-info {
    border-bottom-left-radius: 10px;
}

.bottom-right-radius img,
.bottom-right-radius .pic-info {
    border-bottom-right-radius: 10px;
}
</style>
