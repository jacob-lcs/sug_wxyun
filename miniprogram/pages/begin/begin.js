// miniprogram/pages/begin/begin.js
var types = ['default', 'primary', 'warn']
var app = getApp();
var pageObject = {
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
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
  onGotUserInfo: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    app.globalData.province = e.detail.userInfo.province
    app.globalData.nickName = e.detail.userInfo.nickName
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    app.globalData.userInfo = e.detail.userInfo
    wx.navigateTo({
      url: '/pages/first/first',
    })
    console.log("评论：" + this.data.pinglun);

    var lcs = 0
    const _ = app.globalData.db.command
    app.globalData.db.collection('qyzx_users').where({
        // gt 方法用于指定一个 "大于" 条件，此处 _.gt(30) 是一个 "大于 30" 的条件
        _openid: _.eq(app.globalData.userInfo._openid)
      })
      .get({
        success: function(res) {
          console.log("查询结果: ", res.data)
          lcs = 1
        }
      })

      if(lcs == 0){
        app.globalData.db.collection('qyzx_users').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            due: new Date(),
            _openid: new String(app.globalData.userInfo._openid),
            _id: new String(app.globalData.userInfo._id),
            avatarUrl: new String(app.globalData.avatarUrl)
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })
      }
  }
}

for (var i = 0; i < types.length; ++i) {
  (function(type) {
    pageObject[type] = function(e) {
      var key = type + 'Size'
      var changedData = {}
      changedData[key] =
        this.data[key] === 'default' ? 'mini' : 'default'
      this.setData(changedData)
    }
  })(types[i])
}

Page(pageObject)