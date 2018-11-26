// pages/first/first.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
        title: '上海大学计算机学院',
        img: 'http://bmob-cdn-20067.b0.upaiyun.com/2018/07/05/ad2263e640f8bfb5807939ba44c81664.png',
        text: '上海大学计算机工程与科学学院始建于1988年，由上海工业大学计算机工程系和上海科学技术大学计算机科学系联合成立。',
      },
      {
        title: '自强4000',
        img: 'http://bmob-cdn-20067.b0.upaiyun.com/2018/07/05/566b620e4017128980fad04e087996f1.png',
        text: '2013年建成的第三代集群式高性能计算机“自强4000”共有162个节点机，2480个计算核。',

      },
    ],
    textList: [],
    listNum: 0,
    showLeft1: false,
    x: app.globalData.windowWidth * 0.8 * 0.3,
    y: 30,
    userinfo: null
  },

  fankui: function() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  contactus:function(){
    wx.navigateTo({
      url: '/pages/contactus/index',
    })
  },

  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  },

  pl: function() {
    wx.navigateTo({
      url: '/pages/home/mycomment/mycomment',
    })
  },

  contact:function(){
    wx.navigateTo({
      url: '/pages/contact/index',
    })
  },

  fabu: function() {
    wx.navigateTo({
      url: '/pages/home/mysug/mysug',
    })
  },

  onChange: function(e) {
    console.log(e.detail)
    this.setData({
      x: app.globalData.windowWidth * 0.8 * 0.3,
      y: 30
    })
  },

  to_aboutus: function() {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("这个用户是不是管理员：",app.globalData.master)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    if (app.globalData.userInfo) {
      this.setData({
        username: app.globalData.userInfo.nickName
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  toggleLeft1() {
    this.setData({
      username: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
    this.setData({
      showLeft1: !this.data.showLeft1
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})