<template>
  <div class="comments-cards">
    <h5>{{title}}</h5>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l1.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l2.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l3.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l4.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l2.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l3.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l5.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l6.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l7.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l8.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l5.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l6.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l1.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l2.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l3.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l4.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l2.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l3.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l5.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l6.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l7.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l8.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l5.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/member_single/l6.jpg" class="profile-img" />
        <span class="heart-icon">❤</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KamranLikes",
  props: {
    title: {
      type: String,
      default: "Kamran's Recent Likes",
    }
  }
};
</script>

<style scoped>
.comments-cards {
  margin-left: 0%;
  width: 95%;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
