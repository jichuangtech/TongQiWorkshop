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
    wx.request({
      url: that.data.domain + '/api/goodsCategories/' + that.data.typeId+'/goods',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          list: res.data
        });
        console.log("请求数据:" + JSON.stringify(that.data.list));
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