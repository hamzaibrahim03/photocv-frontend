<template>
  <div class="upcards">
    <div id="datepicker"></div>
  </div>
</template>

<script>
export default {
  /* global $ */

  mounted() {
    $("#datepicker").datepicker();
  },
  name: "CalendarDashboard",
};
</script>

<style scoped>
</style>
