<script>
import commonUtil from '@/api/common_util.js'
import axios from "axios";
import common_util from "@/util/common_util";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      products: [],
    }
  },
  mounted() {
    const categoryId = this.$route.query.categoryId // 接收参数
    if (categoryId) {
      this.fetchProducts(categoryId)
    } 
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
    fetchProducts(categoryId) {
      commonUtil.get(
        `http://localhost:8080/product/products/${categoryId}`,
        null,
        (data) => {
          this.products = data
        },
        (msg, code, url) => {
          console.error(`获取产品失败: ${msg}`)
        }
      )
    },
    handleProductClick(productId) {
      // 跳转到商品详情（item 列表）页面，传递 productId
      this.$router.push({
        path: '/item',
        query: { productId }
      })
    }
  }
}
</script>


<template>
    <div class="product-container">

<div  v-for="product in products" 
      :key="product.productId"
      class="product"
      @click="handleProductClick(product.productId)"
      >
  <!--            商品缩略图-->
  <div class="product_thumb">
        <img :src="product.image" alt="product.image" />
  </div>
  <div class="product_content text-center">
    <h2 style="font-weight: bold;">{{ product.name }}</h2>
  </div>
</div>
</div>
</template>

<style scoped>
.product-container {
    display: flex;       /* 启用弹性盒子 */
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;           /* 设置间距 */
    padding: 20px;       /* 添加内边距 */
}

.product {
    width: 300px;
    height: 340px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 20px;
}
.product_thumb {
    width: 100%;
    height: 250px; /* 图片区域的高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.product_thumb img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; /* 让图片覆盖整个区域 */
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