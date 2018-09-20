//index.js
//获取应用实例
var common = require('../../dist/common.js');

var app = getApp();

var that;
Page({
  data: {

    textList: {},

    classes: ['全部', '教学', '后勤', '课余', '其他'],
    index: 0,
    current: '全部',
    current_scroll: '全部',
    color: ["#72afd3, #37ecba"],
    deg: 135,
    showLeft1: false,
    username: '',
    avatarUrl: ''
  },

  change: function() {
    wx.navigateTo({
      url: '/pages/home/login/login',
    })
  },

  home: function() {
    wx.navigateTo({
      url: '/pages/first/first',
    })
  },

  pl: function() {
    wx.navigateTo({
      url: '/pages/home/mycomment/mycomment',
    })
  },

  aboutus: function() {
    wx.navigateTo({
      url: '/pages/aboutus/aboutus',
    })
  },

  toggleLeft1() {
    this.setData({
      username: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl
    })
    this.setData({
      showLeft1: !this.data.showLeft1
    });
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  fabu: function() {
    wx.navigateTo({
      url: '/pages/home/mysug/mysug',
    })
  },

  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });


    //点击顶部分类栏，显示各分类下的帖子
    const texts_collection = app.globalData.db.collection('qyzx_texts')

    if (detail.key == "全部") {
      texts_collection.orderBy('ding', 'desc')
        .get().then(res => {
          this.setData({
            textList: res.data
          })
        })
    } else {
      texts_collection.where({
          classes: detail.key
        }).orderBy('ding', 'desc')
        .get().then(res => {
          this.setData({
            textList: res.data
          })
        })
    }
  },

  onReady: function(e) {

    console.log(app.globalData.userInfo)

    app.globalData.db.collection('qyzx_texts').orderBy('ding', 'desc')
      .get().then(res => {
        console.log('按赞排序后：', res.data)
        this.setData({
          'textList': res.data
        })
        console.log('textList:', this.data.textList)
      })

    if (app.globalData.userInfo != null) {
      this.setData({
        username: app.globalData.userInfo._id
      })
    }

  },

  onShareAppMessage: function() {
  },


  onLoad: function() {
  },

  //按时间排序
  shijian: function() {

    const texts_collection = app.globalData.db.collection('qyzx_texts')
    if (this.data.current_scroll == "全部") {
      texts_collection.orderBy('due', 'desc')
        .get().then(res => {
          this.setData({
            textList: res.data
          })
        })
    } else {
      texts_collection.where({
        classes: this.data.current_scroll
      }).orderBy('due', 'desc')
        .get().then(res => {
          this.setData({
            textList: res.data
          })
        })
    }
  },

  //按赞排序
  zanpai: function() {

    this.onShow();

  },

  onShow: function() {

    const texts_collection = app.globalData.db.collection('qyzx_texts')

    if (this.data.current_scroll == "全部") {
      texts_collection.orderBy('ding', 'desc')
        .get().then(res => {
          this.setData({
            textList: res.data
          })
        })
    } else {
      texts_collection.where({
        classes: this.data.current_scroll
      }).orderBy('ding', 'desc')
        .get().then(res => {
          this.setData({
            textList: res.data
          })
        })
    }

  }
})