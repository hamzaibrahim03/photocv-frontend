<template>
<div class="photographer-cards">
    <div class="row">
        <div class="col-md-3">
            <img src="@/assets/images/dashboard/simple.png" alt="Profile Picture" class="profile-pic" />
            <div class="social-media-icones">
                <a href="#" style="background-color: #99816b; color: white"><i class="fab fa-facebook-f"></i></a>
                <a href="#" style="background-color: #cc445e; color: white"><i class="fab fa-instagram"></i></a>
                <a href="#" style="background-color: #99816b; color: white"><i class="fab fa-twitter"></i></a>
            </div>
            <h3>Kamran Chohdry</h3>
            <small class="role">Photographer</small>
        </div>
        <div class="col-md-9" style="
          margin-top: 50px;
          text-align: left;
          justify-content: space-around;
        ">
            <h5 class="role" style="margin-left: 20px">A Landscape Photographer</h5>
            <p class="names">
                I started photography landscapes more than a decade ago. I started
                photography landscapes more than a decade ago. I started photography
                landscapes more than a decade ago.
            </p>

            <p class="names">
                I started photography landscapes more than a decade ago. I started
                photography landscapes more than a decade ago. I started photography
                landscapes more than a decade ago.
            </p>

            <p class="names">
                I started photography landscapes more than a decade ago. I started
                photography landscapes more than a decade ago. I started photography
                landscapes more than a decade ago.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <div class="social-icons">
                <div class="icon">
                    <span>20</span>
                    <i class="fas fa-comments"></i>
                </div>
                <div class="icon">
                    <span>53</span>
                    <i class="fas fa-desktop"></i>
                </div>
                <div class="icon">
                    <span>39</span>
                    <i class="fas fa-users"></i>
                </div>
            </div>
        </div>
        <div class="col-md-9">
            <div class="social-icons" style="margin-left: -50px">
                <span style="margin-top: 15px; margin-right: 670px; color: white">Member since 2009</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ProfileMember",
};
</script>

<style scoped></style>
