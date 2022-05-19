<template>
  <div id="editproduct">
    <el-card>
      <h1>Edit Product API Form</h1>
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
            :loading="loading"
            class="addItem-button"
            type="primary"
            @click="saveItem"
            @keyup.enter="saveItem"
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
  name: "EditProductApi",
  data() {
    return {
      loading: false,
      rulesProduct: {
        name: [
          {
            required: true,
            message: "Name of product is required",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "Price (number) is greater than or equal 1$",
            trigger: "blur",
          },
        ],
        quantity: [
          {
            required: true,
            message: "Quantity (number) is greater than or equal 1",
            trigger: "blur",
          },
        ],
      },
    }
  },
  computed: {
    ...mapState(["productsAPI"]),
    productEdit() {
      return this.productsAPI.find(product => product.id == this.$route.query.id);
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
        this.$store.dispatch("editProductAPI", this.productEdit);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$message.success("Edit Item Successfull!");
          this.$router.push("/homemanage/listproductapi");
        }, 1000);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
