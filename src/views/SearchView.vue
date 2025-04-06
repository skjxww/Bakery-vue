<script>
import commonUtil from '@/api/common_util.js'
    export default {
  data() {
    return {
      mocProducts: []
    };
  },
  mounted() {
    const keyword = this.$route.query.keyword;
    if (keyword) {
      this.searchProducts(keyword);
    }
  },
  computed: {
    // 定义一个计算属性来获取 $route.query
    queryParams() {
      return this.$route.query.t;
    }
  },
  watch: {
    // 监听计算属性 queryParams 的变化
    queryParams: {
      handler(newQuery, oldQuery) {
        this.searchProducts(this.$route.query.keyword);
        console.log('Query 参数已更新:', newQuery);
        // 在这里处理 query 参数变化后的逻辑
      },
      deep: true // 深度监听对象属性变化
    }
  },
  methods: {
    searchProducts(keyword) {
      commonUtil.get(
        '/item/search', // 根据 API 文档替换为实际搜索接口 URL
        { keyword }, // 根据 API 文档调整参数名和结构
        (data) => {
          // this.products = data;
        this.mockProducts = data;
        },
        (msg) => {
            console.error(`搜索失败: ${msg}`)
        }
      );
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
      <a href="#">
        <button class="modify-btn">COMMENTS</button>
      </a>
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