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
            <p>确定删除此分类？</p>
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
const columns = [
  { title: "分类名", dataIndex: "name", fixed: "left" },
  { title: "标识符", dataIndex: "type" },
  {
    title: "修改时间",
    dataIndex: "date",
    scopedSlots: { customRender: "date" }
  },
  { title: "修改人", dataIndex: "user" },
  {
    title: "操作",
    dataIndex: "operation",
    fixed: "right",
    width: 140,
    scopedSlots: { customRender: "operate" }
  }
];

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
    }
  },
  data() {
    return {
      columns
    };
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDel(row) {
      this.$emit("delete", row);
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
