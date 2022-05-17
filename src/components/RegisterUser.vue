<template>
  <div class="register">
    <el-card>
      <h1>Register Form</h1>
      <el-form ref="form" :model="model" class="register-form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="model.username"
            placeholder="Username"
            prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="email"
            v-model="model.email"
            placeholder="Email"
            prefix-icon="Postcard"
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
                ref="iconDisplay"
                @click="show()"
                class="icon-hide"
                :style="{ display: !status ? 'inline' : 'none' }"
                ><hide
              /></el-icon>
              <el-icon
                ref="iconDisplay"
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
            class="register-button"
            type="primary"
            native-type="submit"
            @click="submitForm"
            >Register</el-button
          >
        </el-form-item>
      </el-form>
    <router-link to="/">Already to login? Login</router-link>
    </el-card>
  </div>
</template>

<script>
const STORAGE_KEY = "userlog";
export default {
  name: "RegisterUser",
  data() {
    return {
      user: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
      status: false,
      model: {
        username: "",
        email: "",
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
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
          {
            min: 11,
            message: "Email length should be at least 11 characters and has '@gmail.com' ",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Password length should be at least 5 characters",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    user: {
      handler(user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      },
      deep: true,
    },
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
      return new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
    },
    async submitForm() {
      let eleForm = this.$refs.form;
      // console.log(typeof eleForm); object or []
      let valid = await eleForm.validate();
      // console.log(typeof valid); boolean
      if (!valid) {
        return;
      }
      this.loading = true;
      await this.simulateLogin();
      this.loading = false;
      if (
        this.model.username === "" ||
        this.model.password === "" ||
        this.model.email === ""
      ) {
        this.$message.error("Please fill out fully to Register your acount!");
      } else {
        this.user.push({
          name: this.model.username,
          email: this.model.email,
          password: this.model.password,
          statusOfLogin: false,
        });
        this.$message.success("Register Successfull!");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  max-width: 450px;
  text-align: center;
  margin: 240px auto;

  & el-card {
    width: 100%;

    & .register-form {
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

  & .register-button {
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
