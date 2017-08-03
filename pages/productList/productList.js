// productList.
var app = getApp();
Page({

  data: {
    domain: app.config.domain,
    typeId:"",
    title:"",
    list:"",
    loadMark:true,
    loadTip:"正在加载数据"
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
        console.log("长度:" + that.data.list.length);
        if(that.data.list.length!=0){
          that.setData({
            loadMark:false
          })
        }else{
          that.setData({
            loadTip: "暂时没有数据"
          })
        }
        console.log("请求数据:" + JSON.stringify(that.data.list));
      },
      fail: function () {
        console.log("注册失败");
      }
    });
  }
})