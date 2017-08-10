// productDetail.js
var app = getApp();
Page({
  data: {
    domain: app.config.domain,
    productInfo:{},
    dialogMark:0,
    inputNum:1,
    productId:"",
    colorActive:-1,
    priceTypeActive:-1,
    goodsVO:{
      "goodsId": "",           //商品id
      "goodsPrice": 0,    //商品价格
      "goodsNum": 1,         //商品数量
      "goodsName": "",  //商品名字
      "specName": "",        //规格
      "goodsSn": ""    //商品货号
    }
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
          productInfo: res.data,
          goodsVO: {
            "goodsId": res.data.goodsId,//商品id
            "goodsName": res.data.goodsName,  //商品名字
            "goodsSn": res.data.goodsSn    //商品货号
          }
        });
        console.log("初步赋值：" + JSON.stringify(that.data.goodsVO));
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  },

  //触发弹框
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
        inputNum: num,
        goodsVO: {
          "goodsNum": num,         //商品数量
        }
      })
    }
  },

  //购买数量增减
  setNum:function(e){
    let type = e.currentTarget.dataset.type,
        num = this.data.inputNum;
    console.log("增减类型："+type);
    if(type==1){
      if (this.data.inputNum == 1) {
        return false;
      }
      num =num - 1;
    }else{
      num = num + 1;
    }
    console.log("测试:"+JSON.stringify(e));
    this.setData({
      inputNum: num,
      goodsVO: {
        "goodsNum": num,         //商品数量
      }
    })
    console.log("数量赋值：" + JSON.stringify(this.data.goodsVO));
    
  },

  //选择颜色与价格规格
  chooseType:function(e){
    let id = e.currentTarget.dataset.id,
      type = e.currentTarget.dataset.type;
    if(type==1){
      this.setData({
        colorActive: id
      })
    }else{
    let name = e.currentTarget.dataset.name;
      
      this.setData({
        priceTypeActive: id,
        goodsVO: {
          "specName": name,         //商品规格
        }
      })
    }
  },

  //加入购物车
  addShoppingCar:function(e){
    var that = this;
    wx.request({
      url: that.data.domain + '/api/goodsCart',
      data:{
        "userId": 12,
        "goodsId": 3,
        "colorId": 3,
        "goodsNum": 100,
        "specId": 2
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log("成功");
      },
      fail: function () {
       console.log("失败");
      }
    });
  }
})