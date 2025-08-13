<template>
  <div class="comments-cards">
    <h5>{{title}}</h5>
    <div class="row">
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e1_1.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e1_2.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e1_3.jpg" />
      </div>
      <div class="col-md-6">
        <p><label class="role">Colour Competition</label></p>
      </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e2_1.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e2_2.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e2_3.jpg" />
      </div>
      <div class="col-md-6">
        <p><label class="role">Print Competition</label></p>
      </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e3_1.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e3_2.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e3_3.jpg" />
      </div>
      <div class="col-md-6">
        <p><label class="role">Potrait Competition</label></p>
      </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e1_1.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e1_2.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e1_3.jpg" />
      </div>
      <div class="col-md-6">
        <p><label class="role">Colour Competition</label></p>
      </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e2_1.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e2_2.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e2_3.jpg" />
      </div>
      <div class="col-md-6">
        <p><label class="role">Print Competition</label></p>
      </div>
    </div>
    <div class="divider2"></div>
    <div class="row">
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e3_1.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e3_2.jpg" />
      </div>
      <div class="col-md-2">
        <img src="@/assets/images/member_single/e3_3.jpg" />
      </div>
      <div class="col-md-6">
        <p><label class="role">Potrait Competition</label></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KamranEntries",
  props: {
    title: {
      type: String,
      default: "Kamran's Competition Entries",
    }
  }
};
</script>

<style scoped>
.comments-cards {
  width: 95%;
  margin-left: 4%;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
