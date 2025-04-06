<script>
import common_util from "@/util/common_util.js";
import { ElMessage } from "element-plus";

import router from "@/router";
export default {
  data() {
    return {
      order: {
        orderId: "",
        orderDate:"",
        shippingAddress: {
          firstName: "",
          lastName: "",
          shippingAddress1: "",
          shippingAddress2: "",
          city: "",
          phone:""
        },
        grandTotal: "1",
        items:
          [{
            itemId:"1",
            quantity: "",
            totalPrice: ""
          }
          ,{
            itemId:"2",
            quantity: "",
            totalPrice: ""
          }
          ]

      },
      detailFeedback: "",
      shipToDifferentAddress: false,
      isSubmitting: false,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setup(){
    },
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
      // 简单跳转
      router.push("/viewOrder");
    },
    async handleSubmit() {
      // 表单提交处理
      this.isSubmitting = true;
      try {
        const orderData = {
          ...this.order,
          ...(this.shipToDifferentAddress ? this.shippingInfo : {}),
        };
        // 这里替换为实际的API调用
        common_util.post(
    "/orders",
   orderData,
    {
    },
    () => {
      ElMessage({ message: "提交成功", type: "success" });
      router.replace({ path: "/account/edit" });
    },
    () => {
      ElMessage({ message: "提交失败", type: "warning" });
    }
  );
        // 提交成功后跳转
        router.push({path:"/welcome/login",query:{order:this.order}});
      } catch (error) {
        console.error("Order submission failed:", error);
        this.detailFeedback = "Failed to submit order. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
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
              <input type="text" v-model="order.shippingAddress.firstName" required />
            </td>

        </tr>
        <tr>
          <td>
            Last Name:
          </td>
            <td>
              <input type="text" v-model="order.shippingAddress.lastName" required />
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
            <input type="text" v-model="order.shippingAddress.shippingAddress1" required />
          </td>
        </tr>
        <tr>
          <td>ShippingAddress 2:</td>
          <td>
            <input type="text" v-model="order.shippingAddress.shippingAddress2" />
          </td>
        </tr>
        <tr>
          <td>City:</td>
          <td>
            <input type="text" v-model="order.shippingAddress.city" required />
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
                <tr v-for="item in order.items" v-bind:key="item.itemId">
                  <td>
                    <router-link :to="'/item/' + item.itemId">{{
                      item.itemId
                    }}</router-link>
                  </td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.totalPrice }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Grand Total:</th>
                  <th>{{ order.grandTotal }}</th>
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
        @click="handleSubmit"
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
