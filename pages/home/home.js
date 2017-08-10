//homde.js
//获取应用实例
var app = getApp();

Page({
  data: {
    domain: app.config.domain,
    productType:[],
    adImgRes: ['../res/img/benchi.jpg', '../res/img/iphone.jpg'],
    loadMark:true,
    loadTip:"正在努力加载数据...",
    hotProList:[],
    hotProTip:"正在获取热销商品...",
    hotProMark: true,
    
  },
  onLoad: function () {
    
  },
  onReady:function(){
    this.getProductType();
    this.getHotProduct();
  },
  //获取商品类型
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
        that.setData({
          loadTip: "网络连接失败"
        });
      }
    });
  },

  //获取热销商品
  getHotProduct:function(){
    var that = this;
    wx.request({
      url: that.data.domain + '/api/goods/hot',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(JSON.stringify(res.data));
        that.setData({
          hotProList: res.data
        });
        if(that.data.hotProList.length != 0) {
          that.setData({
            hotProMark: false
          });
        }else {
          that.setData({
            hotProTip: "暂时无热销商品"
          });
        }
      },
      fail: function () {
        that.setData({
          hotProTip: "网络连接失败"
        });
      }
    });
  }
})
