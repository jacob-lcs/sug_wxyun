// miniprogram/pages/begin/begin.js
var app = getApp();
const db = wx.cloud.database()
var pageObject = {
  data: {

  },
  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    app.globalData.userInfo = e.detail.userInfo


    var lcs = 0
    const _ = app.globalData.db.command
    app.globalData.db.collection('qyzx_users').where({
        // gt 方法用于指定一个 "大于" 条件，此处 _.eq()是获取与其相等的项
        _openid: _.eq(app.globalData.userInfo._openid)
      })
      .get({
        success: function(res) {
          console.log("查询结果: ", res.data)
          if (res.data[0] == null) {
            console.log("未成功查询到结果")
            console.log("lcs: ", lcs)
            console.log("数据存储函数运行1")
            // const _ = app.globalData.db.command
            console.log("app.globalData.userInfo", app.globalData.userInfo)
            db.collection('qyzx_users').add({
              // data 字段表示需新增的 JSON 数据
              data: {
                due: new Date(),
                _openid: app.globalData.userInfo._openid,
                username: app.globalData.userInfo.nickName,
                avatarUrl: app.globalData.userInfo.avatarUrl
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log("创建成功！", res)
              }
            })
          }

        }
      })

    // if (lcs == 0) { //如果没有查询到结果，则进行存储

    // }
    wx.redirectTo({
      url: '/pages/first/first',
    })
  }
}

Page(pageObject)