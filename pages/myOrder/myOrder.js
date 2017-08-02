// myOrder.js
const config = require('../../config.js');
Page({
  data: {
    tabInfo: [
      {tabName: '全部', tabStatus: 0},
      {tabName: '待支付', tabStatus: 1},
      {tabName: '待发货', tabStatus: 2},
      {tabName: '待收货', tabStatus: 3 },
      {tabName: '已完成', tabStatus: 4},
    ],
    currentId:0,
    domain: config.domain
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrderList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  //获取订单
  getOrderList:function(e){
    if(e){
      let id = e.currentTarget.dataset.status;
      this.setData({
        currentId: id
    })
    }

    var that = this;
    wx.request({
      url: that.data.domain + '/api/order/16777215/'+that.data.currentId+'',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        
        that.setData({
          productType: res.data
        });
        //if (that.data.productType.lenghth){

        //}
        console.log("赋值：" + JSON.stringify(that.data.productType));
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  }
})