//index.js
//获取应用实例



Page({
    bind_tal1: function () {
    wx.makePhoneCall({
      phoneNumber: '13564859113' //仅为示例，并非真实的电话号码
    })
  },
  bind_tal2: function () {
    wx.makePhoneCall({
      phoneNumber: '2' //仅为示例，并非真实的电话号码
    })
  },
  bind_tal3: function () {
    wx.makePhoneCall({
      phoneNumber: '18817259503' //仅为示例，并非真实的电话号码
    })
  },
  bind_tal4: function () {
    wx.makePhoneCall({
      phoneNumber: '4' //仅为示例，并非真实的电话号码
    })
  },
  bind_tal5: function () {
    wx.makePhoneCall({
      phoneNumber: '5' //仅为示例，并非真实的电话号码
    })
  },
  bind_tal6: function () {
    wx.makePhoneCall({
      phoneNumber: '18817259503' //仅为示例，并非真实的电话号码
    })
  },
  data: {
      contents1: 'liqing@shu.edu.cn',
      contents2: 'ouyangshan@shu.edu.cn',
      contents3: 'xxx@shu.edu.cn',
      contents4: 'teacher@shu.edu.cn',
      value:"",
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      value: e.detail.value,
    })
  },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      value: '',
    })
  },
  onCancel(e) {
    console.log('onCancel', e)
  },
  copyText1: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  copyText2: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  copyText3: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  copyText4: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
  },
  onChangeShowState: function (){
  this.setData({
      showView: (!this.data.showView)
  })
}
});

