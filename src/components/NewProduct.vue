<template>
  <div id="newproduct">
    <el-card>
      <h1>Add New Product Form</h1>
      <el-form
        ref="form"
        :model="product"
        class="newproduct-form"
      >
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="product.name"
            placeholder="Name Product"
            prefix-icon="ShoppingBag"
          ></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input
            type="number"
            v-model="product.price"
            placeholder="Price ($)"
            prefix-icon="Wallet"
          ></el-input>
        </el-form-item>
        <el-form-item prop="quantity">
          <el-input
            type="number"
            v-model="product.quantity"
            placeholder="Quantity"
            prefix-icon="Grid"
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button
            :loading="loading"
            class="addItem-button"
            type="primary"
            native-type="submit"
            @click="addItem"
            >Add Product</el-button
          >
        </el-form-item>
      </el-form>
      <router-link to="/homemanage/listproduct">Go to List Product</router-link>
    </el-card>
  </div>
  <div class="modal" v-if="showModal">
    <transition name="fade" appear>
      <div class="modal-overlay"></div>
    </transition>
    <transition name="slide" appear>
      <div class="alert">
        <p>Add New Product Successfull!</p>
        <el-button type="primary" @click="showModal = false">Close</el-button>
      </div>
    </transition>
  </div>
</template>

<script>
const STORAGE_KEY = "listProduct";
export default {
  name: "NewProduct",
  data() {
    return {
      showModal: false,
      products: this.$store.state.products,
      product: this.$store.state.product,
      loading: false,
    };
  },
  watch: {
    products: {
      handler(products) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      },
      deep: true,
    },
  },
  methods: {
    addItem(e) {
      let eleForm = this.$refs.form;
      let valid = eleForm.validate();
      if (
        !valid ||
        this.product.name === "" ||
        this.product.price === "" ||
        this.product.quantity === ""
      ) {
        this.loading = true;
        setTimeout(() => (this.loading = false), 3000);
        e.preventDefault();
        this.$message.error("Please fill out fully to add new product!");
        return;
      } else {
        this.loading = true;
        setTimeout(() => (this.loading = false), 1900);
        e.preventDefault();
        this.products.push({
          id: Date.now(),
          name: this.product.name,
          price: this.product.price,
          quantity: this.product.quantity,
        });
        setTimeout(() => {
          this.showModal = true;
          this.product.name = "";
          this.product.price = "";
          this.product.quantity = "";
        },2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#newproduct {
  position: relative;
  max-width: 450px;
  text-align: center;
  margin: 200px auto;

  & el-card {
    width: 100%;

    & .newproduct-form {
      width: 100%;
    }
  }
}

a {
  text-decoration: none;
  color: rgb(77, 130, 209);
  font-style: italic;
  transition: 0.5s all;
  font-weight: 600;

  &:hover {
    color: rgb(5, 67, 160);
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

h1 {
  color: brown;
  font-size: 30px;
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

  & .addItem-button {
    width: 100%;
  }
}

.modal-overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.alert {
  position: absolute;
  z-index: 3;
  background-color: #fff;
  width: 300px;
  height: 100px;
  border: 2px solid rgb(43, 40, 40);
  border-radius: 5px;
  top: 420px;
  left: 870px;
}
</style>
