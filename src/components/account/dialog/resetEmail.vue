<script setup >
import {ref,watch,defineProps, defineEmits} from "vue";
import {ElDialog} from "element-plus";
import common_util from "@/util/common_util.js"
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
const dialogVisible=ref(props.visible);
const emits=defineEmits(['close','submit'])
// 监听 props 的 visible 变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
});

const formData=ref({
  oldEmail:"",
  newEmail:"",
  confirmEmail:""
})



// 处理关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
  emits('close');
};

// 处理提交表单
const handleSubmit = () => {
  common_util.post(`http://localhost:8080/accounts/${props.userId}/email`,
      {},
      {newEmail:formData.value.newEmail},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      ()=>{
      }
  )
  emits('submit',formData.value)
  handleClose();
};
</script>

<template>
  <el-dialog v-model="dialogVisible" center title="修改邮箱" width="500px" @close="handleClose">
    <el-form ref="formRef" :model="formData" label-width="100px" status-icon>


      <el-form-item label="原邮箱" prop="oldEmail">
        <el-input
            v-model="formData.oldEmail"
            autocomplete="new-Email"
            placeholder="请输入原邮箱"
        />
      </el-form-item>


      <el-form-item label="新邮箱" prop="newEmail">
        <el-input
            v-model="formData.newEmail"
            autocomplete="new-Email"
            placeholder="请输入新邮箱"
        />
      </el-form-item>

      <el-form-item label="确认邮箱" prop="confirmEmail">
        <el-input
            v-model="formData.confirmEmail"
            autocomplete="new-Email"
            placeholder="请再次输入新邮箱"
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