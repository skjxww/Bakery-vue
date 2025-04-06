<template>
  <div id="Catalog" class="container1">
    <table class="form-container">
      <tr>
        <p v-if="viewOrderMsg" class="success-message">{{ viewOrderMsg }}</p>
      </tr>
      <tr>
        <th align="center" colspan="2">
          Order #{{ order.orderId }}
          <p class="order-date">{{ formattedOrderDate }}</p>
        </th>
      </tr>
      <tr>
        <th colspan="2">Payment orders</th>
      </tr>
      <tr>
        <td>Phone:</td>
        <td>
          {{ order.phone }}
        </td>
      </tr>
      <tr>
        <td>Order Date (MM/YYYY):</td>
        <td>
          {{ order.orderDate }}
        </td>
      </tr>
      <tr>
        <td>First name:</td>
        <td>
          {{ order.firstName }}
        </td>
      </tr>
      <tr>
        <td>Last name:</td>
        <td>
          {{ order.lastName }}
        </td>
      </tr>
      <tr>
        <th colspan="2">Shipping Address</th>
      </tr>
      <tr>
        <td>City:</td>
        <td>
          {{ order.city }}
        </td>
      </tr>
      <tr>
        <td>Address 1:</td>
        <td>
          {{ order.shippingAddress1 }}
        </td>
      </tr>
      <tr>
        <td>Address 2:</td>
        <td>
          {{ order.shippingAddress2 || "-" }}
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
              <tr v-for="item in order.orderItems" @click="viewDetail(item.orderId)" :key="item.itemId">
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
            </tfoot>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import common_util from "@/util/common_util";
import {useRoute} from "vue-router";
import {ref} from "vue";
import axios from "axios";
export default {
  name: "ViewOrderView",
  setup: function () {
    const route = useRoute();
    const orderId = route.params.orderId;
    const order = ref({
    })
    // 发请求
    axios.get(`http://localhost:8080/orders/${orderId}`,
        {
          headers: common_util.accessHeader()
        }
    ).then(({data}) => {
      if (data.status === 0) {
        order.value = data.data;
        console.log(order.value);
      } else {
        console.log(data.status);
      }
    })
    return {order, orderId};
  },
  data() {
    return {
      viewOrderMsg: null, // 从路由查询参数获取消息
    };
  },
  computed: {
    formattedOrderDate() {
      return this.formatDate(this.order.orderDate);
    },
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
    formatCurrency(amount) {
      if (isNaN(amount)) return "$0.00";
      return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  }
};
</script>

<style>
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
</style>
