<script setup >
import {ref,watch,defineProps,defineEmits} from "vue";
import {ElDialog} from "element-plus";
import accountService from "@/service/accountService.js"
import {ElButton} from "element-plus";
import {ElForm} from "element-plus"
import {ElFormItem} from "element-plus"
import {ElInput} from "element-plus"
const props=defineProps(
    {
      visible:{
        type:Boolean,
        default:false
      },
      userId:{
        type:String,
        required:true
      }
    }
)

const emits=defineEmits(['close','submit'])
const dialogVisible=ref(props.visible);
const formData=ref({
  oldPassword:"",
  newPassword:"",
  confirmPassword:""
})
// 监听 props 的 visible 变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
});


// 处理关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
  emits('close');
};

// 处理提交表单
const handleSubmit = () => {

  accountService.resetPassword(formData.value.newPassword,props.userId)
  formData.value={
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
  }
  emits('submit', formData.value);
  handleClose();
};
</script>

<template>
  <el-dialog v-model="dialogVisible" center title="修改密码" width="500px" @close="handleClose">
  <el-form ref="formRef" :model="formData" label-width="100px" status-icon>
    <!-- 旧密码字段 -->
    <el-form-item label="原密码" prop="oldPassword">
      <el-input
          v-model="formData.oldPassword"
          type="password"
          show-password
          autocomplete="new-password"
          placeholder="请输入原密码"
      />
    </el-form-item>

    <!-- 新密码字段 -->
    <el-form-item label="新密码" prop="newPassword">
      <el-input
          v-model="formData.newPassword"
          type="password"
          show-password
          autocomplete="new-password"
          placeholder="请输入新密码"
      />
    </el-form-item>

    <!-- 确认新密码 -->
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
          v-model="formData.confirmPassword"
          type="password"
          show-password
          autocomplete="new-password"
          placeholder="请再次输入新密码"
      />
    </el-form-item>
  </el-form>
    <template #footer>
      <el-button  @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交修改</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>