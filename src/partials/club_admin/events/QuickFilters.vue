<template>
<div class="profile-card">
    <div class="profile-left">
        <div class="profile-info">
            <small class="greeting">{{ greeting }}</small>
            <h2 class="name">{{ name }}</h2>
            <p class="role">{{ role }}</p>
        </div>
    </div>
    <div class="dt-search mx-auto">
        <input type="search" class="form-control" id="dt-search-1" placeholder="Search" aria-controls="example1" />
    </div>
    <div class="quick-filter text-end">
        <strong>Quick Filter</strong>
        <small class="d-block">(Click icons to filter)</small>
        <div class="d-flex gap-2 justify-content-end">
            <i class="bi bi-calendar-event"></i>
            <i class="bi bi-camera"></i>
            <i class="bi bi-newspaper"></i>
        </div>
        <div class="d-flex gap-2 justify-content-end mt-2">
            <i class="bi bi-trophy"></i>
            <i class="bi bi-info"></i>
            <i class="bi bi-bell"></i>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "QuickFilters",
    props: {
        role: {
            type: String,
            default: "10 Events to go",
        },
        greeting: {
            type: String,
            default: "Planned and regular club events",
        },
        name: {
            type: String,
            default: "2024-2025 Season",
        },
    },
};
</script>

<style scoped>
</style>
