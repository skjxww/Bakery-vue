<script setup >
import "@/assets/loginForm.css"
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
    email: "491825969@qq.com",
    password: "Jj2ee"
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
            router.replace({path:"/account/edit"})
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

</style>
