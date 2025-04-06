<script setup>
import AvatarForm from "@/components/account/edit/avatarForm.vue";
import '@/assets/accountForm.css'
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


</style>