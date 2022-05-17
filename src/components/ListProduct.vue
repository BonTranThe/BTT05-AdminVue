<template>
  <div id="listProduct">
    <h1 style="text-align: center; font-size: 30px">List Product</h1>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Serial" prop="id" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Price ($)" prop="price" />
      <el-table-column label="Quantity" prop="quantity" />
      <el-table-column align="right">
        <template #header>
          <el-button @click="passNewProduct" type="primary" size="small"
            >Add New Product</el-button
          >
        </template>
        <template #default="scope">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to edit this product?"
            @confirm="confirmEdit(scope.$index)"
            @cancel="cancel"
          >
            <template #reference>
              <el-button size="small">Edit</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to delete this product?"
            @confirm="confirmDelete(scope.$index)"
            @cancel="cancel"
          >
            <template #reference>
              <el-button type="danger" size="small">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
const STORAGE_KEY = "listProduct";
export default {
  name: "ListProduct",
  computed: {
    ...mapState(["products"]),
    filterTableData() {
      return this.products;
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
    confirmDelete(index) {
      this.products.splice(index, 1);
      this.$message.success("Delete Successfull!");
    },
    confirmEdit(index) {
      let id = this.products[index].id;
      this.$router.push({
        path: "/homemanage/editproduct",
        query: { id: id },
      });
    },
    cancel() {
      this.$message.error("Cancel Successfull!");
    },
    passNewProduct() {
      this.$router.push("/homemanage/newproduct");
    },
  },
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.edit {
  margin-right: 14px;
}
</style>
