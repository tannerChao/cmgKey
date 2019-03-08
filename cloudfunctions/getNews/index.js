// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const news = new News();
  return await news[event.functions](event.conditions)
}

class News {
  async getNew(info) {
    const db = cloud.database();
    return await db.collection('new').where({
      ...info
    }).get({
      success: res => {
        return res;
      }
    });
  }
}