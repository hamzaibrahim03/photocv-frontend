<template>
<div class="comments-card">
    <h5>{{title}}</h5>
    <div class="row">
        <div class="col-md-2">
            <img src="@/assets/images/dashboard/c1.jpg" />
        </div>
        <div class="col-md-7">
            <p>
                <label class="role">John Michael</label> Hmm, This photo loooks good
            </p>
            <a href="#" class="text-danger">Remove</a> | <a href="#">Reply</a> |
            <a href="#">Translate</a>
        </div>
        <div class="col-md-3">
            <label for="date"> 1 day ago </label>
        </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
        <div class="col-md-2">
            <img src="@/assets/images/dashboard/c2.jpg" />
        </div>
        <div class="col-md-7">
            <p>
                <label class="role">Alaxandra John</label> This photo perfectly
                captures the beauty of the moment.
            </p>
            <a href="#" class="text-danger">Remove</a> | <a href="#">Reply</a> |
            <a href="#">Translate</a>
        </div>
        <div class="col-md-3">
            <label for="date"> 2 day ago </label>
        </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
        <div class="col-md-2">
            <img src="@/assets/images/dashboard/c3.jpg" />
        </div>
        <div class="col-md-7">
            <p>
                <label class="role">Anthony Decosa</label> Wow, this is simply
                stunning! Amazing shot!
            </p>
            <a href="#" class="text-danger">Remove</a> | <a href="#">Reply</a> |
            <a href="#">Translate</a>
        </div>
        <div class="col-md-3">
            <label for="date"> 3 day ago </label>
        </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
        <div class="col-md-2">
            <img src="@/assets/images/dashboard/c1.jpg" />
        </div>
        <div class="col-md-7">
            <p>
                <label class="role">Anthony Decosa</label> Wow, this is simply
                stunning! Amazing shot!
            </p>
            <a href="#" class="text-danger">Remove</a> | <a href="#">Reply</a> |
            <a href="#">Translate</a>
        </div>
        <div class="col-md-3">
            <label for="date"> 3 days ago </label>
        </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
        <div class="col-md-2">
            <img src="@/assets/images/dashboard/c2.jpg" />
        </div>
        <div class="col-md-7">
            <p>
                <label class="role">Alaxandra John</label> This photo perfectly
                captures the beauty of the moment.
            </p>
            <a href="#" class="text-danger">Remove</a> | <a href="#">Reply</a> |
            <a href="#">Translate</a>
        </div>
        <div class="col-md-3">
            <label for="date"> 2 days ago </label>
        </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
        <div class="col-md-2">
            <img src="@/assets/images/dashboard/c3.jpg" />
        </div>
        <div class="col-md-7">
            <p>
                <label class="role">Anthony Decosa</label> Wow, this is simply
                stunning! Amazing shot!
            </p>
            <a href="#" class="text-danger">Remove</a> | <a href="#">Reply</a> |
            <a href="#">Translate</a>
        </div>
        <div class="col-md-3">
            <label for="date"> 3 days ago </label>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "KamranComments",
    props: {
        title: {
            type: String,
            default: "Kamran's Recent Comments",
        }
    }
};
</script>

<style scoped>
.comments-card {
     width: 95%;
     margin-left: 4%;
     max-height: 250px;
     overflow-y: auto;
     padding-right: 10px;
}
</style>
