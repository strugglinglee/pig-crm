<template>
  <div>
    <div class="topHead">
      <span></span>
      <span>
        <a-button
          type="primary"
          @click="addCategory"
        >
          添加分类
        </a-button>
      </span>
    </div>
    <cTable
      :list="list"
      @change="pageChange"
      :loading="tableLoading"
      @delete="delCategory"
      @edit="editCategory"
      :pagination.sync="pagination"
    />
    <editModal
      ref="editModal"
      @success="getCategoryList"
    />
  </div>
</template>

<script>
import cTable from "./components/c-table.vue";
import { getCategoryList, deleteCategory } from "../../api/category";
import editModal from "./components/edit-modal.vue";

export default {
  components: {
    cTable,
    editModal
  },
  data() {
    return {
      list: [],
      query: {
        pageSize: 10,
        page: 1
      },
      pagination: {
        pageSize: 10,
        total: 0
      },
      tableLoading: false
    };
  },
  methods: {
    addCategory() {
      this.$refs.editModal.open();
    },
    async getCategoryList() {
      try {
        this.tableLoading = true;
        const res = await getCategoryList(this.query);
        this.list = res.response;
        this.pagination.total = res.total;
        this.tableLoading = false;
      } catch (e) {
        e.errormsg && this.$message.warning(e.errormsg);
      }
    },
    pageChange({ current }) {
      this.query.page = current;
      this.getCategoryList();
    },
    async delCategory({ _id }) {
      try {
        await deleteCategory(_id);
        this.$message.success("删除成功");
        this.getCategoryList();
      } catch (e) {
        e.errormsg && this.$message.warning(e.errormsg);
      }
    },
    async editCategory(info){
      this.$refs.editModal.open(info,'edit');
    }
  },
  async created() {
    this.getCategoryList();
  }
};
</script>

<style lang="scss" scoped>
.topHead {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>