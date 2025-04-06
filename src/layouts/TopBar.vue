<!-- src/layouts/TopBar.vue -->
<template>
    <header>
        <div class="top-info-bar">
            <div class="top-info-left">World Wide Completely Free Returns and Free Shipping</div>
            <div class="top-info-right">
                <span>+00 123 456 789</span>
                <span>BakeryShop.com</span>
                <span>Account</span>
            </div>
        </div>
    </header>
    
    <div class="nav-container">
        <img src="@/assets/logo.png" alt="Bucker" class="nav-logo">
        <ul class="nav-list">
            <li class="active"><router-link to="/category">Home</router-link></li>
            <li ><a href="#">Account</a></li>
            <li ><a href="#">Orders</a></li> 
        </ul>
        <div class="nav-actions">
            <input type="text" v-model="searchKeyword" id="searchInput">
        </div>
        <el-icon @click="executeSearch"><Search style="width: 2em; height: 2em; margin-right: 10px; color: #243a6e;" /></el-icon>
    </div>
    
    <div class="welcome-screen"> 
    </div> 
    
    <div class="content">
        <!-- <router-link to="/category">category</router-link> -->
         <router-view />
    </div>
      </template>
      
      <script>
      export default {
        data() {
          return {
            searchKeyword: ''
          };
        },
        methods: {
          executeSearch() {
            console.log('sssssssssssssss')
            console.log(this.searchKeyword.trim())
            if (!this.searchKeyword.trim()) return;
            this.$router.push({
              path: '/search',
              query: { keyword: this.searchKeyword.trim(),t: new Date().getTime() }
        });
    }
  }
    }
      </script>
      
      <style scoped>
      .el-icon-search {
      color: #243a6e; /* 匹配顶部深蓝色 */
      width: 1.2em;
      height: 1.2em;
    }
     .top-info-bar {
        background-color: #243a6e;
        color: #e0e0e0;
        padding: 15px 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }
    
    .top-info-right {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    
    .top-info-right span {
        border-left: 1px solid #e0e0e0;
        padding-left: 15px;
    }
    
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
    
    .nav-container {
        display: flex;
        align-items: center; /* 垂直居中 */
        position: relative;
        padding: 0 20px;
        height: 70px;
    }
    
    /* logo样式，控制宽度和右侧间距 */
    .nav-logo {
        height: 80%; /* 撑满容器高度 */
        width: auto; /* 保持原始宽高比 */
        object-fit: contain; /* 防止图片变形 */
        margin-right: auto; /* 将后续内容推到右侧 */
    }
    
    /* 导航菜单项列表，水平排列并设置间距 */
    .nav-list {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        list-style: none;
        gap: 30px;
    }
    
    /* 菜单项链接基础样式，文字样式及过渡效果 */
    .nav-list li a {
        text-decoration: none;
        color: #333;
        text-transform: uppercase;
        font-size: 18px;
        transition: color 0.3s ease;
    }
    
    /* 当前激活菜单项样式，突出显示 */
    .nav-list li.active a {
        color: white;
        background: #f78daa;
        padding: 5px 10px;
        border-radius: 3px;
    }
    
    /* 菜单项鼠标悬停效果 */
    .nav-list li a:hover {
        color: #f78daa;
    }
    
    /* 导航操作区 */
    .nav-actions {
        /*height: 50%; !* 容器高度一半 *!*/
        display: flex;
        align-items: center;
    
        margin-left: auto;
        padding-left: 30px;
        gap: 10px;
    }
    
    .nav-actions input[type="text"] {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s ease;
        line-height: normal;
        box-sizing: border-box;
        height: 30px;
    }
    
    .nav-actions input[type="text"]:focus {
        border-color: #f78daa; /* 输入框聚焦时的边框颜色 */
    }
    
    /* 图标基础样式，统一大小、颜色及悬停效果 */
    .nav-icon {
        font-size: 20px;
        color: #333;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .nav-icon:hover {
        color: #f78daa;
    }
    
    .glyphicon-search {
        font-size: 40px;
    }
    
    .welcome-screen {
        width: 100%;
        height: 33.33vh;
        background-image: url('https://csu-ssm-dessert.oss-cn-wuhan-lr.aliyuncs.com/topBg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        text-align: center;
    }
    
    .welcome-btn {
        position: absolute;
        right: 20px;
        bottom: 20px;
        padding: 10px 20px;
        background-color: #243a6e;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        height: 50px;
    }
    
    .welcome-btn:hover {
        background-color: #243a9e;
    }
      </style>