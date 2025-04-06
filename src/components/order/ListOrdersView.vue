<template>
  <div class="container1">
    <table>
      <tr>
        <th>Order ID</th>
        <th>Date</th>
        <th>Total Price</th>
      </tr>

      <tr v-for="order in orderList" :key="order.orderId">
        <td>
          <router-link :to="`/order/${order.orderId}`">
            {{ order.orderId }}
          </router-link>
        </td>
        <td>{{ formatDate(order.orderDate) }}</td>
        <td>{{ formatPrice(order.grandTotal) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import common_util from "@/util/common_util";
import {ref} from "vue";
import axios from "axios";
export default {
  name: "ListOrdersView",
  setup(){
    const orderList= ref([
    ])
    // 发请求
    axios.get("http://localhost:8080/orders",
        {
          headers:common_util.accessHeader()
        }
    ).then(({data})=>{
        if(data.status === 0){
          orderList.value=data.data;
          // 按照orderId升序排列
          orderList.value.sort((a, b) => a.orderId - b.orderId);
          console.log(orderList.value);
        }else{
        console.log(data.status);
        }
    }
  )
    return{
      orderList
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return d
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/(\d+)\/(\d+)\/(\d+),?/, "$1/$2/$3")
        .replace(",", "");
    },
    formatPrice(price) {
      if (isNaN(price)) return "$0.00";
      return "$" + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
  },
};
</script>

<style>
.container {
  width: 85%;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 35px;
}

.container1 {
  width: 85%;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 58px;
}

.display {
  display: flex;
  flex-direction: row;
  position: relative;
  right: 22px;
}

.display1 {
  display: flex;
  flex-direction: column;
}

.filter {
  width: 10px;
  margin-right: 0px;
}

.table-title {
  font-size: 26px;
  text-align: right;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #1a3766, #ff66b2);

  -webkit-text-fill-color: transparent;
  position: relative;
  left: 257px;
  bottom: 15px;
  width: 604px;
}

.table-title1 {
  font-size: 26px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #1a3766, #ff66b2);

  -webkit-text-fill-color: transparent;
}

.table1 {
  width: 100%;
  /*border-collapse: collapse;*/
  margin-top: 20px;
  position: relative;
  right: 115px;
}

.table2 {
  width: 100%;
  /*border-collapse: collapse;*/
  margin-top: 20px;
}

.table-item {
  margin-top: 20px;
}

th,
td {
  padding: 16px;
  text-align: left;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
}

th {
  background: #1a3766;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  width: 236px;
}

td {
  background: #f9f9f9;
  color: #555;
}

tr:hover td {
  background: rgba(255, 102, 178, 0.1);
}

.button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  background: #1a3766;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 159px;
}

.button1 {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  background: #1a3766;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 303px;
  position: relative;
  top: 10px;
}

.button:hover {
  opacity: 0.9;
}

.button:active {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .container {
    width: 95%;
    padding: 20px;
  }

  th,
  td {
    font-size: 14px;
    padding: 12px;
  }

  .button {
    padding: 8px 16px;
    font-size: 14px;
  }
}

/* 定义淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0; /* 初始状态：完全透明 */
  }
  to {
    opacity: 1; /* 最终状态：完全不透明 */
  }
}

/* 应用动画效果 */
.fade-in {
  opacity: 0; /* 初始透明度为0 */
  animation: fadeIn 1s ease-in forwards; /* 使用淡入动画，持续1秒，缓动函数为ease-in，动画结束后保持最终状态 */
}

/* 第一行延迟0秒 */
.fade-in:nth-child(1) {
  animation-delay: 0s;
}

/* 第二行延迟0.5秒 */
.fade-in:nth-child(2) {
  animation-delay: 0.5s;
}

/* 第三行延迟1秒 */
.fade-in:nth-child(3) {
  animation-delay: 1s;
}

/* 自定义提示框样式 */
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f8f9fa;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 18px 15px;
  max-width: 300px;
  z-index: 1050;
  opacity: 0;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: 1s;
  transform: translateY(0); /* 初始位置 */
}

/* 隐藏复选框 */
.close-checkbox {
  display: none;
}
/* 提示框样式 */
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f8f9fa;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 18px 15px;
  max-width: 300px;
  z-index: 1050;
  opacity: 1; /* 初始不透明 */
  animation: fadeOut 5s ease-in-out forwards; /* 5 秒后淡出 */
  background-color: #1a3766;
}

/* 提示框内容样式 */
.notification-content {
  font-size: 14px;
  color: #e3e3e3;
  align-items: center;
}

/* 淡出动画 */
@keyframes fadeOut {
  0% {
    opacity: 1; /* 初始状态：不透明 */
  }
  90% {
    opacity: 1; /* 前 90% 时间保持不透明 */
  }
  100% {
    opacity: 0; /* 最后 10% 时间逐渐变透明 */
    pointer-events: none; /* 防止点击穿透 */
  }
}
</style>
