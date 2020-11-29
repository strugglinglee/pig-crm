<template>
  <div>
    <a-modal
      v-model="visible"
      :title="title"
      cancelText="取消"
      okText="确定"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
    >
      <a-form-model
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item
          has-feedback
          label="分类名称"
          prop="name"
        >
          <a-input
            v-model="ruleForm.name"
            placeholder="请输入分类名称"
            style="width:300px"
          />
        </a-form-model-item>

        <a-form-model-item
          has-feedback
          label="分类标识"
          prop="type"
        >
          <a-input
            v-model="ruleForm.type"
            :disabled="type==='edit'"
            style="width:300px"
            placeholder="请输入英文或者数字组成的分类标识符号，如AHDY"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { addCategory, updateCategory } from "../../../api/category";

export default {
  data() {
    let validateType = (rule, value, callback) => {
      if (!value || !/^[a-zA-Z0-9]+$/.test(value)) {
        callback(new Error("请输入英文或者数字组成的分类标识符号，如AHDY"));
      } else if (value && value.length > 10) {
        callback(new Error("长度不能超过10"));
      }
      callback();
    };
    return {
      visible: false,
      type: "add",
      ruleForm: {
        name: "",
        type: ""
      },
      rules: {
        name: [{ trigger: "blur", required: true, message: "请输入分类名称" }],
        type: [
          {
            trigger: "blur",
            validator: validateType,
            required: true,
            message: "请输入英文或者数字组成的分类标识符号，如AHDY"
          }
        ]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      confirmLoading: false
    };
  },
  computed: {
    title() {
      const titleInfo = {
        add: "添加分类",
        edit: "编辑分类"
      };
      return titleInfo[this.type];
    }
  },
  methods: {
    open(model, type = "add") {
      if (model) {
        this.ruleForm = Object.assign(this.ruleForm, model);
      } else {
        this.ruleForm = {
          name: "",
          type: ""
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
            res = await addCategory(this.ruleForm);
          } else if (this.type === "edit") {
            res = await updateCategory(this.ruleForm);
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
