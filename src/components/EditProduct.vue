<template>
  <div id="editproduct">
    <el-card>
      <h1>Edit Product Form</h1>
      <el-form ref="form" :model="productEdit" class="editproduct-form" :rules="rulesProduct">
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="productEdit.name"
            :model-value="productEdit.name"
            placeholder="Name Product"
            prefix-icon="ShoppingBag"
          ></el-input>
        </el-form-item>
        <el-form-item prop="price">
          <el-input
            type="number"
            v-model="productEdit.price"
            :model-value="parseInt(productEdit.price)"
            placeholder="Price ($)"
            prefix-icon="Wallet"
          ></el-input>
        </el-form-item>
        <el-form-item prop="quantity">
          <el-input
            type="number"
            v-model="productEdit.quantity"
            :model-value="productEdit.quantity"
            placeholder="Quantity"
            prefix-icon="Grid"
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button
            class="addItem-button"
            type="primary"
            @click="saveItem"
            >Save Product</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex';
const STORAGE_KEY = "listProduct";
export default {
  name: "EditProduct",
  data() {
    return {
      rulesProduct: {
        name: [
          {
            required: true,
            message: "Name of product is required",
            trigger: "blur",
          },
          {
            min: 4,
            message: "Name of product length should be at least 4 characters",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "Price (number) is greater than or equal 1$",
            trigger: "blur",
          },
          {
            min: 1,
            message: "Price length should be at least 1 characters",
            trigger: "blur",
          },
        ],
        quantity: [
          {
            required: true,
            message: "Quantity (number) is greater than or equal 1",
            trigger: "blur",
          },
          {
            min: 1,
            message: "Quantity length should be at least 1 characters",
            trigger: "blur",
          },
        ],
      },
    }
  },
  computed: {
    ...mapState(["products"]),
    productEdit() {
      return this.products.find(product => product.id == this.$route.query.id);
    },
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
    saveItem() {
      let eleForm = this.$refs.form;
      let valid = eleForm.validate();
      if (!valid) {
        return;
      }
      if (
        this.productEdit.name === "" ||
        this.productEdit.price === "" ||
        this.productEdit.quantity === ""
      ) {
        this.$message.error("Please fill out fully to add new product!");
        return;
      } else {
        this.$message.success("Edit Item Successfull!");
        this.$router.push("/homemanage/listproduct");
      }
    },
  },
}
</script>

<style lang="scss">
#editproduct {
  max-width: 450px;
  text-align: center;
  margin: 200px auto;

  & el-card {
    width: 100%;

    & .editproduct-form {
      width: 100%;
    }
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
</style>
