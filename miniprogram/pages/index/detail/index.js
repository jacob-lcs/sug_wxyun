// pages/index/detail/index.js
var app = getApp();
let that = this;
const {
  $Toast
} = require('../../../dist/base/index');
var textId = ''
var pinglun = ''

Page({
  data: {
    rows: {},
    rows_due: '',
    zans: 0,
    PlId: '',
    textId: '',
    textList: [],
    pinglun: '',
    hiddenmodalput: true,
    commentList: {},
    comment_due: ''
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
    pinglun = this.data.pinglun
    textId = this.data.textId
    this.setData({
      hiddenmodalput: true
    })
    wx.request({
      url: 'https://www.lcscoder.cn/minganci',
      data: {
        sentence: this.data.pinglun
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var s = res.data['sentence']
        console.log("请求结果为：", s)

        //插入一条评论数据
        const comments_collection = app.globalData.db.collection('qyzx_comments');
        comments_collection.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            due: new Date(),
            content: s,
            commentator: app.globalData.userInfo.nickName,
            textID: textId,
            deleted: false
          },
          success: function(res) {
            console.log(res)
            $Toast({
              content: '友善发言的人运气不会太差。',
              type: 'success'
            });
          },
          fail: function(err) {
            console.log(err)
            $Toast({
              content: '提交失败,请检查网络',
              type: 'error'
            });
          }
        })

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
      }
    })



  },

  sugInput: function(e) {
    this.setData({
      pinglun: e.detail.value
    })
  },

  dele: function() {
    console.log("删除函数运行")
    console.log("这篇文章的id是：", this.data.textId)
    app.globalData.db.collection('qyzx_texts').doc(this.data.textId).update({
      data: {
        deleted: true
      },
      success: function(res) {
        console.log(res)
      }
    })
    wx.showModal({
      title: '提示',
      content: '删除成功！',
    })
  },

  zan: function(e) {
    const praise_collection = app.globalData.db.collection('qyzx_praise');

    //在qyzx_praise中查找是否当前用户赞过该帖子
    praise_collection.where({
      '_openid': app.globalData.openid,
      'textID': this.data.textId
    }).get().then(res => {
      console.log("赞记录", res)
      if (res.data.length == 0) {
        //用户未赞过该帖子,新增qyzx_praise记录
        praise_collection.add({
          data: {
            due: new Date(),
            textID: new String(this.data.textId),
            //userID: new String(app.globalData.openid)
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log('add zan ', res)
          }
        })

        //用户未赞过该帖子
        //刷新界面上的点赞数
        var d = this.data.zans
        this.setData({
          zans: d + 1
        })
        const _ = app.globalData.db.command
        app.globalData.db.collection('qyzx_texts').doc(this.data.textId).update({
          data: {
            // 将浏览量自增 1
            ding: _.inc(1)
          },
          success: function(res) {
            console.log(res)
          }
        })

      } else {
        //用户已经赞过该帖子
        $Toast({
          content: '每个人只能赞一次哦',
          icon: 'praise'
        });
      }
    })
  },



  onLoad: function(e) {
    // 页面初始化 objectId为页面跳转所带来的参数
    var textId = e.objectId;
    console.log("e", e)
    var that = this;
    console.log('onload执行')
    const _ = app.globalData.db.command

    app.globalData.db.collection('qyzx_texts').doc(textId).get().then(res => {
      var duestr = String(res.data.due).split(" ").slice(1, 5).join(" ")


      that.setData({
        rows: res.data,
        rows_due: duestr,
        textId: textId,
        zans: res.data.ding,
        master: app.globalData.master
      })
      console.log('rows', that.data.rows)
      console.log('textID', this.data.textId)
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
    }).get().then(res => {
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