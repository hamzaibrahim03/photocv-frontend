<template>
<div class="card" style="height: 830px">
    <div class="d-flex justify-content-between align-items-center mb-3" style="
        padding-left: 20px;
        font-size: 20px;
        padding-right: 20px;
        padding-top: 20px;">
        <h4>{{title}}</h4>
    </div>
    <div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
        <div class="galleriy">
            <div v-for="(item, index) in row" :key="item.id" class="galleriy-item" :class="{
                'bottom-left-radius': rowIndex === 1 && index === 0,
                'bottom-right-radius': rowIndex === 1 && index === row.length - 1
                }">
                <img :src="item.image" alt="Gallery Image" />
                <div :class="[
              'galleriy-infos',
              (rowIndex * 4 + index) % 2 === 0 ? 'even-info' : 'odd-info',
            ]">
                    <span>{{item.name}}</span>
                    <div class="profile-icon">
                        <div class="icons">
                            <span>{{item.count}}</span>
                            <i class="fas fa-image"></i>
                        </div>
                        <div class="icons">
                            <span>{{item.heart}}</span>
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="icons">
                            <span>{{item.comment}}</span>
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
    name: "KamranGallery",
    props: {
        title: {
            type: String,
            default: "Kamran Chohdry's Gallery"
        }
    },
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
                    image: require("@/assets/images/gallery/c1.jpg"),
                    name: "Nature",
                    count: "20",
                    heart: "15",
                    comment: "39"
                },
                {
                    id: 2,
                    image: require("@/assets/images/gallery/c2.jpg"),
                    name: "Indoors",
                    count: "20",
                    heart: "25",
                    comment: "39"
                },
                {
                    id: 3,
                    image: require("@/assets/images/gallery/c3.jpg"),
                    name: "Street",
                    count: "20",
                    heart: "15",
                    comment: "39"
                },
                {
                    id: 4,
                    image: require("@/assets/images/gallery/c4.jpg"),
                    name: "Potrait",
                    count: "20",
                    heart: "15",
                    comment: "39"
                },
                {
                    id: 5,
                    image: require("@/assets/images/gallery/c5.jpg"),
                    name: "Event",
                    count: "20",
                    heart: "15",
                    comment: "39"
                },
                {
                    id: 6,
                    image: require("@/assets/images/gallery/c6.jpg"),
                    name: "Weather",
                    count: "20",
                    heart: "15",
                    comment: "39"
                },
                {
                    id: 7,
                    image: require("@/assets/images/gallery/c7.jpg"),
                    name: "Mono",
                    count: "20",
                    heart: "15",
                    comment: "39"
                },
                {
                    id: 8,
                    image: require("@/assets/images/gallery/c8.jpg"),
                    name: "Sunset",
                    count: "20",
                    heart: "15",
                    comment: "39"
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

.bottom-left-radius img,
.bottom-left-radius .pic-info {
    border-bottom-left-radius: 10px;
}

.bottom-right-radius img,
.bottom-right-radius .pic-info {
    border-bottom-right-radius: 10px;
}
</style>
