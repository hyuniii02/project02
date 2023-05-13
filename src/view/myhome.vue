<template>
  <!--我的界面-->
  <!--侧边导航栏-->
  <div>
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-aside width="200px"  style="background-color: white">
        <el-menu 
               default-active="1-1"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose" 
               router>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-postcard"></i>信息修改</template>
            <el-menu-item-group>

                <el-menu-item index="/showinfo" @click="goTo('/showinfo')">
                  基本信息
                </el-menu-item>
              
              <el-menu-item index="/infoeditor" @click="goTo('/infoeditor')">
                  信息修改
                </el-menu-item>
              
                <el-menu-item index="/imageup" @click="goTo('/imageup')">
                  头像修改
                </el-menu-item>
              
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-postcard"></i>订单管理</template>
            <el-menu-item-group>
              <el-menu-item index="/myshopping" @click="goTo('/myshopping')">
                  我的订单
                </el-menu-item>  
            </el-menu-item-group>

          </el-submenu>
        </el-menu> 
      </el-aside>
      
        <el-main>
            <router-view></router-view>
        </el-main>
         
    </el-container>

  </div>
</template>


<script>
export default {
  name: "App",
  data() {

    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.replace(path);
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #e5efe2;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.router-link-active {
  text-decoration: none;
}

.alink{

  text-decoration: none;
}
</style>
