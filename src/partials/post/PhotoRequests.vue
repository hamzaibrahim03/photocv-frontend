<template>
    <div class="photo-requests">
        <h5 class="mb-3">Photo Requests</h5>
    
        <div v-for="request in requests" :key="request.id" class="request-card d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center">
                <img src="@/assets/images/dashboard/pro.png" alt="User Avatar" class="avatar rounded-circle me-3" />
                <div>
                    <h6 class="mb-1 text-danger">{{ request.name }}</h6>
                    <p class="mb-1 text-muted">{{ request.message }}</p>
                    <small class="text-secondary">{{ request.time }}</small>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-accept">Accept</button>
                <button class="btn btn-reject">Reject</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const requests = ref([
  {
    id: 1,
    name: 'Kamran Chohdry',
    avatar: '@/assets/images/dashboard/pro.png',
    message: 'Requested your photo',
    time: '5 min ago'
  },
  ...Array(90).fill().map((_, i) => ({
    id: i + 2,
    name: 'Kamran Chohdry',
    avatar: '@/assets/images/dashboard/c1.jpg',
    message: 'Requested your photo',
    time: '5 min ago'
  }))
])
</script>

<style scoped>
.photo-requests::-webkit-scrollbar {
     width: 10px;
}
.photo-requests::-webkit-scrollbar-track {
     background: #f1f1f1;
     border-radius: 10px;
}

.photo-requests::-webkit-scrollbar-thumb {
     background: #a0846c; 
     border-radius: 10px;
}
.photo-requests::-webkit-scrollbar-thumb:hover {
     background: #8a6f58; 
}
.photo-requests {
     background: #fff;
     padding: 15px;
     border-radius: 8px;
     max-height: 1000px;
     overflow-y: auto;
}
.request-card {
     border-bottom: 1px solid #eee;
     padding-bottom: 10px;
}
.avatar {
     width: 50px;
     height: 50px;
     object-fit: cover;
}
.btn-group {
     display: flex;
     gap: 8px;
}
.btn {
     padding: 6px 12px;
     border: none;
     border-radius: 5px;
     font-size: 0.9rem;
     cursor: pointer;
}
.btn-accept {
     background-color: #a0846c;
     color: #fff;
}
.btn-reject {
     background-color: #f0e4d3;
     color: #a0846c;
}
.btn-accept:hover {
     background-color: #8a6f58;
}
.btn-reject:hover {
     background-color: #e6d6c3;
}
</style>
