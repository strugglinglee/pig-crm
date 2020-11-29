<template>
  <a-table
    :columns="columns"
    :data-source="list"
    :pagination.sync="pagination"
    v-on="$listeners"
    size="middle"
    :loading="loading"
    :rowKey="row => row._id"
    :scroll="{ x: 1300 }"
  >
    <template
      slot='date'
      slot-scope="text, record"
    >
      {{record.date|date('YYYY-MM-DD HH:mm')}}
    </template>
    <template
      slot='text'
      slot-scope="text, record"
    >
      <a-tooltip placement="topLeft">
        <template slot="title">
          <span>{{record.text}}</span>
        </template>
        <span>{{record.text}}</span>
      </a-tooltip>
    </template>

    <template
      slot='category'
      slot-scope="text, record"
    >
      <span>{{categoryFilter(record.category)}}</span>
    </template>

    <template
      slot='operate'
      slot-scope="text, record"
    >
      <span class="btns">
        <a-button
          @click="handleEdit(record)"
          class="btn"
          type="link"
        >
          编辑
        </a-button>
        <a-popconfirm
          placement="topLeft"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDel(record)"
        >
          <template slot="title">
            <p>确定删除此文案？</p>
          </template>
          <a-button
            :class="['btn','delBtn']"
            type="link"
          >
            删除
          </a-button>
        </a-popconfirm>
      </span>
    </template>
  </a-table>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    categoryFormat() {
      return this.categories.map(item => {
        return {
          text: item.name,
          value: item.type
        };
      });
    },
    columns() {
      const columns = [
        {
          title: "内容",
          dataIndex: "text",
          fixed: "left",
          width: 200,
          scopedSlots: { customRender: "text" }
        },
        {
          title: "文案分类",
          dataIndex: "category",
          width: 140,
          scopedSlots: { customRender: "category" },
          filters: this.categoryFormat,
          filterMultiple: false,
          onFilter: (value, record) => record
        },
        { title: "作者/来源地", dataIndex: "author" },
        { title: "出处", dataIndex: "origin" },
        {
          title: "修改时间",
          dataIndex: "date",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          fixed: "right",
          width: 140,
          scopedSlots: { customRender: "operate" }
        }
      ];
      return columns;
    }
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDel(row) {
      this.$emit("delete", row);
    },
    categoryFilter(value) {
      const info = this.categories.find(item => item.type === value);
      return info ? info.name : "";
    }
  }
};
</script>


<style lang="scss" scoped>
.btns {
  display: inline-flex;
}
.btn {
  margin-right: 12px;
  padding: 0;
}
.delBtn {
  color: #ff4d4f;
}
</style>
