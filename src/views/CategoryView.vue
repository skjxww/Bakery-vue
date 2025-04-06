<script>
import commonUtil from '@/api/common_util.js'
export default {
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    fetchCategories() {
      commonUtil.get(
        '/category/categories',
        null,  // 无查询参数
        (data) => {
          console.log("111");
          
          this.categories = data
        },
        (msg, code, url) => {
          console.log("222");
          console.error(`获取分类失败: ${msg}`)
        }
      )
    },
    handleCategoryClick(categoryId) {
      // 跳转到产品页面，传递 categoryId
      this.$router.push({
        path: '/product',
        query: { categoryId } 
      })
    }
  }
}
</script>


<template>

<div class="product-container">
    <div 
      v-for="category in categories" 
      :key="category.categoryId"
      class="product"
      @click="handleCategoryClick(category.categoryId)"
    >
  <!--            商品缩略图-->
  <div class="product_thumb">
    <!--                超链接-->
        <img :src="category.image" alt="category.image" />
  </div>
  <div class="product_content text-center">
    <h2 style="font-weight: bold;">{{ category.name }}</h2>
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
    width: 280px;
    height: 320px;
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