// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const salesman = new Salesman();
  return await salesman[event.functions](event.conditions)
}

class Salesman {
  async getInfo(info) {
    const db = cloud.database();
    return await db.collection('salesman').where({
      ...info
    }).get({
      success: res => {
        return res;
      }
    });
  }
}