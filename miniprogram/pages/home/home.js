// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    db: {},
  },



  addtodo: function(e){
    const db = wx.cloud.database();
    const todo = db.collection('todo');
    console.log(todo);
    todo.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: "啦啦啦",
        due: new Date("2018-09-01"),
        tags: [
          "cloud",
          "database"
        ],
        location: new db.Geo.Point(23, 88),
        done: false
      }
    })
      .then(res => {
        console.log(res)
      })

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