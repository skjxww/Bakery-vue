<script>
import commonUtil from '@/api/common_util.js';
export default {
    data() {
        return {
            item: {},
        }
    },
    mounted() {
        const itemId = this.$route.params.itemId;
        this.fetchItemDetail(itemId);
    //     this.item = [
    // {
    //         "itemId": "EST-1",
    //         "name": "White Toast",
    //         "productId": "AB-01",
    //         "price": 10.0,
    //         "image": "https://feshin.oss-cn-beijing.aliyuncs.com/White%20Toast.jpg",
    //         "description": "With a dense texture, it is often used for making sandwiches.",
    //         "stock": 2
    //     }]
    },
    methods: {
        fetchItemDetail(itemId) {
            commonUtil.get(
                `/item/${itemId}`, 
                null,
                (data) => {
                    this.item = data;
                },
                (msg, code, url) => {
                    console.error(`获取商品详情失败: ${msg}`)
                }
            );
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
}
</script>


<template>
    <div class="product-item-list">
        <div class="product-item-container">
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
            <div @click="goToReviewPage(item.itemId)" class="action-buttons">
                <button class="modify-btn">COMMENTS</button>
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