// pages/suggest/suggest.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    classes: "教学",
    items: [{
        name: '教学',
        value: '教学',
        checked: 'true'
      },
      {
        name: '后勤',
        value: '后勤',

      },
      {
        name: '课余',
        value: '课余'
      },
      {
        name: '其他',
        value: '其他'
      }
    ]
  },

  

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({
      classes: e.detail.value
    })
  },

  sugInput: function(e) {
    this.setData({
      suggestion: e.detail.value
    })
  },

  loginBtnClick: function(e) {
      if (this.data.suggestion == null) {
        wx.showModal({
          title: '提示',
          content: '请不要输入空的内容哦',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      } else {
        console.log("类别：" + this.data.classes + " 建议：" + this.data.suggestion);

        app.globalData.db.collection('qyzx_texts').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            classes: new String(this.data.classes),
            due: new Date(),
            content: new String(this.data.suggestion),
            writer: new String(app.globalData.userInfo._id),
            name: new String(app.globalData.nickName),
            viewed: new Number(0),
            ding: new Number(0),
            checked: false,
            avatarUrl: new String(app.globalData.avatarUrl)
          },
          success: function(res) {
            // 成功反馈建议
            console.log(res)
            wx.showModal({
              title: '提示',
              content: '提交成功',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '/pages/index/index',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            this.setData({
              suggestion: "",
              userName: ""
            });
            console.log("跳转界面")
          },
          fail: function(res) {
            console.log(err)
            wx.showModal({
              title: '提示',
              content: '提交失败,请检查网络',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        })
      }

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      username: app.globalData.nickName
    })

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  upload() {

  },
})