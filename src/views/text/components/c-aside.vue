<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      :closable="false"
      width="400"
      :visible="visible"
      @close="onClose"
    >
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
      >
        <a-form-model-item
          has-feedback
          label="文案内容"
          prop="text"
        >
          <a-textarea
            v-model="ruleForm.text"
            placeholder="请输入文案内容"
            :auto-size="{ minRows: 4, maxRows: 8 }"
          />
        </a-form-model-item>

        <a-form-model-item
          has-feedback
          label="文案分类"
          prop="category"
        >
          <a-select
            placeholder="请选择文案分类"
            v-model="ruleForm.category"
          >
            <a-select-option
              v-for="item in categories"
              :key="item._id"
              :value="item.type"
            >
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          has-feedback
          label="作者/来源地"
          prop="author"
        >
          <a-input
            v-model="ruleForm.author"
            placeholder="请输入作者/来源地,如：李白/网易云音乐热评"
          />
        </a-form-model-item>

        <a-form-model-item
          has-feedback
          label="出处"
          prop="origin"
        >
          <a-input
            v-model="ruleForm.origin"
            placeholder="请输入文案来源：歌曲名称/书名"
          />
        </a-form-model-item>
      </a-form-model>

      <div class="bottomBtns">
        <a-button
          :style="{ marginRight: '8px' }"
          @click="onClose"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          @click="handleOk"
        >
          确定
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { addText, updateText } from "../../../api/text";
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      model: {},
      type: "add",
      ruleForm: {
        text: "",
        author: "",
        origin: "",
        category: ""
      },
      rules: {
        text: [{ trigger: "blur", required: true, message: "请输入文案内容" }],
        category: [
          {
            trigger: "blur",
            required: true,
            message: "请选择文案分类"
          }
        ]
      }
    };
  },
  computed: {
    title() {
      const titleInfo = {
        add: "添加文案",
        edit: "编辑文案"
      };
      return titleInfo[this.type];
    }
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    open(model, type = "add") {
      if (model) {
        this.ruleForm = Object.assign(this.ruleForm, model);
      } else {
        this.ruleForm = {
          text: "",
          author: "",
          origin: "",
          category: ""
        };
      }
      this.type = type;
      this.visible = true;
    },
    handleOk() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) return false;
        try {
          this.confirmLoading = true;
          let res = {};
          if (this.type === "add") {
            res = await addText(this.ruleForm);
          } else if (this.type === "edit") {
            res = await updateText(this.ruleForm);
          }
          this.visible = false;

          this.resetForm("ruleForm");
          this.confirmLoading = false;

          if (res.errormsg) {
            this.$message.warning(res.errormsg);
            return;
          }
          this.$emit("success");
          this.$message.success("操作成功");
        } catch (e) {
          e.errormsg && this.$message.warning(e.errormsg);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="scss" scoped>
.bottomBtns {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
</style>

