Page({
  data:{
    email:"jsjxy@163.com",
  },

  copyBtn:function(e){
    var that = this;
    wx.setClipboardData({
      data: that.data.email,
      success:function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})




 


