// 云函数入口文件
// const cloud = require('wx-server-sdk')
// cloud.init()
const db = wx.cloud.database()



// 云函数入口函数
exports.main = async(event, context) => {
  //取得传过来的参数, 可以使用{vote,id } = event 更简洁
  var vote = event.zans,
    id = event.id;
  console.log('云函数zan成功', vote, id)

  // console.warn(data)

  try {
    return await db.collection('qyzx_texts').doc(id).update({
      data: {
        vote: vote
      },
      success: res => {
        console.log('云函数成功', vote, id)

      },
      fail: e => {
        console.error(e)
      }
    })
  } catch (e) {
    console.error(e)
  }

}