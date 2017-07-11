Page({

    back: function(event) {

        console.log("个人页面被点击了 event.type: " + event.type);
        console.log("个人页面被点击了 event.target: " + event.currentTarget.dataset);
        wx.navigateBack({
            delta:1
        });
    
    }

    
});