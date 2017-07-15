//homde.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'LYM ,Hello World Made By Bingo',
    userInfo: {},
    adImgRes: ['../res/img/benchi.jpg', '../res/img/iphone.jpg'],
    productMenus:[
      {
        icon:'../res/img/zhutai.png',
        name:'床品套件',
        remark: 'xxxx'
      },
      {
        icon:'../res/img/xianglu.png',
        name:'枕头',
        remark: 'xxxx'
      },
      {
        icon:'../res/img/zhutai.png',
        name:'桌椅',
        remark: 'xxxx'
      },
      {
        icon: '../res/img/zhutai.png',
        name: '桌椅',
        remark: 'xxxx'
      }

    ],
    
  },

  insertMenu: function() {
    console.log(" insertMenu 进行注册操作");

    var menu = {
      name: "供佛台",
      remark: "这是一木质款供佛台",
      pictureUri : "www.baidu.com"
    };

    wx.request({
      url: 'http://localhost:8080/api/productType/saveJson', 
      method:'POST',
      header: {
            'content-type': 'application/json'
      },
      data: menu,
      success: function(res) {
        console.log("此次插入的数据为 name: " + res.data.name);
      }
      ,
      fail: function() {}
    });


  },

  fectMenu: function() {
    var that = this;
    console.log(" fectMenu 进行注册操作");

    var register = {
        email: "11233445@qq.com",
        password: "1234567",
        username: "23232323"
    };

    wx.request({
        url: 'http://localhost:8080/api/productType/list',
        // url: 'http://106.15.179.23:8080/milkteashopserver/api/productType/list', 
        header: {
            'content-type': 'application/json'
        },
        method:'GET',
        success: function(res) {
          console.log("菜单的数量: " + res.data[0].name);
          that.setData({
            productMenus: res.data
          });
          
        },
        
        fail: function() {
          console.log("注册失败");
        }

    });
  },

  updateMenu: function() {
    console.log(" updateMenu 修改菜单");
    var updateData = this.data.productMenus[0];
    console.log(" updateMenu 修改菜单 updateData: " + JSON.stringify(updateData));

  
  },

  //事件处理函数
  bindViewTap: function() {
    var str = this.data.motto + "23";
    this.setData({
        motto : str
    });
    // wx.navigateTo({
    //   url: '../me/me',
    //   success: function() {
    //     console.log("页面跳转成功");
    //   }
    // });
  },
  onPullDownRefresh: function() {
      console.log(" onPullDownRefresh ");
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
