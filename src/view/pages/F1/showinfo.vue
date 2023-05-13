<template>
    <div>
        <div  style="width:14%;height: 130px;border-radius: 100px;display:inline-block;">
          <img
            style="width:100%;height: 100%;border-radius: 100px"
            src="https://bpic.51yuansu.com/pic3/cover/02/99/42/5addb8a7c096b_610.jpg"
            class="image"
          >
        </div>
    
      <br>
      <br>
      <el-descriptions :column="1" border>
    
        <el-descriptions-item label="昵称" v-model="alias" ><p class="message">{{alias}}</p></el-descriptions-item>
        <el-descriptions-item label="姓名" v-model="name" class="message"><p class="message">{{name}}</p></el-descriptions-item>
        <el-descriptions-item label="电话号码" v-model="phone" class="message"><p class="message">{{phone}}</p></el-descriptions-item>
        <el-descriptions-item label="家庭住址" v-model="address" class="message" ><p class="message">{{address}}</p></el-descriptions-item>
        <el-descriptions-item label="社区编号" v-model="community_id" class="message"><p class="message">{{community_id}}</p></el-descriptions-item>
        <el-descriptions-item label="紧急联系方式" v-model="emergency_call" class="message"><p class="message">{{emergency_call}}</p></el-descriptions-item>
    
      </el-descriptions>
    </div>
    </template>
    
    <script>
    export default {
      name: "showinfo",
      data(){
        return{
          alias:"老人",
          name: "老人姓名",
          phone: 18100000000,
          address: "xx省xx市xx街道xx小区",
          community_id: 200000,
          emergency_call: 15100000000
    
    
        }
      }
    }
    </script>
    
    <style scoped>
    .message{
      width: 30em;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    </style>