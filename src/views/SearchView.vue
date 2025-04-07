<script>
import commonUtil from '@/api/common_util.js'
import {ref,watchEffect } from 'vue'
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
import axios from "axios";
import common_util from "@/util/common_util";

export default {
      setup() {
        const route = useRoute()
        const mockProducts = ref([])
        const isLoading = ref(false)
        const searchError = ref(null)
        // 统一搜索方法
        const searchProducts = async (keyword) => {
          try {
            isLoading.value = true
            searchError.value = null
            await commonUtil.get(
                'http://localhost:8080/item/search',
                { keyword },
                (data) => {
                  mockProducts.value = data.map(item => ({
                    ...item,
                    image: item.image || '/default-product.png' // 图片兜底
                  }))

                },
                (msg) => {
                  searchError.value = `搜索失败: ${msg}`
                  ElMessage.error(searchError.value)
                }
            )
          } finally {
            isLoading.value = false
          }
        }

        // 自动响应路由变化
        watchEffect(() => {
          if (route.query.keyword) {
            searchProducts(route.query.keyword)
          }
        })

        return { mockProducts, isLoading, searchError }
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
    goToReviewPage(itemId) {
      console.log("itemId",itemId);

      debugger
      this.$router.push({
        path: '/review',
        query: {itemId}
      })
    }
  }
};
</script>


<template>
    <div class="product-item-list">
      <div
      v-for="item in mockProducts"
      :key="item.itemId"
      class="product-item-container"
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
      <div @click="goToReviewPage(item.itemId)" class="action-buttons">
        <button class="modify-btn">COMMENTS</button>
        <button class="modify-btn" @click.stop="addToCart(item.itemId)">ADD</button>
      </div>
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