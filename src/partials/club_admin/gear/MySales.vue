<template>
<div class="card" style="height: auto; width: 95%">
    <div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
        <h4>My Sales</h4>
    </div>

    <div v-for="(camera, index) in cameras" :key="index">
        <div class="custom-card mb-3 p-3 shadow-sm">
            <div class="d-flex gap-3">
                <img :src="camera.image" alt="Camera Image" />
                <div class="flex-grow-1">
                    <div class="mb-2">
                        <h5 class="mb-1">{{ camera.name }}</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="text-muted small">
                                <i class="fas fa-star me-1"></i> {{ camera.views }}  
                                &nbsp;|&nbsp; {{ camera.sold }} Sold
                            </div>
                            <p class="text-secondary">&euro;200</p>
                        </div>
                    </div>
                    <p class="date">{{ camera.avail }}</p>
                    <p class="text-secondary">
                        {{ camera.description }}
                    </p>
                    <div class="button-group">
                        <button class="btn" id="view" style="max-width: 140px">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="button-group">
        <button class="btn" id="view" style="max-width: 130px; margin-left: 5%; margin-bottom: 5%;">View All</button>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const cameras = ref([{
        name: 'M42 Auto Revuenon 55mm 1:1.7',
        image: '@/assets/images/gear/s1.png',
        avail: '* Available',
         sold: 3,
        views: 10,
        description: 'A breathtaking capture of nature’s serenity, where golden sunlight filters through lush green trees, bringing life to the tranquil landscape.'
    },
    {
        name: 'Sony 200-600mm',
        image: '@/assets/images/gear/s2.png',
        avail: '* Available',
         sold: 3,
        views: 10,
        description: 'A breathtaking capture of nature’s serenity, where golden sunlight filters through lush green trees, bringing life to the tranquil landscape.'
    },
    {
        name: 'Sony 12-24 G',
        image: '@/assets/images/gear/s3.png',
        avail: '* Available',
         sold: 3,
        views: 10,
        description: 'A breathtaking capture of nature’s serenity, where golden sunlight filters through lush green trees, bringing life to the tranquil landscape.'
    },
])


</script>

<style scoped>
/* Your custom styles if needed */
</style>
