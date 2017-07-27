// productList.
const config = require('../../config.js');
Page({

  data: {
    domain: config.domain,
    typeId:"",
    title:"",
    list:""
  },

  onLoad: function (options) {
    console.log("88:" + options.productName);
    var that = this;
    that.setData({
      title: options.productName,
      typeId:options.id
    });

    wx.setNavigationBarTitle({
      title: that.data.title//页面标题为路由参数
    })
   // Page.setTitle(that.title);
  },
   
  onReady: function () {
    this.getProductList();
  },

  onShow: function () {
  
  },

  //获取产品
  getProductList(){
    var that = this;

    console.log("产品具体");
    wx.request({
      url: this.data.domain + '/clothshopserver/api/goodsCategory/listGoods/' + this.data.typeId,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("请求数据:" + res);
        console.log(typeof res);
        that.setData({
          list: res.data
        });
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  },
  //设置页面title
  setTitle:function(title){
    wx.setNavigationBarTitle({
      title: title//页面标题为路由参数
    })
  }
})