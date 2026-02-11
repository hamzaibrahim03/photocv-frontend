<template>
<div class="cardd">
    <div class="d-flex justify-content-between mb-3" style="
        padding-left: 20px;
        font-size: 20px;
        padding-right: 20px;
        padding-top: 20px;
      ">
        <h5 class="title">Member Galleries</h5>
        <router-link to="/mem_gallery" custom v-slot="{ navigate }">
            <button class="btn btn-sm" id="view" @click="navigate">View All</button>
        </router-link>
    </div>
    <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
        <div class="pic">
            <div v-for="(item, index) in row" :key="item.id" class="pic-item" :class="{
                'bottom-left-radius': rowIndex === 1 && index === 0,
                'bottom-right-radius': rowIndex === 1 && index === row.length - 1
                }">
                <img :src="item.image" alt="Gallery Image" />
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
    name: "MemberGallery",
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
            this.cards = [{
                    id: 1,
                    image: require("@/assets/images/dashboard/m1.png"),
                    create: "Kamran",
                },
                {
                    id: 2,
                    image: require("@/assets/images/dashboard/m2.jpg"),
                    create: "Ammar",
                },
                {
                    id: 3,
                    image: require("@/assets/images/dashboard/m3.jpg"),
                    create: "Right Place",
                },
                {
                    id: 4,
                    image: require("@/assets/images/dashboard/m4.png"),
                    create: "Desert Tree",
                },
                {
                    id: 5,
                    image: require("@/assets/images/dashboard/m5.png"),
                    create: "Blueball Flowers",
                },
                {
                    id: 6,
                    image: require("@/assets/images/dashboard/m6.png"),
                    create: "Screne Sunset",
                },
                {
                    id: 7,
                    image: require("@/assets/images/dashboard/m7.jpg"),
                    create: "Autumn Walk",
                },
                {
                    id: 8,
                    image: require("@/assets/images/dashboard/m8.jpg"),
                    create: "Walk Side",
                },
                {
                    id: 9,
                    image: require("@/assets/images/dashboard/m9.png"),
                    create: "Softest Rose",
                },
                {
                    id: 10,
                    image: require("@/assets/images/dashboard/m10.png"),
                    create: "Butterfly",
                },
            ];
            this.loading = false;
        }, 1000);
    },
};
</script>

<style scoped>
.row-wrapper {
     display: flex;
}
.bottom-left-radius img,
.bottom-left-radius .pic-info {
     border-bottom-left-radius: 10px;
}
.bottom-right-radius img,
.bottom-right-radius .pic-info {
     border-bottom-right-radius: 10px;
}
</style>
