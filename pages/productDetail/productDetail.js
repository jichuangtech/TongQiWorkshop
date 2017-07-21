// productDetail.js
Page({
  data: {
    productInfo: {
      productbanner: ['../res/img/benchi.jpg', '../res/img/iphone.jpg'],
      desc:"产品说明产品说明产品说明",
      name:"儿童裙",
      price:"12",
      remainNum:300
    },
    dialogMark:0
  },

  onLoad: function (options) {
  
  },

  onReady: function () {
  
  },

  onShow: function () {
  
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
  }
})