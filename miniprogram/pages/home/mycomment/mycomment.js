// pages/home/mycomment/mycomment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const query2 = Bmob.Query("comment");
    query2.equalTo("commentator", "==", app.globalData.userInfo.username);
    console.log("userId", app.globalData.userInfo.username)
    query2.order("-createdAt");
    query2.find().then(res => {
      console.log('mysug_res', res)
      this.setData({
        rows: res
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})