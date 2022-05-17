<template>
  <div class="login">
    <el-card>
      <h1>Login Form</h1>
      <el-form
        ref="form"
        :model="model"
        class="login-form"
        :rules="rules"
        @submit.prevent="log"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            placeholder="Username"
            prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            :type="!status ? 'password' : 'text'"
            prefix-icon="Lock"
          >
            <template #suffix>
              <el-icon
                @click="show()"
                class="icon-hide"
                :style="{ display: !status ? 'inline' : 'none' }"
                ><hide
              /></el-icon>
              <el-icon
                @click="show()"
                class="icon-show"
                :style="{ display: status ? 'inline' : 'none' }"
                ><View
              /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
      <router-link to="/register">Already to register? Register</router-link>
    </el-card>
  </div>
</template>

<script>
const STORAGE_KEY = "userlog";
export default {
  name: "LoginUser",
  data() {
    return {
      user: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
      status: false,
      model: {
        username: "",
        password: "",
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur",
          },
          {
            min: 4,
            message: "Username length should be at least 4 characters",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur" },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    show() {
      if (this.status === false) {
        this.status = true;
      } else {
        this.status = false;
      }
    },
    simulateLogin() {
      return new Promise(resolve => {
        setTimeout(resolve, 800);
      });
    },
    async log() {
      let valid = await this.$refs.form.validate();
      console.log(this.user);
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (localStorage.getItem("userlog") === null) {
        this.$message.error("Please Register your acount after Login!");
        this.model.username = "";
        this.model.password = "";
        return
      } else {
        if (
          this.model.username === this.user[0].name &&
          this.model.password === this.user[0].password
          && this.user[0].statusOfLogin === false
        ) {
          this.$message.success("Login successfull");
          this.$router.push("/homemanage");
          this.user[0].statusOfLogin = true;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
        } else {
          this.$message.error("Username or password is invalid");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 450px;
  text-align: center;
  margin: 240px auto;

  & el-card {
    width: 100%;

    & .login-form {
      width: 100%;
    }
  }
}

a {
  text-decoration: none;
  color: rgb(86, 147, 228);

  &:hover {
    color: rgb(42, 123, 230);
  }
}

h1 {
  color: brown;
  size: 30px;
}

el-input {
  width: 100%;

  &#suffix-icon:hover {
    cursor: pointer;
  }
}

.button {
  width: 100%;
  margin-top: 40px;

  & .login-button {
    width: 100%;
  }
}

.icon-show,
.icon-hide:hover {
  cursor: pointer;
}
.icon-show {
  display: none;
}
</style>
