<script setup>
import common_util from "@/util/common_util.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
const router=useRouter()
const isLoading=ref(true)
function getQueryParam() {
  const url=window.location.href;
  const regex = /[?&]token=([^&]+)/;  // 匹配 token 后面的值
  const match = url.match(regex);
  let token = match[1];
  console.log(token)
  common_util.storeAccessToken(token);

  setTimeout(() => {
    router.replace('/account/edit');
    isLoading.value = false; // 操作完成后，将 isLoading 设置为 false，隐藏加载动画
  }, 3000);
}
getQueryParam();

</script>
<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-content">
      <p class="animated-text">Welcome to our bakery</p>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style scoped>
/* 整体容器样式 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  /* 设置倾斜的线性渐变背景 */
  background-image: linear-gradient(135deg, #1a3766, #f78daa);
  background-size: 200% 200%;
  /* 应用动画 */
  animation: gradientAnimation 10s ease infinite;
}

/* 加载内容样式 */
.loading-content {
  text-align: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

/* 旋转加载器样式 */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #a7727d; /* 更突出的颜色 */
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  margin: 20px auto; /* 居中显示 */
}

/* 旋转动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 文字淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px); /* 从上方淡入 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 动画文字样式 */
.animated-text {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* 更美观的字体 */
  font-size: 24px;
  color: #a7727d; /* 与加载器颜色匹配 */
  animation: fadeIn 1s ease-out;
}


/* 定义动画 */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>