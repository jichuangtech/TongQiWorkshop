// shoppingCar.js
Page({
  data: {
    test:false,
    pro:[
      { name: '专人配送', value: '0', checked: false,price:12.12,num:1 },
      { name: '专人配送', value: '1', checked: false, price: 12, num: 2 },
      { name: '精品品牌', value: '2', checked: false, price: 10.2, num: 3 }
    ],
    allMoney:0.00,
    allSelect:false,
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    console.log("测试数据" + this.data.pro.length);
  },
  onShow: function () {
  
  },

  //勾选商品
  selectPro:function(e){
    var pro = this.data.pro,
        checkArr = e.detail.value,
        allMoney = 0,
        countIndx = 0,
        allSelect = false;
    for (var i = 0; i < pro.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        pro[i].checked = true;
        console.log("当前");
        console.log((pro[i].num * pro[i].price).toFixed(2));
        allMoney = (parseFloat(allMoney) + parseFloat(pro[i].num * pro[i].price)).toFixed(2);
        console.log("数量"+pro[i].num);
        
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
  }
})