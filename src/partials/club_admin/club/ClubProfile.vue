<template>
<div class="profile-card">
    <div class="profile-left">
        <div class="profile-info">
            <small class="greeting">{{ greeting }}</small>
            <h2 class="name">{{ name }}</h2>
            <small class="role">{{ role }}</small>
        </div>
    </div>
    <div class="dt-search mx-auto">
        <input type="search" class="form-control" id="dt-search-1" placeholder="Search" aria-controls="example1" />
    </div>
</div>
</template>

<script>
export default {
    name: "ClubProfile",
    props: {
        greeting: {
            type: String,
            default: "Viewing Core Club Settings",
        },
        name: {
            type: String,
            default: "Club Settings",
        },
        role: {
            type: String,
            default: "All changes are applied instantly",
        },
    },
};
</script>

<style scoped></style>
