<template>
<div class="card">
    <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
        <h4>Member Galleries</h4>
        <button class="btn btn-sm" id="view">View All</button>
    </div>
    <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
        <div class="galleriy">
            <div v-for="(item, index) in row" :key="item.id" class="galleriy-item">
                <img :src="item.image" alt="Gallery Image" />
                <div :class="[
              'galleriy-infos',
              (rowIndex * 4 + index) % 2 === 0 ? 'even-info' : 'odd-info',
            ]">
                    <div class="gal-item">
                        <img :src="item.img" alt="Profile Picture" />
                        <div class="gal-details">
                            <span>Kamran Chohdry</span>
                        </div>
                    </div>
                    <div class="profile-icon">
                        <div class="icons">
                            <span>20</span>
                            <i class="fas fa-image"></i>
                        </div>
                        <div class="icons">
                            <span>53</span>
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="icons">
                            <span>39</span>
                            <i class="fas fa-comment"></i>
                        </div>
                    </div>
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
            const chunkSize = 4;
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
                    image: require("@/assets/images/gallery/m1.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 2,
                    image: require("@/assets/images/gallery/m2.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 3,
                    image: require("@/assets/images/gallery/m3.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 4,
                    image: require("@/assets/images/gallery/m4.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 5,
                    image: require("@/assets/images/gallery/m5.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 6,
                    image: require("@/assets/images/gallery/m6.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 7,
                    image: require("@/assets/images/gallery/m7.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 8,
                    image: require("@/assets/images/gallery/m8.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
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
.even-info {
     background-color: #99816b;
}
.odd-info {
     background-color: #4c4036;
}
</style>
