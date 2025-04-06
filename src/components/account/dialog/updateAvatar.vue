<script setup>
import { ref, watch } from "vue";
import { ElDialog } from "element-plus";
import common_util from "@/util/common_util"
// eslint-disable-next-line no-undef
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

// eslint-disable-next-line no-undef
const emits = defineEmits(['close', 'submit'])
const dialogVisible = ref(props.visible);
const formData = ref({
  // 新增图片文件字段
  imageFile: "",
  // 新增图片预览 URL 字段
  imagePreview: ""
})

// 监听 props 的 visible 变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal;
});

// 处理文件选择事件
const handleFileChange = (event) => {
  const input = event.target;
  if (input.files && input.files.length > 0) {
    formData.value.imageFile = input.files[0];
    // 创建图片预览 URL
    const reader = new FileReader();
    reader.onload = () => {
      formData.value.imagePreview = reader.result;
    };
    reader.readAsDataURL(formData.value.imageFile);
  }
};

// 处理关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
  emits('close');
};

// 处理提交表单
const handleSubmit = () => {

  common_util.internalPost(
      `/accounts/${props.userId}/avatar`,
      {file:formData.value.imageFile},
      common_util.moreHeader('multipart/form-data'),
      {},
      ()=>{emits('submit', formData.value);
      }
  )

  handleClose();
};
</script>

<template>
  <el-dialog v-model="dialogVisible" center title="修改头像" width="500px" @close="handleClose">
    <el-form ref="formRef" :model="formData" label-width="100px" status-icon>
      <!-- 文件上传输入框 -->
      <el-form-item label="选择图片">
        <input type="file" @change="handleFileChange" accept="image/*">
      </el-form-item>
      <!-- 图片预览 -->
      <el-form-item label="图片预览">
        <img v-if="formData.imagePreview" :src="formData.imagePreview" alt="预览图片" style="max-width: 100%;">
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交修改</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>