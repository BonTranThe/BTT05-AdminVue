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
        <template #title>Hi, {{isLogin}}</template>
        <el-menu-item index="1-3" >Profile</el-menu-item>
        <el-menu-item index="1-4" @click="logOut">Log out</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "HeaderHome",
  mounted() {
    this.$store.dispatch("getUsers");
  },

  computed: {
    ...mapState(["usersAPI"]),
    isLogin() {
      const current = this.usersAPI.find((user) => user.isLogin == true);
      return current?.username;
    },
    isLogout() {
      const current = this.usersAPI.find((user) => user.isLogin == true);
      return current;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch("logoutUser", this.isLogout.id);
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
