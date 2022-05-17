<template>
  <div id="background">
    <h1>Welcome to Manage Product, {{ this.user[0].name }}!</h1>
    <img alt="Vue log" src="../assets/logo.png" />
  </div>
</template>

<script>
const STORAGE_KEY = "userlog";
export default {
  name: "BackGround",
  data() {
    return {
      user: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]" ),
      url: "../src/img/"
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 30px;
}
</style>
