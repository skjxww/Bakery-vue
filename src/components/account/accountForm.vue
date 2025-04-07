<script setup>
import AvatarForm from "@/components/account/edit/avatarForm.vue";
import common_util from "@/util/common_util.js";
import {onMounted, ref} from "vue";
// 传值问题userId
const userId=ref(0)
const isLoaded=ref(false)
const getUserId=async ()=>{
  common_util.get(
      'http://localhost:8080/accounts',
      {},
      (data)=>{
       userId.value= data
        isLoaded.value=true
      }
  )
}
onMounted(()=>{
  if(!isLoaded.value){
    getUserId()
  }
}
)
</script>


<template>
  <div class="container">
    <!-- 数据加载完成后渲染 -->
    <template v-if="isLoaded">
      <avatar-form :user-id="userId" ></avatar-form>
      <div class="info-form">
        <router-view :user-id="userId" v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </template>
  </div>
 </template>

<style scoped>
.container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
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
.info-form {
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
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


</style>