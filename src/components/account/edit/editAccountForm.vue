<script setup>

import {ref,onMounted,getCurrentInstance,defineProps} from "vue";
import accountService from "@/service/accountService.js";
import common_util from "@/util/common_util.js";
import {ElMessage} from "element-plus";
const props=defineProps({
  userId:{
    type:String,
    required:true
  }
})
// 获取上下文
const{appContent} =getCurrentInstance()
const sharedData = ref({
  userid: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  phone: '',
  gender: '',
  age: '',
  addr1: '',
  addr2: '',
  avatar_url: 'default'
});
const getAccountInfo = async () => {
  common_util.get(
      `http://localhost:8080/accounts/${props.userId}`,
      {},
      (data)=>{
        sharedData.value = {
          ...sharedData.value, // 保留初始结构
          ...data          // 覆盖有效字段
        };
      })
};
const updateInfo = () => {
  accountService.updateAccount(sharedData.value);
  ElMessage({message:"修改信息成功",type:"success"},appContent)
}

//异步获取用户数据
onMounted(
  getAccountInfo
  );
</script>

<template>
  <div >
    <form  method="post" class="form-card"  @submit.prevent="updateInfo">
      <h3 class="table-title1">User Information</h3>

      <div class="form-group">
        <label>User ID:</label>
        <input v-model="sharedData.userid"
               type="text"
               class="form-input"
               disabled="disabled"
               placeholder="Enter username"
               >
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="sharedData.email"
               type="text"
               class="form-input"
               disabled="disabled"
               placeholder="Enter username"
        >
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text"
               class="form-input"
               name="account.username"
               v-model="sharedData.username"
               placeholder="your username"
        >
      </div>

      <h3 class="table-title1">ACCOUNT INFORMATION</h3>

      <!-- 联系方式分组 -->
      <div class="form-section">
        <div class="form-group">
          <label>Phone:</label>
          <input type="tel"
                 class="form-input"
                 name="account.phone"
                 v-model="sharedData.phone"
                 placeholder="1234567890"
          >
<!--          <p v-if="phoneMsg" class="error-msg">{{ phoneMsg }}</p>-->
        </div>

        <div class="form-group">
          <label>Address 1:</label>
          <input type="text"
                 class="form-input"
                 name="account.address1"
                 v-model="sharedData.addr1"
                 placeholder="Street address">
        </div>

        <div class="form-group">
          <label>Address 2:</label>
          <input type="text"
                 class="form-input"
                 name="account.address2"
                 v-model="sharedData.addr2"
                 placeholder="Apartment/Unit">
        </div>
      </div>

      <!-- 个人信息分组 -->
      <div class="form-section">
        <div class="form-group">
          <label>Age:</label>
          <input type="number"
                 class="form-input"
                 name="account.age"
                 v-model="sharedData.age"
                 min="10"
                 max="100"
                 placeholder="Enter your age">
        </div>

        <div class="form-group">
          <label>Gender:</label>
          <el-radio-group v-model="sharedData.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </div>
      </div>
      <input type="submit" class="submit-btn" name="newAccount" value="Save Account Information"/>

    </form>
  </div>

</template>

<style scoped>

</style>