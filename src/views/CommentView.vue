<script>
import commonUtil from '@/api/common_util.js';

export default {
    data() {
        return {
            reviews: [],
        };
    },
    mounted() {
        const itemId = this.$route.query.itemId;
        debugger
        
        console.log("this.$route.query",this.$route.query);
        console.log("itemId1",itemId);
        this.fetchReviews(itemId);
    },
    methods: {
        fetchReviews(itemId) {
            console.log("itemId",itemId);
            
             commonUtil.get1(
                 `/item/${itemId}/reviews`, 
                 null,
                 (data) => {
                    console.log("dadada",data);
                    
                     this.reviews = data
                 },
                 (msg, code, url) => {
                     console.error(`获取评价失败: ${msg}`)
                 }
             );
         }
    }
};
</script>


<template>
    <div class="container">
    <div class="table-title">
        <h1>User Reviews</h1>
    </div>
    <table>
        <thead>
        <tr>
            <th>User ID</th>
            <th>Item ID</th>
            <th>Score(1-5)</th>
            <th>Comment</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="review in reviews" :key="review.id">
                    <td>{{ review.userid }}</td>
                    <td>{{ review.itemid }}</td>
                    <td>{{ review.score }}</td>
                    <td>{{ review.comment }}</td>
                </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
.container {
    width: 85%;
    margin: 40px auto;
    padding: 30px;
    background: #fff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
}

.table-title {
    font-size: 26px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: linear-gradient(90deg, #1a3766, #ff66b2);
    /* -webkit-background-clip: text; */
    -webkit-text-fill-color: transparent;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: linear-gradient(to bottom, rgba(0, 0, 255, 0.1), rgba(255, 255, 255, 0.1));
}

th,
td {
    padding: 16px;
    text-align: left;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
}

th {
    background: #1a3766;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
}

td {
    background: #f9f9f9;
    color: #555;
}

tr:hover td {
    background: #51c6f51a;
}

tr td:first-child {
    text-align: center;
}
</style>