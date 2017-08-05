// productDetail.js
var app = getApp();
Page({
  data: {
    domain: app.config.domain,
    productInfo:{},
    dialogMark:0,
    inputNum:1,
    colorActive:-1,
    productId:""
  },

  onLoad: function (options) {
    console.log("88:" + options.productName);
    var that = this;
    that.setData({
      productId: options.id
    });
  },

  onReady: function () {
    this.getProductDetail();
  },

  onShow: function () {
  
  },

  //获取商品详情
  getProductDetail:function(){
    var that = this;
    wx.request({
      url: that.data.domain + '/api/goods/3',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          productInfo: res.data
        });
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  },

  chooseColors:function(e){
    this.setData({
      dialogMark: 1
    })

  },
  hideDialog:function(e){
    console.log("隐藏");
    this.setData({
      dialogMark:0
    })
  },

  //输入框数据
  inputNum: function (e) {

    let num = e.detail.value.trim();
    if (num != '') {
      this.setData({
        inputNum: num
      })
    }
  },

  //购买数量增减
  setNum:function(e){
    console.log("测试:"+JSON.stringify(e));
    let num = this.data.inputNum +1;
    this.setData({
      inputNum: num
    })
  },
  subNum: function (e) {
    console.log("测试:" + JSON.stringify(e));
    if (this.data.inputNum==1){
      return false;
    }
    let num = this.data.inputNum - 1;
    this.setData({
      inputNum: num
    })
  },
  //选择颜色
  colorBtn:function(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      colorActive: id
    })
  }
})