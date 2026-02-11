<template>
<div class="card">
    <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
        <h4>Member Galleries</h4>
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
<div class="dt-paging">
    <nav aria-label="pagination">
        <button class="dt-paging-button first" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1" @click="goToPage(1)" aria-label="First">
            «
        </button>

        <button class="dt-paging-button previous" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)" aria-label="Previous">
            ‹
        </button>

        <button v-for="page in totalPages" :key="page" class="dt-paging-button" :class="{ current: page === currentPage }" @click="goToPage(page)">
            {{ page }}
        </button>

        <button class="dt-paging-button next" :class="{ disabled: currentPage === totalPages }" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)" aria-label="Next">
            ›
        </button>

        <button class="dt-paging-button last" :class="{ disabled: currentPage === totalPages }" :disabled="currentPage === totalPages" @click="goToPage(totalPages)" aria-label="Last">
            »
        </button>
    </nav>
</div>
</template>

<script>
export default {
    name: "MemberGalleries",
    data() {
        return {
            cards: [],
            loading: true,
            currentPage: 1,
            pageSize: 6,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.cards.length / this.pageSize);
        },
        paginatedCards() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.cards.slice(start, start + this.pageSize);
        },
        chunkedCards() {
            const chunkSize = 3;
            const chunks = [];
            const currentCards = this.paginatedCards;
            for (let i = 0; i < currentCards.length; i += chunkSize) {
                chunks.push(currentCards.slice(i, i + chunkSize));
            }
            return chunks;
        },
    },
    methods: {
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
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
                    image: require("@/assets/images/gallery/m6.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 4,
                    image: require("@/assets/images/gallery/m5.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 5,
                    image: require("@/assets/images/gallery/m3.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 6,
                    image: require("@/assets/images/gallery/m4.png"),
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
                {
                    id: 9,
                    image: require("@/assets/images/gallery/m4.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 10,
                    image: require("@/assets/images/gallery/m1.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 11,
                    image: require("@/assets/images/gallery/m2.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 12,
                    image: require("@/assets/images/gallery/m6.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 13,
                    image: require("@/assets/images/gallery/m5.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 14,
                    image: require("@/assets/images/gallery/m3.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 15,
                    image: require("@/assets/images/gallery/m4.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 16,
                    image: require("@/assets/images/gallery/m7.jpg"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 17,
                    image: require("@/assets/images/gallery/m8.png"),
                    img: require("@/assets/images/gallery/pro.jpg"),
                },
                {
                    id: 18,
                    image: require("@/assets/images/gallery/c2.jpg"),
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
