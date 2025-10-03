<template>
  <div class="comments-cards">
    <h5>{{title}}</h5>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c1.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c2.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c3.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c4.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c2.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c3.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c5.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c6.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c7.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c8.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c5.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c6.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c1.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c2.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c3.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c4.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c2.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c3.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c5.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c6.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c7.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c8.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c5.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
      <div class="col-md-2 like-item">
        <img src="@/assets/images/dashboard/c6.jpg" class="profile-img" />
        <span class="heart-icon"><i class="fa-solid fa-medal"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KamranAwards",
  props: {
    title: {
      type: String,
      default: "Kamran's Awards",
    }
  }
};
</script>

<style scoped>
.comments-cards {
  width: 95%;
  margin-left: 0%;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
