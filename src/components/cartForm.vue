<script setup>
import '@/assets/orderTable.css'
import {ref, computed,onMounted } from "vue"
import common_util from "@/util/common_util.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import axios from "axios";
const cart = ref({
  cartId: '',
  totalQuantity: 0,
  subtotal: 0,
  items: []
});
// 初始化购物车数据
const router=useRouter();

const getCart=async ()=>{
  console.log("mounted")
  // 这里替换为实际的API调用
  axios.get("http://localhost:8080/cart",
      {
        headers:common_util.accessHeader()
      }
  ).then(({data})=>{
        if(data.status === 0){
          cart.value = {
            ...data.data,
            items: data.data.items.map(item => ({
              ...item,
              listPrice: item.quantity > 0
                  ? Number((item.totalPrice / item.quantity).toFixed(2))
                  : 0
            }))
          };
          console.log(cart.value.items);
      }
  }
  );
}
onMounted(async () => {
  console.log("[生命周期] 组件挂载完成");
  await getCart(); // 确保在挂载后执行
});
// 减少商品数量的方法
const decreaseQuantity = (item) => {
  if (item.quantity > 0) {
    item.quantity--;
  }
  updateTotalCost(item);
  updateData(item);
};
// 增加商品数量的方法
const increaseQuantity = (item) => {
  item.quantity++;
  updateTotalCost(item);
  updateData(item);
};
function updateData(item){
  axios.put(
      `http://localhost:8080/cart/items/${item.itemId}`,
      {},
      {headers: common_util.accessHeader(),params:{newquantity:item.quantity}}
  ).then(({data})=>{
    if(data.status===0)
    {ElMessage({message:"成功修改商品数量",type:"success"});}
  })
}
// 移除商品的方法
const removeItem = (itemId) => {
  axios.delete(`http://localhost:8080/cart/items/${itemId}`,
      {headers:common_util.accessHeader()})
      .then(()=>{ElMessage({message:"删除成功",type:"success"})})

  cart.value.items = cart.value.items.filter(item => item.itemId !== itemId);

  console.log(cart.value.items);
};

// 计算购物车的 subTotal
const subTotal = computed(() => {
  let total = 0;
  cart.value.items.forEach(item => {

    total +=item.quantity*item.listPrice;
  });
  return `$${total}`;
});

function updateTotalCost(item) {
    item.totalPrice=item.quantity*item.listPrice;
}
const checkOut=()=>{
  router.push('/checkout');
}
</script>

<template>
  <div class="container">

    <div id="Cart">

      <h2>Shopping Cart</h2>
      <table>
        <tbody>
        <tr>
          <th><b>Item ID</b></th>
          <th><b>Quantity</b></th>
          <th><b>Total Cost</b></th>
          <th>&nbsp;</th>
        </tr>
        <tr v-if="cart.items.length===0" >
          <td colspan="8"><b>Your cart is empty.</b></td>
        </tr>
        <tr  v-for="cartItem in cart.items" v-bind:key="cartItem.itemId">
          <td>
            <router-link :to="{ name: 'itemDetail', params: { itemId: cartItem.itemId } }">
              {{ cartItem.itemId }}
            </router-link>
          </td>

          <td class="itemQuantity">
            <button class="subtract" name="{{cartItem.itemId}}" @click="decreaseQuantity(cartItem)">-</button>
            <input class="quantity" type="text" name="{{cartItem.itemId}}" v-model='cartItem.quantity' @blur.prevent="updateData(cartItem)">
            <button class="add" @click="increaseQuantity(cartItem)" name="{{cartItem.itemId}}" >+</button>
          </td>
          <td class="total">{{ cartItem.totalPrice }}</td>
          <td>
            <button class="removeButton" name="{{cartItem.itemId}} " @click="removeItem(cartItem.itemId)">Remove</button>
          </td>
        </tr>
        <tr>
          <td colspan="7">
            Sub Total: <span id="subTotal">{{subTotal }}</span>
          </td>
          <td>&nbsp;</td>
        </tr>
        </tbody>

      </table>
        <button class="submit-btn" @click.prevent="checkOut">Proceed to Checkout</button>
    </div>

    <div id="Separator">&nbsp;</div>
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

/* 提交按钮样式 */
.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background: #1a3766;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

/* 提交按钮悬停样式 */
.submit-btn:hover {
  background: #f78daa;
}

</style>