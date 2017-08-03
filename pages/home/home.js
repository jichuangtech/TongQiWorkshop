//homde.js
//获取应用实例
var app = getApp();
Page({
  data: {
    domain: app.config.domain,
    productType:"",
    adImgRes: ['../res/img/benchi.jpg', '../res/img/iphone.jpg'],
    loadMark:true,
    loadTip:"正在努力加载数据..."
  },
  onLoad: function () {
    
  },
  onReady:function(){
    this.getProductType();
  },
  getProductType:function(){
    var that = this;
    wx.request({
      url: that.data.domain +'/api/goodsCategories', 
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          productType:res.data
        });
        if (that.data.productType.length!=0){
          that.setData({
            loadMark: false
          });
        }else{
          that.setData({
            loadTip: "暂时没有数据"
          });
        }
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  }
})
