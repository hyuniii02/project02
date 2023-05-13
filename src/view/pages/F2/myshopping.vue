<template>
    <div style="background-color: rgba(239,250,246,0.53)">
      <br>
  
      <br>
      <div style="width: 80%;margin-left: 1%" class="main">
        <el-card shadow="hover" v-for="(message,index) in Messages" :key="index">
  
          <div style="height:120px">
            
            <!-- 商品图片 -->
            <div  style="width:16%;height: 100%;border-radius: 100px;display:inline-block;">
              <img
                style="width:100%;height: 100%;border-radius: 100px"
                src="https://bpic.51yuansu.com/pic3/cover/02/99/42/5addb8a7c096b_610.jpg"
                class="image"
              >
            </div>
            <div style="display:inline-block;margin-left: 5%;width: 40%">
              <p class="message" style="font-weight:lighter">{{message.order_id}}</p>
              <p class="message" style="font-weight: bold" >{{message.goods_name}}</p>
              <p class="message" style="font-weight: lighter" >下单时间：{{message.time}}</p>
  
            </div>
  
            <div  style="width:35%;height: 100%;display:inline-block;">
              <!--签收情况-->
              <div style="display: inline-block;width: 30%;height: 30%;">
                <p class="message" style="display:flex">{{message.sign}}</p>
              </div>
              <!--显示评分-->
              <div style="display: inline-block;width: 60%">
                <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
               </el-rate>
              </div>
              <!--商品件数和价格-->
              <p class="message" style="font-weight: lighter" >共{{message.num}}件 &nbsp;&nbsp; 共{{message.amount}}元</p>
              <div style="display: inline-block;width: 38%;">
                <el-button type="warning" round style="height: 50%;width: 100%;display: inline-block" @click="dialogVisible = true">
                  <i class="el-icon-star-off"></i>
                </el-button>
                <br><br>
              </div>
              <!--点击并弹框进行评分-->
              <el-dialog title="评分" :visible.sync="dialogVisible">
                <span class="demonstration">对本次订单进行评分</span>
                <el-rate v-model="value1"></el-rate>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <!--点击确认收获-->
              <div style="display: inline-block;width: 38%">
                <el-button type="primary" round style="height: 50%;width: 100%;display: inline-block" @click="open">
                  <i class="el-icon-circle-check"></i>
                </el-button>
                <br><br>
              </div>
            </div>
  
          </div>
          <br>
        </el-card>
      </div>
      <br>
      <!--页码跳转-->
      <div class="footer" style="margin: 0 auto;width: 100%;">
        <div class="block" >
          <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            :total=total>
          </el-pagination>
        </div>
      </div>
  
    </div>
  
  </template>
  
  <script>
  export default {
    name: "myshopping",
    data(){
      return{
        value1: null,//评分弹框
        value: 3.7,//显示评分，模拟数据
        dialogVisible: false,
        total: 9,
        Messages:[//订单页面数值
          {"order_id":"订单ID",
            "goods_name":"商品名称",
            "time":"2023-4-27 12:00:00","sign":"已签收","num": 1,"amount":"28.5"
          },
          {"order_id":"订单ID",
            "goods_name":"商品名称",
            "time":"2023-4-27 12:00:00","sign":"已签收","num": 1,"amount":"28.5"
          },
          {"order_id":"订单ID",
            "goods_name":"商品名称",
            "time":"2023-4-27 12:00:00","sign":"已签收","num": 1,"amount":"28.5"
          },
          {"order_id":"订单ID",
            "goods_name":"商品名称",
            "time":"2023-4-27 12:00:00","sign":"已签收","num": 1,"amount":"28.5"
          },
  
        ]
      }
    },
    methods: {
      open() {
        this.$confirm('该订单已发货，是否已收货?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '签收成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消签收'
          });          
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .message{
    width: 25em;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  </style>