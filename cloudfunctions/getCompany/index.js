// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const company = new Company();
  return await company[event.functions](event.conditions)
}

class Company {
  async getInfo(info) {
    const db = cloud.database();
    return await db.collection('company').get({
      success: res => {
        return res;
      }
    });
  }
}