<template>
  <div>
    <div class="topHead">
      <span></span>
      <span>
        <a-button
          type="primary"
          @click="addText"
        >
          添加文案
        </a-button>
      </span>
    </div>
    <cTable
      :list="list"
      @change="pageChange"
      :loading="tableLoading"
      @delete="delText"
      @edit="editText"
      :categories="categories"
      :pagination.sync="pagination"
    />
    <cAside
      ref="cAside"
      :categories="categories"
      @success="getTextList"
    />
  </div>
</template>

<script>
import cTable from "./components/c-table.vue";
import cAside from "./components/c-aside.vue";
import { getTextList, deleteText } from "../../api/text";
import { getCategoryList } from "../../api/category";

export default {
  components: {
    cTable,
    cAside
  },
  data() {
    return {
      list: [],
      query: {
        pageSize: 10,
        page: 1,
        category: ""
      },
      pagination: {
        pageSize: 10,
        total: 0
      },
      tableLoading: false,
      categories: []
    };
  },
  methods: {
    addText() {
      this.$refs.cAside.open();
    },
    async getTextList() {
      try {
        this.tableLoading = true;
        const res = await getTextList(this.query);
        this.list = res.response;
        this.pagination.total = res.total;
        this.tableLoading = false;
      } catch (e) {
        e.errormsg && this.$message.warning(e.errormsg);
      }
    },
    pageChange({current}, { category }) {
      this.query.category = category.length?category[0]:''
      this.query.page = current;
      this.getTextList();
    },
    async delText({ _id }) {
      try {
        await deleteText(_id);
        this.$message.success("删除成功");
        this.getTextList();
      } catch (e) {
        e.errormsg && this.$message.warning(e.errormsg);
      }
    },
    async editText(info) {
      this.$refs.cAside.open(info, "edit");
    },
    async getCategories() {
      try {
        const res = await getCategoryList({ pageSize: 999 });
        this.categories = res.response;
      } catch (e) {
        e.errormsg && this.$message.warning(e.errormsg);
      }
    }
  },
  async created() {
    this.getTextList();
    this.getCategories();
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