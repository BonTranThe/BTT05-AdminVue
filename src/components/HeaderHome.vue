<template>
  <div id="headerHome">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="gray"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-sub-menu index="1" style="margin-left: 1459px">
        <template #title>Hi, {{ this.user[0].name }}</template>
        <el-menu-item index="1-3">Profile</el-menu-item>
        <el-menu-item index="1-4" @click="logout">Log out</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
const STORAGE_KEY = "userlog";
export default {
  name: "HeaderHome",
  data() {
    return {
      user: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
    }
  },
  methods: {
    logout() {
      const statusLogout = false;
      this.user[0].statusOfLogin = statusLogout;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.headerHome {
  margin: -200px 0;
}
</style>
