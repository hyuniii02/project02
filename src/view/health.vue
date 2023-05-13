<template>
    <el-row>
      <!--左半部分-->
      <el-col :span="13">
        <!--聊天界面-->
      <el-card>
      <div class="wrap">
        <!-- 头部 -->
        <div class="titleBox">
          <img
            src="https://bpic.51yuansu.com/pic3/cover/02/99/42/5addb8a7c096b_610.jpg"
            alt=""
            class="head_portrait"
            style="margin-left: 20px; margin-right: 20px"
          />
          <span style="color: #fff">老人</span>
        </div>
        <!-- 底部 -->
        <div class="infoBox">
          <!-- 左边用户列表 -->
          <div class="userList">
            <!--搜索栏-->
            <div class="searchBox">
              <el-input
                placeholder="请输入内容"
                v-model="search"
                class="input-with-select"
                size="mini"
                @input="inquire"
              >
                <i
                  class="el-icon-search el-input__icon"
                  slot="suffix"
                  @click="handleIconClick"
                >
                </i>
              </el-input>
              <el-button
                icon="el-icon-plus"
                size="mini"
                type="primary"
                @click="dialogVisible = true"
              ></el-button>
            </div>

            <div class="userListBox">
              <div
                v-for="(item, index) in userListData"
                :key="index"
                @click="getAct(item, index)"
                :class="item.id == act ? 'userFlexAct' : 'userFlex'"
              >
                <div>
                  <img
                    :src="item.url"
                    alt="头像"
                    class="head_portrait2"
                    style="margin-left: 20px"
                  />
                </div>
                <div style="margin-right: 40px">
                  <el-tooltip
                    :content="item.username"
                    placement="bottom"
                    effect="light"
                  >
                    <div style="color: #565656" class="userName">
                      {{ item.username }}
                    </div>
                  </el-tooltip>
                  <div class="userInfo">{{ item.info }}</div>
                </div>
                <div style="margin-right: 10px; font-size: 14px; color: #ccc">
                  {{ item.timer }}
                </div>
              </div>
            </div>
          </div>
          <!-- 右边输入框和信息展示 -->
          <div class="infoList">
            <!-- 信息 -->
            <div class="infoTop" ref="scrollBox" id="box">
              <div
                :class="
                  item.position == 'left' ? 'chatInfoLeft' : 'chatInfoRight'
                "
                v-for="(item, index) in userInfoList"
                :key="index"
              >
                <img :src="item.url" alt="头像" class="head_portrait2" />
                <div :class="item.position == 'left' ? 'chatLeft' : 'chatRight'">
                  <div class="text" v-html="item.info"></div>
                </div>
              </div>
            </div>
            <!-- 输入框 -->
            <div class="infoBottom">
              <!--小组件，功能没加-->
              <div class="infoIcon">
                <i
                  @click="extend('照片上传')"
                  class="el-icon-picture-outline-round"
                ></i>
                <i @click="extend('设置')" class="el-icon-setting"></i>
                <i @click="extend('聊天记录')" class="el-icon-chat-dot-round"></i>
                <i @click="extend('更多选项')" class="el-icon-more-outline"></i>
              </div>
              <!--输入栏-->
              <textarea
                type="textarea"
                class="infoInput"
                v-model="textarea"
                @keydown.enter.exact="handlePushKeyword($event)"
                @keyup.ctrl.enter="lineFeed"
                :disabled='isshow==1?false:true'
              />
              <div class="fasong" @click="setUp" v-show="isshow==1?true:false">发送</div>
            </div>
          </div>
        </div>
      </div>
      </el-card>
    </el-col>
      <!-- 搜索框边 + 号弹框 -->
      <el-dialog
        title="选择需要添加的联系人"
        :visible.sync="dialogVisible"
        width="30%"
        :modal="false"
      >
        <span>自定义页面，还没想好写什么功能</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <!--右半部分-->
      <el-col :span="11">
      <div style="margin-left:10px">
     <!-- 折线图 -->
      <el-card style="height:320px">
         <div ref="echarts1" style="height:300px"></div>
      </el-card>
         <!-- 柱状图 -->
      <el-card style="height:320px">
          <div ref="echarts2" style="height:300px"></div>
      </el-card>
      </div>
      </el-col>
    </el-row>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  
  export default {
    name:"health",
    data() {
      return {
        // 在线状态
        state: 1,
        //搜索用户
        search: "",
        //用户列表渲染数据
        userListData: [
          {
            id: 0,
            url: "https://bpic.51yuansu.com/pic3/cover/03/88/71/5c1a30b98025d_610.jpg",
            username: "医生1",
            info: "在吗",
            timer: "2022/8/9",
          },
          {
            id: 1,
            url: "https://img0.baidu.com/it/u=3423678363,1705269468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            username: "医生2",
            info: "在吗在吗",
            timer: "2022/8/9",
          },
        ],
        //用户列表筛选数据
        userListDatas: [
          {
            id: 0,
            url: "https://bpic.51yuansu.com/pic3/cover/03/88/71/5c1a30b98025d_610.jpg",
            username: "医生1",
            info: "在吗",
            timer: "2022/8/9",
          },
          {
            id: 1,
            url: "https://img0.baidu.com/it/u=3423678363,1705269468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            username: "医生2",
            info: "在吗在吗",
            timer: "2022/8/9",
          },
        ],
        //用户点击选中变色
        act: Number,
        // 加号弹框
        dialogVisible: false,
        //模拟医生1的历史信息
        userInfoList2: [
          {
            url: "https://bpic.51yuansu.com/pic3/cover/03/88/71/5c1a30b98025d_610.jpg",
            username: "医生1",
            info: "在吗",
            timer: "2022/8/9",
            position: "left",
          },
          {
            url: "https://bpic.51yuansu.com/pic3/cover/03/88/71/5c1a30b98025d_610.jpg",
            username: "医生1",
            info: "在吗",
            timer: "2022/8/9",
            position: "left",
          },
          {
            url: "https://bpic.51yuansu.com/pic3/cover/02/99/42/5addb8a7c096b_610.jpg",
            username: "老人",
            info: "在吗在吗",
            timer: "2022/8/9",
            position: "right",
          },
          {
            url: "https://bpic.51yuansu.com/pic3/cover/03/88/71/5c1a30b98025d_610.jpg",
            username: "医生1",
            info: "在吗",
            timer: "2022/8/9",
            position: "left",
          },
          {
            url: "https://bpic.51yuansu.com/pic3/cover/02/99/42/5addb8a7c096b_610.jpg",
            username: "老人",
            info: "在吗在吗",
            timer: "2022/8/9",
            position: "right",
          },
        ],
        //模拟医生2的历史信息
        userInfoList3: [
          {
            url: "https://img0.baidu.com/it/u=3423678363,1705269468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            username: "医生2",
            info: "测试测试",
            timer: "2022/8/9",
            position: "left",
          },
          {
            url: "https://img0.baidu.com/it/u=3423678363,1705269468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
            username: "医生2",
            info: "测试",
            timer: "2022/8/9",
            position: "left",
          },
          {
            url: "https://bpic.51yuansu.com/pic3/cover/02/99/42/5addb8a7c096b_610.jpg",
            username: "老人",
            info: "测试测试测试测试",
            timer: "2022/8/9",
            position: "right",
          },
        ],
        //历史信息
        userInfoList: [],
        //输入框
        textarea: "",
        //滚动条距离顶部距离
        scrollTop: 0,
        //发送和输入显隐
        isshow:0
      };
    },
    methods: {
      //搜索icon
      handleIconClick() {
        console.log(1);
      },
      //点击用户
      getAct(val, index) {
        this.isshow=1
        // 点击用户切换数据时先清除监听滚动事件，防止出现没有历史数据的用户，滚动条为0，会触发滚动事件
        this.$refs.scrollBox.removeEventListener("scroll", this.srTop);
        //点击变色
        this.act = val.id;
        //清空消息数组
        this.userInfoList = [];
        // 模拟一下点击用户出现历史记录的样子，实际开发中是axios请求后数组赋值然后调用setPageScrollTo
        if (val.username == "医生1") {
          this.userInfoList = this.userInfoList2;
          // 直接调用不生效：因为你历史数据刚给，渲染的时候盒子高度还没有成型，所以直接调用拿不到，用个定时器让他在下一轮循环中调用，盒子就已经生成了
          this.$nextTick(() => { // 一定要用nextTick
                          this.setPageScrollTo();
                          //页面滚动条距离顶部高度等于这个盒子的高度
                          this.$refs.scrollBox.scrollTop = this.$refs.scrollBox.scrollHeight;
                      })
        } else if (val.username == "医生2") {
          this.userInfoList = this.userInfoList3;
          // 直接调用不生效：因为你历史数据刚给，渲染的时候盒子高度还没有成型，所以直接调用拿不到，用个定时器让他在下一轮循环中调用，盒子就已经生成了
          this.$nextTick(() => { // 一定要用nextTick
                          this.setPageScrollTo();
                          //页面滚动条距离顶部高度等于这个盒子的高度
                          this.$refs.scrollBox.scrollTop = this.$refs.scrollBox.scrollHeight;
                      })
        }
      },
      // 模糊搜索用户
      inquire() {
        let fuzzy = this.search;
        if (fuzzy) {
          this.userListData = this.userListDatas.filter((item) => {
            return item.username.includes(fuzzy);
          });
        } else {
          this.userListData = this.userListDatas;
        }
      },
      //发送
      setUp() {
        console.log("发送内容:", this.textarea);
        this.userInfoList2.push({
          url: "https://img0.baidu.com/it/u=3423678363,1705269468&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          username: "医生2",
          info: this.textarea,
          timer: "2022/8/9",
          position: "right",
        });
        this.textarea = "";
        // 页面滚动到底部
        this.$nextTick(() => { // 一定要用nextTick
                          this.setPageScrollTo();
                          //页面滚动条距离顶部高度等于这个盒子的高度
                          this.$refs.scrollBox.scrollTop = this.$refs.scrollBox.scrollHeight;
                      })
      },
      // 监听键盘回车阻止换行并发送
      handlePushKeyword(event) {
        console.log(event);
        if (event.keyCode === 13) {
          event.preventDefault(); // 阻止浏览器默认换行操作
          this.setUp(); //发送文本
          return false;
        }
      },
      // 监听按的是ctrl + 回车，就换行
      lineFeed() {
        console.log("换行");
        this.textarea = this.textarea + "\n";
      },
      //点击icon
      extend(val) {
        alert("你点击了：" + val);
      },
      //滚动条默认滚动到最底部
      setPageScrollTo(s, c) {
        //获取中间内容盒子的可见区域高度
        this.scrollTop = document.querySelector("#box").offsetHeight;
        setTimeout((res) => {
          //加个定时器，防止上面高度没获取到，再获取一遍。
          if (this.scrollTop != this.$refs.scrollBox.offsetHeight) {
            this.scrollTop = document.querySelector("#box").offsetHeight;
          }
        }, 100);
        //scrollTop：滚动条距离顶部的距离。
        //把上面获取到的高度座位距离，把滚动条顶到最底部
        this.$refs.scrollBox.scrollTop = this.scrollTop;
        //判断是否有滚动条,有滚动条就创建一个监听滚动事件，滚动到顶部触发srTop方法
        if (this.$refs.scrollBox.scrollTop > 0) {
          this.$refs.scrollBox.addEventListener("scroll", this.srTop);
        }
      },
      //滚动条到达顶部
      srTop() {
        //判断：当滚动条距离顶部为0时代表滚动到顶部了
        if (this.$refs.scrollBox.scrollTop == 0) {
          //逻辑简介：
          //到顶部后请求后端的方法，获取第二页的聊天记录，然后插入到现在的聊天数据前面。
          //如何插入前面：可以先把获取的数据保存在 A 变量内，然后 this.userInfoList=A.concat(this.userInfoList)把数组合并进来就可以了
  
          //拿聊天记录逻辑:
          //第一次调用一个请求拉历史聊天记录，发请求时参数带上页数 1 传过去，拿到的就是第一页的聊天记录，比如一次拿20条。你显示出来
          //然后向上滚动到顶部时，触发新的请求，在请求中把分页数先 +1 然后再请求，这就拿到了第二页数据，然后通过concat合并数组插入进前面，依次类推，功能完成！
          alert("已经到顶部了");
          
        }
      },
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        var echarts1 = echarts.init(this.$refs.echarts1);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '血压值柱状图'
          },
          legend: {},
          tooltip: {},
          dataset: {       
            source: [
              ['product', '血压收缩压', '血压舒张压'],
              ['4.25', 130, 90],
              ['4.26', 125, 85],
              ['4.27', 126, 83],
              ['4.28', 123, 80],
              ['4.29', 120, 80]
            ]
          },
          xAxis: { type: 'category' },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar' }, { type: 'bar' }]
        };
        // 使用刚指定的配置项和数据显示图表。
        echarts1.setOption(option);
  
        var echarts2 = echarts.init(this.$refs.echarts2);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '健康数值折线图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['血糖', '体温', '心率']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['4.25', '4.26', '4.27', '4.28', '4.29']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '血糖',
              type: 'line',
              stack: '',
              data: [6.4,6.5,6.2,6.2,6.0]
            },
            {
              name: '体温',
              type: 'line',
              stack: '',
              data: [36.4,36.2,36.5,36.1,36.2]
            },
            {
              name: '心率',
              type: 'line',
              stack: '',
              data: [66,63,64,67,65]
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        echarts2.setOption(option);
    }
  };
  </script>
  
  <style scoped>
  .wrap {
    height: 90%;
    width: 95%;
    background-color: #f2f2f2;
    margin-left: 10px;
    
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
  }
  .titleBox {
    height: 10%;
    width: 100%;
    background-image: linear-gradient(to right, #1e76bc, #69a3d5);
    display: flex;
    align-items: center;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .infoBottom {
    height: 30%;
    display: flex;
    flex-direction: column;
  }
  /* 输入框 */
  .infoInput {
    height: 58%;
    width: 100%;
    border: none;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f2f2f2;
    color: #434343;
  }
  .fasong {
    height: 30px;
    width: 80px;
    background-color: #e8e8e8;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    color: #58df4d;
    margin-top: 1%;
    align-self: flex-end;
    margin-right: 20px;
    cursor: pointer;
  }
  .infoIcon {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .infoIcon i {
    font-size: 24px;
    color: #676767;
    margin-left: 15px;
    cursor: pointer;
  }
  /* 头像 */
  .head_portrait {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .head_portrait2 {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .stateBox {
    margin-left: 20px;
    padding: 1px 8px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
  }
  .stateBox2 {
    margin-left: 20px;
    padding: 1px 8px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
  }
  .stateBox2:hover {
    background-color: #dcdcdc;
  }
  /* 在线 */
  .state1 {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #8ee80e;
  }
  /* 离线 */
  .state2 {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #cacaca;
  }
  /* 忙碌 */
  .state3 {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #ff8c1e;
  }
  /* 退出登录 */
  .state4 {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #7e7e7e;
  }
  .stateText {
    font-size: 14px;
    margin-left: 5px;
  }
  /* 列表和信息 */
  .infoBox {
    height: 90%;
    width: 100%;
    display: flex;
  }
  /* 用户列表大盒子 */
  .userList {
    height: 100%;
    width: 300px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
  }
  /* 用户列表 */
  .userListBox {
    flex: 1;
    width: 100%;
    overflow: auto;
  }
  /* 信息外层盒子 */
  .infoList {
    height: 100%;
    width: 72%;
  }
  /* 信息列表 */
  .infoTop {
    height: 70%;
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
  }
  /* 对方发的信息样式 */
  .chatInfoLeft {
    min-height: 70px;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
  }
  .chatLeft {
    margin-left: 15px;
    flex: 1;
  }
  .chatLeft .text {
    color: #434343;
    margin-top: 8px;
    background-color: #e3e3e3;
    display: inline-block;
    padding: 6px 10px;
    border-radius: 10px;
    max-width: 50%;
    /* 忽略多余的空白，只保留一个空白 */
    white-space: normal;
    /* 换行显示全部字符 */
    word-break: break-all;
    white-space: pre-wrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  
  /* 自己发的信息样式 */
  .chatInfoRight {
    height: 70px;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
  .chatRight {
    margin-right: 15px;
    flex: 1;
    /* 用align-items把元素靠右对齐 */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .chatRight .text {
    color: #434343;
    margin-top: 8px;
    background-color: #95ec69;
    display: inline-block;
    padding: 6px 10px;
    border-radius: 10px;
    max-width: 50%;
    /* 忽略多余的空白，只保留一个空白 */
    white-space: normal;
    /* 换行显示全部字符 */
    word-break: break-all;
    white-space: pre-wrap;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  
  .searchBox {
    padding: 4px 2px;
    border-bottom: 1px solid #ededed;
  }
  .input-with-select {
    width: 80%;
    margin-right: 2%;
  }
  /* 点击用户变色 */
  .userFlexAct {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    background-color: #e8e8e8;
  }
  /* 用户默认颜色 */
  .userFlex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
  }
  /* 用户名 */
  .userName {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* 简略信息 */
  .userInfo {
    width: 100px;
    font-size: 14px;
    color: #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 3px;
  }
  .el-card {
          width: 100%;
  }
  
  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dbd9d9;
    border-radius: 3px;
  }
  </style>