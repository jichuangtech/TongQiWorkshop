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
    dialogMark:0,
    inputNum:1
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
  }
})