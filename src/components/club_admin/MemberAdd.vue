<template>
<NavigationRoute />
<HeaderRoute title="" />

<section class="content">
    <div class="dashboard-card">
        <div class="profile-card" style="width: 100%; height: 100px">
            <div class="profile-left">
                <div class="profile-info" style="margin-left:15px">
                    <h2 class="name">Add New Member</h2>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-8">
        <div class="p-3" id="news">
            <div class="news-list">
                <div class="form-containers">
                    <form @submit.prevent="submitForm">
                        <h5>General Information</h5>
                        <div class="divider3"></div>
                        <div class="row">
                            <div class="col-md-6">
                                <label> Title </label>
                                <input type="text" v-model="Title" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label> Full Name </label>
                                <input type="text" v-model="name" class="form-control" />
                            </div>
                        </div>
                        <div class="divider3"></div>

                        <div class="row">
                            <div class="col-md-6">
                                <label> Email </label>
                                <input type="email" v-model="Title" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <label> Phone </label>
                                <input type="number" v-model="name" class="form-control" />
                            </div>
                        </div>
                        <div class="divider3"></div>

                        <div class="row">
                            <div class="col-md-6">
                                <label> Description </label>
                                <textarea class="form-control"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label> Image </label>
                                <input type="file" class="form-control" />
                            </div>
                        </div>
                        <div class="divider3"></div>

                        <div class="row">
                            <div class="col-md-12">
                                <label> Role </label>
                                <select class="form-control">
                                    <option></option>
                                    <option>Admin</option>
                                    <option>Photographer</option>
                                    <option>Member</option>
                                </select>
                            </div>
                        </div>
                        <div class="divider3"></div>

                        <label for="social">Social Media Links</label>
                        <div class="row align-items-center mb-3">
                            <div class="col">
                                <label for="facebook" class="form-label">Facebook</label>
                                <input type="text" class="form-control" placeholder="Facebook link..." />
                            </div>
                        </div>

                        <div class="row align-items-center mb-3">
                            <div class="col">
                                <label for="instagram" class="form-label">Instagram</label>
                                <input type="text" class="form-control" placeholder="Instagram link..." />
                            </div>
                        </div>

                        <div class="row align-items-center mb-3">
                            <div class="col">
                                <label for="flickr" class="form-label">Flickr</label>
                                <input type="text" class="form-control" placeholder="Flickr link..." />
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="button-group">
                                <button class="btn" id="edit">Save</button>
                                <button class="btn me-2" id="view">Cancel</button>
                            </div>
                            <button class="btn me-2" id="view">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup>
import NavigationRoute from "@/components/NavigationRoute.vue"
import HeaderRoute from "@/components/HeaderRoute.vue"
</script>

<style scoped>
.form-control {
    height: 50px;
    font-size: 16.61px;
    font-weight: 400;
    padding: 12px;
    border-radius: 5px;
    color: #4C4036;
    border: 1.04px solid #99816B;
}
</style>
