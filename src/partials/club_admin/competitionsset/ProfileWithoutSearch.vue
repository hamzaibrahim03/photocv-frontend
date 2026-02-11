<template>
<div class="profile-card">
    <div class="profile-left">
        <div class="profile-info">
            <small class="greeting">{{ greeting }}</small>
            <h2 class="name">{{ name }}</h2>
            <small class="role">{{ role }}</small>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ProfileWithoutSearch",
    props: {
        greeting: {
            type: String,
            default: "Planned and regular club competition",
        },
        name: {
            type: String,
            default: "2024-2025 Season",
        },
        role: {
            type: String,
            default: "10 Competitions to go",
        },
    },
};
</script>

<style scoped></style>
