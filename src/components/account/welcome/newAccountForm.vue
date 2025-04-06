<script setup>
import "@/assets/loginForm.css"
import {getCurrentInstance, ref} from "vue";
import common_util from "@/util/common_util.js";
import accountService from "@/service/accountService.js";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {ElButton} from "element-plus";
import {ElForm} from "element-plus"
import {ElFormItem} from "element-plus"
import {ElInput} from "element-plus"


const sharedData = ref({
  userid: 'J2EEe',
  username: 'J2EEe',
  email: '491825969@qq.com',
  password: 'J2EEe',
  repeatPassword: 'J2EEe',
  phone: '15960671798',
  gender: '0',
  age: '23',
  addr1: '1111',
  addr2: '1111',
  avatar_url: ''
});
const{appContent} =getCurrentInstance()
const formRef=ref(null)
const router=useRouter();
let verifyCode = '';
function signUp(){
  async function signUpAccount(){
    await accountService.signup(sharedData.value);
    ElMessage({message:"注册成功",type:"success"},appContent)
    await router.push("login")
  }
  formRef.value.validate((valid) => {
    if(valid){
      signUpAccount();
    }
    else{
      ElMessage({message:"注册失败,请检查输入信息",type:"warning"})
    }
  })

}// 发送验证码函数
function sendCode() {
  common_util.post("http://localhost:8080/auth/emailCode",
      {},
      {
        email: sharedData.value.email,
        username: "Our User"
      },
      (data) => {
        verifyCode = data;
        console.log("data" + data);
        console.log("verifyCode", verifyCode);
      });
}
// 定义重复密码验证函数
const validateRepeatPassword = (rule, value, callback) => {
  if (value === sharedData.value.password) {
    callback();
  } else {
    callback(new Error('两次输入的密码不一致'));
  }
};
const validatePassword = (rule, value, callback) => {
  if(common_util.check(sharedData.value.password,"(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+")){
    callback();
  }
  else{
    callback(new Error("请输入含大小写字母、数字的密码"));
  }
}
// rules
const rules={
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password:[
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 4, message: '密码至少为 4 个字符', trigger: 'blur' },
    {max:20,message: '密码至多为20个字符',trigger: 'blur' },
    {validator: validatePassword, trigger: 'blur' }
  ],
  inputVerifyCode:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
  repeatPassword:[
    {required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateRepeatPassword, trigger: ['blur', 'change'] },
  ]
}

</script>

<template>
  <div class="accountContainer">
    <!-- 使用 el-form 替换 form -->
    <el-form class="form-card" ref="formRef" :model="sharedData" :rules="rules" @submit.prevent="signUp()">
      <div class="table-title1" style="padding-bottom: 50px">CREATE ACCOUNT</div>

      <!-- 使用 el-form-item 包裹输入框 -->
      <el-form-item label="Username" label-position="left" label-width="130px" prop="username">
        <el-input
            v-model="sharedData.username"
            class="form-input"
            placeholder="Enter username"
        ></el-input>
      </el-form-item>

      <el-form-item label="Email" label-position="left" label-width="130px" prop="email">
        <el-input
            v-model="sharedData.email"
            class="form-input"
            placeholder="name@example.com"
        ></el-input>
      </el-form-item>

      <el-form-item label="Password" label-position="left" label-width="130px" prop="password">
        <el-input
            v-model="sharedData.password"
            type="password"
            class="form-input"
            placeholder="At least 6 characters"
        ></el-input>
      </el-form-item>

      <el-form-item label="Confirm Password" label-position="left" label-width="130px" prop="repeatPassword">
        <el-input
            v-model="sharedData.repeatPassword"
            type="password"
            class="form-input"
            placeholder="Re-enter password"
        ></el-input>
      </el-form-item>


      <el-form-item label="inputVerifyCode" label-position="left" label-width="130px" prop="inputVerifyCode">
        <el-input
            type="text"
            class="form-input"
            placeholder="Enter code"
            required
            v-model="sharedData.inputVerifyCode"
        >
          <!-- 使用 append 插槽将按钮拼接在输入框后面 -->
          <template #append>
            <el-button @click="sendCode" class="sendCode">SendCode</el-button>
          </template>
        </el-input>
      </el-form-item>
      <!-- 使用 el-button 替换 input[type="submit"] -->
      <el-button type="primary" class="submit-btn" @click="signUp()">Register</el-button>

      <div class="links">
        <router-link to="/welcome/login" class="link-item">Password Login</router-link>
        <router-link to="/welcome/forget" class="link-item">Forgot Password</router-link>
      </div>
    </el-form>
  </div>
</template>
<style scoped>

</style>