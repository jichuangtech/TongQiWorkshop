//homde.js
//获取应用实例
const config = require('../../config.js');
var app = getApp()
Page({
  data: {
    domain:config.domain,
    productType:"",
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
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady:function(){
    this.getProductType();
  },
  getProductType:function(){
    var that = this;
    
    wx.request({
      url: that.data.domain+'/milkteashopserver/api/productType/list', 
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("请求数据:" + res);
        console.log(typeof res);
        that.setData({
          productType:res.data
        });
        console.log("赋值："+JSON.stringify(that.data.productType));
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  }
})
