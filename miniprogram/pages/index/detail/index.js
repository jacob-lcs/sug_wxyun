// pages/index/detail/index.js
var app = getApp();

Page({
  data: {
    rows: {},
    rows_due:'',
    zans: 0,
    PlId: '',
    textId: '',
    textList: [],
    pinglun: '',
    hiddenmodalput: true,
    commentList:{},
    comment_due:''
  },

  //点击按钮指定的hiddenmodalput弹出框  
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //评论完成后点击取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
    this.setData({
      pinglun: "",
    });
  },

  //评论完成后点击确认按钮  
  confirm: function() {
    this.setData({
      hiddenmodalput: true
    })

    console.log("评论：" + this.data.pinglun);

    //插入一条评论数据
    const comments_collection = app.globalData.db.collection('qyzx_comments');
    comments_collection.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        due: new Date(),
        content: this.data.pinglun,
        commentator: app.globalData.userInfo.nickName,
        textID: this.data.textId
      },
      success: function(res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '友善发言的人运气不会太差。',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(err) {
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

    this.setData({
      pinglun: "",
    });

    const comments_collection2 = app.globalData.db.collection('qyzx_comments');
    comments_collection2.where({
        textID: this.data.textId
      }).orderBy('due', 'desc')
      .get().then(res => {
        console.log('按时间排序后：', res.data)
        this.setData({
          'commentList': res.data
        })
        console.log('commentList:', this.data.commentList)
      });

  },

  sugInput: function(e) {
    this.setData({
      pinglun: e.detail.value
    })
  },

  zan: function(e) {
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/home/login/login',
            })
          } else if (res.cancel) {}
        }
      })
      return;
    }
    const praise_collection = app.globalData.db.collection('qyzx_praise');

    praise_collection.where({
      'textID': this.data.textId,
      'userID': app.globalData.userInfo._id
    }).get().then(res => {
      console.log("赞记录", res)
      if (res.data.length == 0) {
        //用户未赞过该帖子
        praise_collection.add({
          data: {
            due: new Date(),
            textID: new String(this.data.textId),
            userID: new String(app.globalData.userInfo._id)
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log('add zan ', res)
          }
        })
        const _ = app.globalData.db.command;
        var text_doc = app.globalData.db.collection('qyzx_texts').doc(this.data.textId)
        text_doc.update({
          data: {
            // 将赞自增 1
            ding: _.inc(1)
          },
          success: function(res) {
            console.log(res)
          }
        })

        text_doc.get().then(res => {
          console.log('刷新:', res.data)
          this.setData({
            zans: res.data.ding
          })
        })

      } else {
        //用户已经赞过该帖子
        wx.showModal({
          title: '提示',
          content: '每个人只能赞一次哦',
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
  },

  onLoad: function(e) {
    // 页面初始化 objectId为页面跳转所带来的参数
    var textId = e.objectId;
    var that = this;
    console.log('onload执行')
    const _ = app.globalData.db.command

    app.globalData.db.collection('qyzx_texts').doc(textId).get().then(res=> {
      var duestr=String(res.data.due).split(" ").slice(1,5).join(" ")

      
      that.setData({
        rows: res.data,
        rows_due:duestr,
        textId: textId,
        zans: res.data.ding
      })
      console.log('rows', that.data.rows)
    })

    app.globalData.db.collection('qyzx_texts').doc(textId).update({
      data: {
        // 将浏览量自增 1
        viewed: _.inc(1)
      },
      success: function(res) {
        console.log(res)
      }
    })


    app.globalData.db.collection('qyzx_comments').where({
      textID: textId
    }).get().then( res => {
      console.log(res.data)
      this.setData({
        'commentList': res.data
      })
      console.log('commentList:', this.data.commentList)
    })

  },

  onReady: function() {},

  onShow: function() {

  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  //下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    app.globalData.db.collection('qyzx_comments').where({
      textID: this.data.textId
    }).get({
      success: function(res) {
        console.log(res.data)
        this.setData({
          'commentList': res.data
        })
        console.log('commentList:', this.data.commentList)
      }
    });

    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 500);
  },

})