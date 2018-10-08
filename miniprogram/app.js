
App({

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.cloud.init({
      env: 'suggestion'
    })


    var that = this
    this.globalData.db = wx.cloud.database()

    this.globalData.db = wx.cloud.database()


    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight
      }
    })

  },

  globalData: {
    userInfo: null,
    windowWidth: 0,
    windowHeight: 0,
    db: null,
  }
})
