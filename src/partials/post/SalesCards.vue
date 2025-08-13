<template>
<div class="d-flex justify-content-between align-items-center mb-3" style="padding: 15px">
    <h4>My Sales</h4>
</div>

<div v-for="sale in sales" :key="sale.id" class="custom-card mb-3 p-3 rounded shadow-sm" style="background-color: #fff;">
    <div class="d-flex gap-3">
        <img src="@/assets/images/dashboard/c1.jpg" alt="Sale Image" class="rounded" style="width: 267px; height: 222px; object-fit: cover;" />
      
        <div class="flex-grow-1">
            <div class="mb-2">
                <h5 class="mb-1">{{ sale.title }}</h5>
                <div class="text-muted small">
                    <i class="fas fa-star me-1"></i> {{ sale.views }}  
                    &nbsp;|&nbsp; {{ sale.sold }} Sold
                </div>
            </div>
        
            <p class="role">* Available</p>
            <p class="text-secondary" style="max-width: 90%;"> {{ sale.description }}</p>
        
            <button class="btn btn-outline-secondary btn-sm mt-2">View Details</button>
        </div>
    </div>
</div>
<button class="btn me-2" id="view" style="margin-left: 5%; margin-bottom: 5%">View All</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sales = ref([])

onMounted(() => {
  // Simulated Data (You can replace this with API call)
  sales.value = [
    {
      id: 1,
      title: 'Nature',
      views: 10,
      sold: 3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    },
    {
      id: 2,
      title: 'Nature',
      views: 10,
      sold: 3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    },
    {
      id: 3,
      title: 'Nature',
      views: 10,
      sold: 3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    },
    {
      id: 4,
      title: 'Nature',
      views: 10,
      sold: 3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    }
  ]
})
</script>

<style scoped>
.custom-card {
  border: 1px solid #e0e0e0;
}

.btn {
  background-color: #a0846c;
  color: #fff;
  border: none;
}

.btn:hover {
  background-color: #8a6f58;
}
</style>
