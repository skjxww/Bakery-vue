<script setup>
// 引入 CSS 文件
import "@/assets/loginForm.css";

// 引入工具和服务模块
import common_util from "@/util/common_util.js";
// 引入 Vue 相关的 API
import { ref} from "vue";
import { useRouter } from "vue-router";
// 引入 ElementPlus 的组件
import { ElMessage } from 'element-plus';
import {ElButton} from "element-plus";
import {ElForm} from "element-plus"
import {ElFormItem} from "element-plus"
import {ElInput} from "element-plus"
// 定义表单引用
ref();
// 获取路由实例
const router = useRouter();


// 定义验证码变量
let verifyCode = '';
// 定义邮箱验证状态
const isEmailValid = ref(false);
// 定义冷却时间
ref(0);
// 表单验证回调函数
const onValidate = (prop, isValid) => {
  if (prop === 'email') {
    isEmailValid.value = isValid;
  }
};

// 定义邮箱登录表单数据
const loginByEmail = ref({
  email: "491825969@qq.com",
  password: "",
  repeatPassword: "",
  inputVerifyCode: ""
});

// 定义重复密码验证函数
const validateRepeatPassword = (rule, value, callback) => {
  if (value === loginByEmail.value.password) {
    callback();
  } else {
    callback(new Error('两次输入的密码不一致'));
  }
};

// 定义密码验证函数
const validatePassword = (rule, value, callback) => {
  if (common_util.check(loginByEmail.value.password, "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+")) {
    callback();
  } else {
    callback(new Error("请输入含大小写字母、数字的密码"));
  }
};

// 定义表单验证规则
const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 4, message: '密码至少为 4 个字符', trigger: 'blur' },
    { max: 20, message: '密码至多为 20 个字符', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  inputVerifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  repeatPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateRepeatPassword, trigger: ['blur', 'change'] }
  ]
};

// 发送验证码函数
function sendCode() {
  common_util.post("/auth/emailCode",
      {},
      {
        email: loginByEmail.value.email,
        username: "Our User"
      },
      (data) => {
        verifyCode = data;
        console.log("data" + data);
        console.log("verifyCode", verifyCode);
      });
}

// 登录函数
function login() {
  if (verifyCode === loginByEmail.value.inputVerifyCode) {
    ElMessage({ message: "重置成功成功", type: "success" });
    router.push("login");
    // loginUser();
  } else {
    console.log("login:verifyCode" + verifyCode);
    console.log("loginByEmail.inputVerifyCode" + loginByEmail.value.inputVerifyCode);
    ElMessage({ message: "验证码错误", type: "warning" });
  }
}

// 提交状态
const isSubmitting = ref(false);
</script>

<template>
  <div class="accountContainer">
    <el-form class="form-card" @submit.prevent="login()" :model="loginByEmail" :rules="rules" @validate="onValidate" >
      <div class="table-title1" style="padding-bottom: 50px">EMAIL VERIFICATION</div>
      <el-form-item label="Email" label-position="left" label-width="130px" prop="email">
        <el-input
            v-model="loginByEmail.email"
            class="form-input"
            placeholder="name@example.com"
            required
        >
        </el-input>
      </el-form-item>
      <el-form-item label="password" label-position="left" label-width="130px" prop="password">
        <el-input
            v-model="loginByEmail.password"
            type="password"
            class="form-input"
            placeholder="At least 6 characters"
            required
        ></el-input>
      </el-form-item>

      <el-form-item label="repeatPassword" label-position="left" label-width="130px" prop="repeatPassword">
        <el-input
            v-model="loginByEmail.repeatPassword"
            type="password"
            class="form-input"
            placeholder="Re-enter password"
            :rules="[{ required: true, message: '请再次输入密码', trigger: 'blur' }, { validator: validateRepeatPassword, trigger: 'blur' }]"
            required
        ></el-input>
      </el-form-item>

      <el-form-item label="inputVerifyCode" label-position="left" label-width="130px" prop="inputVerifyCode">
        <el-input
            type="text"
            class="form-input"
            placeholder="Enter code"
            required
            v-model="loginByEmail.inputVerifyCode"
        >
          <!-- 使用 append 插槽将按钮拼接在输入框后面 -->
          <template #append>
            <el-button  @click="sendCode">SendCode</el-button>
          </template>
        </el-input>
      </el-form-item>
      <button type="submit"
              class="submit-btn"
              :disabled="isSubmitting">
        {{ isSubmitting ? 'Processing...' : 'Continue' }}
      </button>
      <div class="links">
        <router-link to="/welcome/login" class="link-item">Password Login</router-link>|
        <router-link to="/welcome/register" class="link-item">Register</router-link>
      </div>
    </el-form>
  </div>
</template>
<style scoped>

</style>