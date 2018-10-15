//index.js
//获取应用实例
const db = wx.cloud.database();

Page({
  bind_tal: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.text
    })
  },
  data: {
    value: "",
    teacher_info: {}
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
  copyText: function(e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    showView: (options.showView == "true" ? true : false)
    db.collection('teacher_info')
      .get().then(res => {
        console.log(res.data)
        this.setData({
          teacher_info:res.data
        })
      })
  },
  onChangeShowState: function() {
    this.setData({
      showView: (!this.data.showView)
    })
  }
});