<script>
import commonUtil from '@/api/common_util.js'
import {ElMessage} from "element-plus";
import axios from "axios";
import common_util from "@/util/common_util";

export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    const productId = this.$route.query.productId
    if (productId) {
      this.fetchItems(productId)
    }

    // 添加模拟数据
    // this.items = [
    // {
    //         "itemId": "EST-1",
    //         "name": "White Toast",
    //         "productId": "AB-01",
    //         "price": 10.0,
    //         "image": "https://feshin.oss-cn-beijing.aliyuncs.com/White%20Toast.jpg",
    //         "description": "With a dense texture, it is often used for making sandwiches.",
    //         "stock": 2
    //     },
    //     {
    //         "itemId": "EST-100",
    //         "name": "Whole Wheat Bread",
    //         "productId": "AB-01",
    //         "price": 8.0,
    //         "image": "https://feshin.oss-cn-beijing.aliyuncs.com/Whole%20Wheat%20Bread.jpg",
    //         "description": "A healthier version with added whole wheat flour.",
    //         "stock": 3
    //     }
    // ]
  },
  methods: {
    addToCart(itemId) {
      axios.post(
          `http://localhost:8080/cart/items/${itemId}`,
          {},
          {headers: common_util.accessHeader(),params:{quantity:1}}
      ).then(({data})=>{
        if(data.status===0)
        {ElMessage({message:"成功添加商品",type:"success"});}
      })
    },
    fetchItems(productId) {
      commonUtil.get(
        `http://localhost:8080/item/items/${productId}`, // 根据 API 文档修改路径
        null,
        (data) => {
          this.items = data
        },
        (msg, code, url) => {
          console.error(`获取商品详情失败: ${msg}`)
        }
      )
    },
    handleItemClick(itemId) {
            this.$router.push({
                path: `/itemdetail/${itemId}`
            })
        }
  }
}
</script>


<template>
    <div class="product-item-list">
      <div 
      v-for="item in items" 
      :key="item.itemId"
      class="product-item-container"
       @click="handleItemClick(item.itemId)"
    >
  <div class="product_thumb">
    <img :src="item.image" alt="item.image" />
  </div>
  <div class="product-detail">
    <div class="product_content text-center">
      <h2 style="font-weight: bold;">{{ item.name }}</h2>
    </div>
    <div class="price">Price:{{ item.price }}</div>
    <div class="stock">Stock:{{ item.stock }}</div>
    <div class="description">Description:{{ item.description }}</div>
    <div class="action-buttons">
        <button class="modify-btn">DETAIL</button>
      <button class="modify-btn" @click.stop="addToCart(item.itemId)">ADD</button>
    </div>
  </div>
      </div>
    </div> 
</template>

<style scoped>
.product-item-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px; /* 新增：设置底部间距，控制上下元素间隔 */
}

.product-item-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto 20px;
    border: 1px solid #ccc;
    width: 70%;
}

.product-detail {
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 2;
    margin-right: 20px;
}

.price,
.stock,
.description {
    text-align: center;
    font-weight: bold;
    color: #333;
}

.price {
    color: #f9a825;
    font-weight: bold;
    font-size: 18px;
}

.stock {
    color: #333;
    font-size: 16px;
}

.description {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
}

.product_thumb {
    height: 300px; /* 图片区域的高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-left: 20px;
}

.product_thumb img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; 
}


.product_thumb:hover img {
    transform: scale(1.1);
}


.product_thumb:hover .action_links {
    opacity: 1;
}

.product_content {
    padding: 15px;
    text-align: center;
    margin-bottom: 10px;
}

.product_content h4 {
    margin: 0 0 10px;
    font-size: 18px;
}

.action-buttons {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.action-buttons button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-btn {
    background-color: #243a6e;
    color: white;
}

.delete-btn:hover {
    background-color: #243a9e;
}

.modify-btn {
    background-color: #243a6e;
    color: white;
}

.modify-btn:hover {
    background-color: #243a9e;
}
</style>