<template>
<div class="card" style="height: auto">
    <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
        <h4>My Lenses</h4>
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
                            {{ camera.focal }}
                        </p>
                        <p class="text-secondary">
                            {{ camera.range }}
                        </p>
                        <p class="text-secondary">
                            {{ camera.dispharagm }}
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
        name: 'M42 Auto Revuenon 55mm 1:1.7',
        image: '@/assets/images/gear/l1.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Sony 200-600mm',
        image: '@/assets/images/gear/l2.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Sony 12-24 G',
        image: '@/assets/images/gear/l3.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Nikon Z8 Mirrorless Camera',
        image: '@/assets/images/gear/l4.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Canon R5',
        image: '@/assets/images/gear/l1.png',
        price: 70,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Fujifilm XT4',
        image: '@/assets/images/gear/l2.png',
        price: 75,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Sony Aplha 1',
        image: '@/assets/images/gear/l1.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Sony 200-600mm',
        image: '@/assets/images/gear/l2.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Sony 12-24 G',
        image: '@/assets/images/gear/l3.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Nikon Z8 Mirrorless Camera',
        image: '@/assets/images/gear/l4.png',
        price: 60,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Canon R5',
        image: '@/assets/images/gear/l1.png',
        price: 70,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
    },
    {
        name: 'Fujifilm XT4',
        image: '@/assets/images/gear/l2.png',
        price: 75,
        focal: 'Focal Length: 50nm',
        range: 'Apperture Range: f/1.8 - f/16',
        dispharagm: 'Diaphragm Type: Automatic'
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
