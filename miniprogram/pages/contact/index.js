//index.js
//获取应用实例
const db = wx.cloud.database();
var idd = []
var common = require('../../dist/common.js');
Page({


  data: {
    value: "",
    teacher_info: {},
    isSearch:false,
  },



  hideInput: function() {

    this.setData({
      isSearch:false,
      inputVal: "",
      inputShowed: false
    });
    // getLike(this);
    this.onShow();
  },
  clearInput: function() {
    isSearch: false,
    this.setData({
      inputVal: ""
    });
    // getLike(this);
    this.onShow();
  },
  showInput: function() {
    
    this.setData({
      isSearch: true,
      inputShowed: true
    });
  },

  inputTyping: function(e) {
    //搜索数据
    this.setData({
      isSearch: true,
    })
    
    getLike(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },

  bind_tal: function(e) {
    wx.makePhoneCall({
      phoneNumber: String(e.currentTarget.dataset.text)
    })
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

  onReachBottom: function() {
    if (this.data.isSearch==true)
      return;
    console.log("onReachBottom函数运行！")
    const _ = db.command
    db.collection("teacher_info").where({
      name: _.nin(idd)
    }).get().then(res => {
      console.log(res)
      for (var index in res.data) {
        idd.push(res.data[index].name)
      }
      console.log("id:", idd)
      this.setData({
        teacher_info: this.data.teacher_info.concat(res.data)
      })
    })

  },


  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    // showView: (options.showView == "true" ? true : false)
    db.collection('teacher_info')
    .get().then(res => {
      console.log(res.data)
      this.setData({
        teacher_info: res.data
      })
      for (var index in res.data) {
        // console.log("index:", res.data[index].name)
        idd[index] = res.data[index].name
      };
      console.log("ID数组为：", idd)
    })
  },

  onShow:function(){
    this.onLoad()
  },

  onChangeShowState: function() {
    this.setData({
      showView: (!this.data.showView)
    })
  }
});



function getLike(t, k) {
  var that = t;
  
  if (k=="")
    that.onShow();
  
  const MAX_LIMIT = 20

  db.collection('teacher_info').count().then(res => {
    // 计算需分几次取
    const batchTimes = Math.ceil(res.total / 20)
    const searchResult = []
    for (let i = 0; i < batchTimes; i++) {
      db.collection('teacher_info').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get().then(res => {
        for (let j = 0; j < res.data.length; j++) {
          if (res.data[j].name.indexOf(k) >= 0) {
            searchResult.push(res.data[j])
            that.setData({
              teacher_info:null,
              teacher_info:searchResult,
            })
          };
        }
      })
    }
    if(searchResult.length==0)
      that.setData({
        teacher_info:null
      })
    console.log("查询结果：",searchResult)
  })
  
}