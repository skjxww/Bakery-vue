<script>
import common_util from "@/util/common_util.js";
import { ElMessage} from "element-plus";
import router from "@/router";
import axios from "axios";
import {ref} from 'vue'
export default {
  data() {
    return {
      detailFeedback: "",
      isSubmitting: false,
    };
  },
  setup(){
    const order=ref({
      orderId: "",
      orderDate:"",
      firstName: "first_name",
      lastName: "last_name",
      shippingAddress1: "address1",
      shippingAddress2: "address2",
      city: "city1",
      phone:"phone",
      grandTotal: ""
    })

    axios.get("http://localhost:8080/orders/prepare",
        {
          headers:common_util.accessHeader()
        }
    ).then(({data})=>{
      if(data.status === 0){
        Object.assign(order.value, data.data);
        order.value.grandTotal = data.data.subTotal;
      }else{
        console.log(data.status);
      }
    })
    const submit=async function handleSubmit() {
      this.isSubmitting = true;
      console.log(order.value);
      axios.post("http://localhost:8080/orders",
          order.value,
          {
            headers:common_util.accessHeader()
          }
      ).then(({data})=>{
            if(data.status === 0){
              ElMessage({message:"提交订单成功",type:"success"});
              router.push({path:`order/${data.data.orderId}`});
            }else{
              console.log(data.status);
            }
          }
      );
    }
    return {order,submit}
  },
  methods: {

    validateExpiryDate() {
      // 有效期验证逻辑
      if (
        this.order.orderDate &&
        !/^(0[1-9]|1[0-2])\/?([0-9]{4})$/.test(this.order.orderDate)
      ) {
        this.detailFeedback = "Invalid expiry date (MM/YYYY)";
      } else {
        this.detailFeedback = "";
      }
    },
    handleContinue() {
      this.handleSubmit()
      // 简单跳转
      router.push("/viewOrder");
    },

  },
};
</script>
<template>
  <div class="container1">
    <form id="form" @submit.prevent="handleSubmit">
      <table class="form-container">
        <tr>
          <th colspan="2">Payment Details</th>
        </tr>
        <tr>
          <td>
            First Name:
          </td>
            <td>
              <input type="text" v-model="order.firstName" required />
            </td>

        </tr>
        <tr>
          <td>
            Last Name:
          </td>
            <td>
              <input type="text" v-model="order.lastName" required />
            </td>

        </tr>

        <tr>
          <td>Phone:</td>
          <td>
            <input type="text" v-model="order.phone" required />
          </td>
        </tr>
        <tr>
          <th colspan="2">Shipping Address</th>
        </tr>
        <tr>
          <td>ShippingAddress 1:</td>
          <td>
            <input type="text" v-model="order.shippingAddress1" required />
          </td>
        </tr>
        <tr>
          <td>ShippingAddress 2:</td>
          <td>
            <input type="text" v-model="order.shippingAddress2" />
          </td>
        </tr>
        <tr>
          <td>City:</td>
          <td>
            <input type="text" v-model="order.city" required />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <table>
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.orderItems" v-bind:key="item.itemId">
                  <td>
                    <router-link :to="{ name: 'itemDetail', params: { itemId: item.itemId } }">
                      {{ item.itemId }}
                    </router-link>
                  </td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.totalPrice }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Grand Total:</th>
                  <th>{{ order.subTotal }}</th>
                </tr>
                <tr v-for="(item, index) in order.lineItems" :key="index">
                  <td>
                    <router-link :to="'/orders/' + item.itemId">{{orders.orderId }}</router-link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </td>
        </tr>
      </table>
    </form>
    <div class="button-container">
      <input
        type="button"
        name="newOrder"
        value="Continue"
        id="submit"
        class="button"
        @click="submit"
      />
    </div>
  </div>
</template>



<style scoped>
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
  position: relative;
  bottom: 58px;
}

.form-container {
  width: 100%;
  box-sizing: border-box;
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

.table2 {
  width: 100%;
  /*border-collapse: collapse;*/
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
  background: linear-gradient(90deg, #1a3766, #ff66b2);
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

.error-message {
  color: red;
  font-size: 0.8em;
  display: block;
  margin-top: 5px;
}
</style>
