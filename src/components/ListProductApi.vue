<template>
  <div id="listProduct">
    <h1 style="text-align: center; font-size: 30px">List Product API</h1>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column type="index" width="100" label="Order" align="center" />
      <el-table-column label="Serial" prop="id" align="center" width="220" />
      <el-table-column label="Name" prop="name" align="center" width="380" />
      <el-table-column label="Price ($)" prop="price" align="center" />
      <el-table-column label="Quantity" prop="quantity" align="center" />
      <el-table-column align="center" width="180">
        <template #header>
          <el-button @click="passNewProductApi" type="primary" size="small"
            >Add New Product API</el-button
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
            @confirm="confirmDelete(filterTableData[scope.$index].id)"
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
export default {
  name: "ListProductApi",
  data() {
    return {
      data: null,
    }
  },

  mounted() {
    this.$store.dispatch("getProducts");
  },

  computed: {
    ...mapState(["productsAPI"]),
    filterTableData() {
      return this.productsAPI;
    },
  },

  methods: {
    confirmDelete(id) {
      this.$store.dispatch("deleteProductAPI", id);
      setTimeout(() => {
        this.$message.success("Delete Successfull!");
      }, 500);
    },

    confirmEdit(index) {
      let id = this.productsAPI[index].id;
      this.$router.push({
        path: "/homemanage/editproductapi",
        query: { id: id },
      });
    },

    cancel() {
      this.$message.error("Cancel Successfull!");
    },

    passNewProductApi() {
      this.$router.push("/homemanage/newproductapi");
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
