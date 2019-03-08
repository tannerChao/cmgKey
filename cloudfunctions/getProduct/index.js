// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const product = new Product();
  return await product[event.functions](event.conditions)
}

class Product {
  async getHot(info) {
    const db = cloud.database();
    return await db.collection('product').where({
      ...info
    }).get({
      success: res => {
        return res;
      }
    });
  }
}