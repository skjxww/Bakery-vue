<script setup >
import { ref} from "vue";
import {useRouter} from "vue-router";
import common_util from "@/util/common_util.js";
import {ElMessage} from "element-plus";
import {ElButton} from "element-plus";
import {ElForm} from "element-plus"
import {ElFormItem} from "element-plus"
import {ElInput} from "element-plus"
const router = useRouter();

  const user=ref({
    email: "491832169@qq.com",
    password: "J2EEe"
  })
  // rules
  const rules={
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    password:[
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
  }
  function login(){
      common_util.internalPost('http://localhost:8080/auth/email',
          {password:user.value.password},
          {},
          {
            email:user.value.email
          },
          (data)=>{
            common_util.storeAccessToken(data.token)
            ElMessage({message:"登录成功",type:"success"})
            router.replace({path:"/category"})
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          ()=>{

      },()=>{
            ElMessage({message:"登录失败，请检查邮箱和密码",type:"warning"})
          }
      )
  }
  function githubLogin(){
    window.location.href="http://localhost:8080/oauth2/authorization/github"
  }
</script>
<template>
  <div class="accountContainer">
    <!-- 使用 el-form 替换 form -->
    <el-form class="form-card" :model="user" :rules="rules" @submit.prevent="login()">
      <div class="table-title1 table-title" style="padding-bottom: 50px">LOGIN</div>
      <!-- 使用 el-form-item 包裹输入框 -->
      <el-form-item label="Email" label-position="left" label-width="130px" prop="email">
        <el-input
            v-model="user.email"
            class="form-input"
            placeholder="邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="Password" label-position="left" label-width="130px" prop="password">
        <el-input
            v-model="user.password"
            type="password"
            class="form-input"
            placeholder="密码"
        ></el-input>
      </el-form-item>
      <!-- 使用 el-button 替换 button -->
      <el-button type="primary" class="submit-btn" @click="login()">Login</el-button>
      <div class="links">

        <router-link to="/welcome/register" class="link-item">Register</router-link>|
        <router-link to="/welcome/forget" class="link-item">ForgetPassWord</router-link>

      </div>
      <div class="links"><el-button type="text"  @click="githubLogin">GithubLogin</el-button></div>

    </el-form>

  </div>
</template>

<style scoped>
/* 整体容器样式 */
.accountContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 100px;
}

/* 表单卡片样式 */
.form-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}


/* 表单输入框样式 */
.form-input {
  height: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

/* 表单输入框聚焦样式 */
.form-input:focus {
  border-color: #007bff;
  outline: none;
}

/* 提交按钮样式 */
.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #1a3766;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

/* 提交按钮悬停样式 */
.submit-btn:hover {
  background: #f78daa;
}

/* 链接组样式 */
.links {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* 链接项样式 */
.link-item {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

/* 链接项悬停样式 */
.link-item:hover {
  color: #0056b3;
}
</style>
