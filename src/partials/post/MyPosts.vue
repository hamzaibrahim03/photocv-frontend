<template>
<div class="card">
    <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
        <h4>My Posts</h4>
        <button class="btn me-2" id="view">Add</button>
    </div>
    <div v-for="(row, rowIndex) in chunkedCards" :key="'row-' + rowIndex" class="row-wrapper">
        <div class="galleriy">
            <div v-for="(item, index) in row" :key="`item-${rowIndex}-${index}`" class="galleriy-item">
                <img :src="item.image" alt="Gallery Image" class="gallery-img" />
                <div :class="[
              'galleriy-infos',
              (rowIndex * 4 + index) % 2 === 0 ? 'even-info' : 'odd-info',
            ]">
                    <div class="gal-item">
                        <div class="gal-details">
                            <span>{{ item.create }}</span>
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
    name: "MyPosts",
    data() {
        return {
            cards: [],
            loading: true,
            currentPage: 1,
            pageSize: 8,
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
            const chunkSize = 4;
            const chunks = [];
            const currentCards = this.paginatedCards;
            for (let i = 0; i < currentCards.length; i += chunkSize) {
                chunks.push(currentCards.slice(i, i + chunkSize));
            }
            return chunks;
        },
    },
    mounted() {
        setTimeout(() => {
            this.cards = [{
                    id: 1,
                    image: require("@/assets/images/gallery/c1.jpg"),
                    create: "Nature",
                },
                {
                    id: 2,
                    image: require("@/assets/images/gallery/c2.jpg"),
                    create: "Indoors",
                },
                {
                    id: 3,
                    image: require("@/assets/images/gallery/c3.jpg"),
                    create: "Street",
                },
                {
                    id: 4,
                    image: require("@/assets/images/gallery/c4.jpg"),
                    create: "Potrait",
                },
                {
                    id: 5,
                    image: require("@/assets/images/gallery/c5.jpg"),
                    create: "Event",
                },
                {
                    id: 6,
                    image: require("@/assets/images/gallery/c6.jpg"),
                    create: "Weather",
                },
                {
                    id: 7,
                    image: require("@/assets/images/gallery/c7.jpg"),
                    create: "Mono",
                },
                {
                    id: 8,
                    image: require("@/assets/images/gallery/c8.jpg"),
                    create: "Sunset",
                },
                {
                    id: 9,
                    image: require("@/assets/images/gallery/c1.jpg"),
                    create: "Nature",
                },
                {
                    id: 10,
                    image: require("@/assets/images/gallery/c2.jpg"),
                    create: "Indoors",
                },
                {
                    id: 11,
                    image: require("@/assets/images/gallery/c3.jpg"),
                    create: "Street",
                },
                {
                    id: 12,
                    image: require("@/assets/images/gallery/c4.jpg"),
                    create: "Potrait",
                },
                {
                    id: 13,
                    image: require("@/assets/images/gallery/c5.jpg"),
                    create: "Event",
                },
                {
                    id: 14,
                    image: require("@/assets/images/gallery/c6.jpg"),
                    create: "Weather",
                },
                {
                    id: 15,
                    image: require("@/assets/images/gallery/c7.jpg"),
                    create: "Mono",
                },
                {
                    id: 16,
                    image: require("@/assets/images/gallery/c8.jpg"),
                    create: "Sunset",
                },
                {
                    id: 17,
                    image: require("@/assets/images/gallery/c1.jpg"),
                    create: "Nature",
                },
                {
                    id: 18,
                    image: require("@/assets/images/gallery/c2.jpg"),
                    create: "Indoors",
                },
                {
                    id: 19,
                    image: require("@/assets/images/gallery/c3.jpg"),
                    create: "Street",
                },
                {
                    id: 20,
                    image: require("@/assets/images/gallery/c4.jpg"),
                    create: "Potrait",
                },
                {
                    id: 21,
                    image: require("@/assets/images/gallery/c5.jpg"),
                    create: "Event",
                },
                {
                    id: 22,
                    image: require("@/assets/images/gallery/c6.jpg"),
                    create: "Weather",
                },
                {
                    id: 23,
                    image: require("@/assets/images/gallery/c7.jpg"),
                    create: "Mono",
                },
                {
                    id: 24,
                    image: require("@/assets/images/gallery/c8.jpg"),
                    create: "Sunset",
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
