<template>
<div class="card" style="height: auto">
    <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
        <h4>My Camera</h4>
        <button class="btn btn-sm" id="view">View All</button>
    </div>

    <div class="row">
        <div v-for="(camera, index) in paginatedCameras" :key="index" class="col-md-6">
            <div class="custom-card mb-3 p-3 shadow-sm">
                <div class="d-flex gap-3">
                    <img :src="camera.image" alt="Camera Image" />
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6>{{ camera.name }}</h6>
                            <div class="icon-container">
                                <i class="fas fa-comment-alt me-2"></i>
                            </div>
                        </div>
                        <p class="date">&euro;{{ camera.price }}</p>
                        <p class="text-secondary">
                            {{ camera.description }}
                        </p>
                        <div class="button-group">
                            <button class="btn me-2" id="view">View</button>
                            <button class="btn" id="edit">Edit</button>
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

<script setup>
import { ref, computed } from 'vue'

const cameras = ref([{
        name: 'Sony Aplha 1',
        image: '@/assets/images/gear/c1.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Sony 200-600mm',
        image: '@/assets/images/gear/c2.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Sony 12-24 G',
        image: '@/assets/images/gear/c3.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Nikon Z8 Mirrorless Camera',
        image: '@/assets/images/gear/c4.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Canon R5',
        image: '@/assets/images/gear/c1.jpg',
        price: 70,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Fujifilm XT4',
        image: '@/assets/images/gear/c2.jpg',
        price: 75,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Sony Aplha 1',
        image: '@/assets/images/gear/c1.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Sony 200-600mm',
        image: '@/assets/images/gear/c2.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Sony 12-24 G',
        image: '@/assets/images/gear/c3.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Nikon Z8 Mirrorless Camera',
        image: '@/assets/images/gear/c4.jpg',
        price: 60,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Canon R5',
        image: '@/assets/images/gear/c1.jpg',
        price: 70,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    },
    {
        name: 'Fujifilm XT4',
        image: '@/assets/images/gear/c2.jpg',
        price: 75,
        description: 'This camera is unique, oddball, and quite different from what else is out there from any other manufacturer of cameras in todays digital realm. You can see my full 8000 word review with two videos HERE if you missed it. This is a modular system, and aimed at CINEMA and PHOTO users. I much prefer it for a still camera with manual M mount lenses, along with the viewfinder attachment.'
    }
])

const itemsPerPage = 4
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(cameras.value.length / itemsPerPage))

const paginatedCameras = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return cameras.value.slice(start, end)
})

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}
</script>

<style scoped>
/* Your custom styles if needed */
</style>
