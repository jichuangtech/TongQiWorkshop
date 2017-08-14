// shoppingCar.js
var app = getApp();

Page({
  data: {
    domain: app.config.domain,
    test:false,
    pro:[
      // { name: '专人配送', value: '0', checked: false,price:12.12,num:1 },
      // { name: '专人配送', value: '1', checked: false, price: 12, num: 2 },
      // { name: '精品品牌', value: '2', checked: false, price: 10.2, num: 3 }
    ],
    allMoney:0.00,
    allSelect:false,
    editObj:{
      editMark:false,
      editText:"编辑"
    },
    load:{
      loadTip: "正在加载购物车...",
      loadMark:true
    },
    footerBtn:{
      btnText:"结算"
    },
    toast:{
      toastMark:false,
      toastText:""
    }
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    this.getShoppingCar();
  },
  onShow: function () {
  },

  //请求购物车
  getShoppingCar:function(){
    var that = this,
        loadMark = true,
        loadTip = "购物车空空如也";
    wx.request({
      url: that.data.domain + '/api/goodsCart/12',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        if(res.data.length!=0){
          for(var i=0;i<res.data.length;i++){
            res.data[i]['value'] = i;
          }
          that.setData({
            pro: res.data
          });
          loadMark = false;
        }
        that.setData({
          load: {
            loadMark: loadMark,
            loadTip: loadTip
          }
        });
      },
      fail: function () {
        loadMark = false;
        loadTip = "网络连接失败";
        that.setData({
          load: {
            loadMark: loadMark,
            loadTip: loadTip
          }
        });
      }
    });
  },

  //勾选商品
  selectPro:function(e){
    var pro = this.data.pro,
        checkArr = e.detail.value,
        allMoney = 0,
        countIndx = 0,
        allSelect = false;
    console.log("checkArr:" +checkArr);
    for (var i = 0; i < pro.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        console.log("相加");
        console.log(i + "");
        pro[i].checked = true;
        console.log("当前");
        allMoney = (parseFloat(allMoney) + parseFloat(pro[i].goodsNum * pro[i].goodsPrice)).toFixed(2);
        
        pro[i].checked = true;
        console.log("选中");
        countIndx++
      } else {
        console.log("未选中");
        pro[i].checked = false;
      }
    }
    if (countIndx == pro.length){
      allSelect = true;
    }
    this.setData({
      pro: pro,
      allMoney: allMoney,
      allSelect: allSelect
    })

  },
  //全选或反选
  selectAll:function(){
    var pro = this.data.pro,
        mark = false,
        allSelect = false;
    if (this.data.pro.length == 0) {
      return false;
    }
    if (!this.data.allSelect){
      mark = true;//全部选中
      allSelect = true;
    }
    for (var i = 0; i < pro.length; i++) {
      pro[i].checked = mark;
    }
    this.setData({
      pro: pro,
      allSelect: allSelect
    })
  },

  //编辑购物车
  editCarList:function(){
    var editMark = false,
        editText =  "编辑";
    console.log("测试："+this.data.editObj.editMark);
    if (this.data.pro.length == 0) {
      return false;
    }
    if(!this.data.editObj.editMark){
        editMark = true;
        editText = "完成";
    }
    this.setData({
      editObj:{
        editMark: editMark,
        editText: editText
      },
      footerBtn:{
        btnText:"删除"
      }
    })
    this.selectAll();
  },

  //删除购物车
  delCarItem:function(e){
    var that = this,
        carId = e.currentTarget.dataset.carid;
    wx.request({
      url: that.data.domain + '/api/goodsCart/' + carId+'',
      header: {
        'content-type': 'application/json'
      },
      method: 'DELETE',
      success: function (res) {
        if(res.data.statusCode==200){
          app.showToast('删除成功', that, 3000);
          that.onReady()
        }else{
          app.showToast('删除失败', that, 3000);
        }
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  },

  //toast
  showToast:function(){
    this.setData({
      toast:{
        toastMark:true
      }
    });
  }
})