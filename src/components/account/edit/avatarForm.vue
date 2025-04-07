<script setup >
import { onMounted, ref,defineProps} from "vue";
import ResetAvatar from "@/components/account/dialog/updateAvatar.vue"
import ResetPassword from "@/components/account/dialog/resetPassword.vue";
import ResetEmail from "@/components/account/dialog/resetEmail.vue";
import common_util from "@/util/common_util.js"
import {ElMessage} from "element-plus";
import {ElImage} from "element-plus";
import{ElIcon}from  "element-plus"

import { Picture as IconPicture } from '@element-plus/icons-vue'
import accountService from "@/service/accountService";
import router from "@/router";
const props=defineProps({
  userId:{
    type:String,
    required:true
  }
})

// 分别为三个弹窗设置显示状态
const resetPasswordDialogVisible = ref(false);
const resetEmailDialogVisible = ref(false);
const updateAvatarDialogVisible = ref(false);

//处理头像
const avatarSrc=ref()
const userName=ref()
const initAvatar=()=>{
    common_util.get(`http://localhost:8080/accounts/${props.userId}`,
        {},
        (data)=>{
          avatarSrc.value=data.avatar_url;
          userName.value=data.username;
        }
    )
}
onMounted(initAvatar);

// 打开重置密码弹窗
const openResetPasswordDialog = () => {
  resetPasswordDialogVisible.value = true;
}
// 打开重置邮箱弹窗
const openResetEmailDialog = () => {
  resetEmailDialogVisible.value = true;
}
// 打开更新头像弹窗
const openUpdateAvatarDialog = () => {
  updateAvatarDialogVisible.value = true;
}

// 关闭重置密码弹窗
const handleResetPasswordDialogClose = () => {
  resetPasswordDialogVisible.value = false;
}

// 关闭重置邮箱弹窗
const handleResetEmailDialogClose = () => {
  resetEmailDialogVisible.value = false;
}

// 关闭更新头像弹窗
const handleUpdateAvatarDialogClose = () => {
  updateAvatarDialogVisible.value = false;
}

// 处理表单提交
const handlePasswordReset = () => {
  ElMessage({message:"密码修改成功",type:"success"})
};
const handleEmailReset = () => {
  ElMessage({message:"邮箱修改成功",type:"success"})
};
const handleAvatarSubmit = () => {
  initAvatar()
  ElMessage({message:"上传头像成功",type:"success"})
}
const sighOut=()=>{
  accountService.signOut()
  ElMessage({message:"已退出登录",type:"success"})
  router.replace("/welcome/login")
}
</script>

<template>


    <!-- 左侧用户信息 -->
    <div class="user-panel"  >
      <el-image :src="avatarSrc" alt="用户头像" class="avatar" @click="openUpdateAvatarDialog">
        <template #error>
          <div class="image-slot">
            <el-icon>
              <icon-picture />
            </el-icon>
          </div>
        </template>
      </el-image>

      <div class="user-info">
        <h2 class="user-name" >{{userName}}</h2>
        <nav class="user-links">
          <router-link :to="{ name: 'edit' }" title="查看账号信息">账号信息</router-link>
          <router-link :to="{ name: 'orderList' }" title="查看我的订单">我的订单</router-link>
        </nav>
      </div>

      <div class="links">
        <el-button type="text"  @click="openResetPasswordDialog">Reset Password</el-button>

        <el-button type="text"  @click="openResetEmailDialog">Reset Email</el-button>
      </div>
      <div class="links">
        <el-button type="text"  @click="sighOut">Sign Out</el-button>

      </div>
       </div>
  <reset-avatar :visible="updateAvatarDialogVisible" :user-id="userId" @close="handleUpdateAvatarDialogClose" @submit="handleAvatarSubmit"></reset-avatar>
  <reset-email :visible="resetEmailDialogVisible" :user-id="userId"  @close="handleResetEmailDialogClose" @submit="handleEmailReset"></reset-email>
  <reset-password :visible="resetPasswordDialogVisible" :user-id="userId"  @close="handleResetPasswordDialogClose" @submit="handlePasswordReset"></reset-password>
</template>

<style scoped>
el-image:hover{
  cursor: pointer;
  opacity: 60%;
  transition: opacity ease-in 0.1s;
}
/* 基础容器样式（引用5†） */

/* 左侧用户信息面板（引用7†） */
.user-panel {
  width: 280px;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-height: fit-content;
}

/* 头像样式（引用2†） */
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  margin: 0 auto 20px;
  border: 3px solid #e9ecef;
}

/* 文字信息样式（引用5†） */
.user-info {
  text-align: center;
  margin-bottom: 25px;
}

.user-name {
  font-size: 1.5rem;
  color: #212529;
  margin: 15px 0;
}

.user-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-links a {
  color: #1a3766;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.user-links a:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

/* 右侧表单区域（引用7†） */

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #495057;
}

.form-group input {
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  width: 100%;
}
.links {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* 响应式适配（引用5†） */
@media (max-width: 768px) {

  .user-panel {
    width: 100%;
  }
}
</style>