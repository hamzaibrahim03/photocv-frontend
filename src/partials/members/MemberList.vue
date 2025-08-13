<template>
<div v-for="(row, rowIndex) in chunkedCards" :key="rowIndex" class="row-wrapper">
    <div class="photographers">
        <div v-for="item in row" :key="item.id" class="photographer-card">
            <img :src="item.image" alt="Profile Picture" class="profile-pic" />
            <div class="social-media-icons">
                <a href="#" style="background-color: #99816b; color: white"><i class="fab fa-facebook-f"></i></a>
                <a href="#" style="background-color: #cc445e; color: white"><i class="fab fa-instagram"></i></a>
                <a href="#" style="background-color: #99816b; color: white"><i class="fab fa-twitter"></i></a>
            </div>
            <h3>{{ item.title }}</h3>
            <small class="role">{{ item.role }}</small>
            <div class="social-icons">
                <div class="icon">
                    <span>20</span>
                    <i class="fas fa-comments"></i>
                </div>
                <div class="icon">
                    <span>53</span>
                    <i class="fas fa-desktop"></i>
                </div>
                <div class="icon">
                    <span>39</span>
                    <i class="fas fa-users"></i>
                </div>
            </div>
            <div class="gallery-preview">
                <div class="pic-item">
                    <img :src="item.galimage" alt="Gallery Image" />
                    <div class="pic-info">
                        <span>{{ item.span }}</span>
                    </div>
                </div>
                <div class="pic-item">
                    <img :src="item.gallimage" alt="Gallery Image" />
                    <div class="pic-info">
                        <span>{{ item.spans }}</span>
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
    name: "MemberList",
    data() {
        return {
            cards: [],
            loading: true,
            currentPage: 1,
            itemsPerPage: 24,
        };
    },
    computed: {
        paginatedCards() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.cards.slice(start, end);
        },
        chunkedCards() {
            const chunkSize = 4;
            const chunks = [];
            const currentPageItems = this.paginatedCards;
            for (let i = 0; i < currentPageItems.length; i += chunkSize) {
                chunks.push(currentPageItems.slice(i, i + chunkSize));
            }
            return chunks;
        },
        totalPages() {
            return Math.ceil(this.cards.length / this.itemsPerPage);
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
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 2,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 3,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 4,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 5,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 6,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 7,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 8,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 9,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 10,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 11,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 12,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 13,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 14,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 15,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 16,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 17,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 18,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 19,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 20,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 21,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 22,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 23,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 24,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 1,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 2,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 3,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 4,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 5,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 6,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 7,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 8,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 9,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 10,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 11,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 12,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 13,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 14,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 15,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 16,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 17,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 18,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 19,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 20,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 21,
                    image: require("@/assets/images/members/pro.jpg"),
                    title: "Kamran Chohdary",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/1.png"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/2.png"),
                    spans: "Portfolio",
                },
                {
                    id: 22,
                    image: require("@/assets/images/members/amm.png"),
                    title: "Ammar Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/3.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/4.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 23,
                    image: require("@/assets/images/members/soh.png"),
                    title: "Sohaib Nasir",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/5.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/6.jpg"),
                    spans: "Portfolio",
                },
                {
                    id: 24,
                    image: require("@/assets/images/members/har.png"),
                    title: "Haroon Ejaz",
                    role: "Photographer",
                    galimage: require("@/assets/images/members/7.jpg"),
                    span: "Gallery",
                    gallimage: require("@/assets/images/members/8.jpg"),
                    spans: "Portfolio",
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
</style>
