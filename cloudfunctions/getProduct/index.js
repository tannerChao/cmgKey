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
  async ordinary(info) {
    const db = cloud.database();
    return await db.collection('product').where({
      ...info
    }).get({
      success: res => {
        return res;
      }
    });
  }
  async getAll(info) {
    const db = cloud.database();
    return await db.collection('text').get({
      success: res => {
        return res;
      }
    });
  }
  async getTpye() {
    const db = cloud.database();
    return await db.collection('productType').get({
      success: res => {
        return res;
      }
    });
  }

  async addInfo(info) {
    const db = cloud.database();
    return await db.collection('text').add({
      data: {
        description: 'learn cloud database',
        ...info
      },
      success: res=> {
        return res;
      }
    });
  }

  async deleteInfo(info) {
    const db = cloud.database();
    return await db.collection('text').doc(info._id).remove({
      success: res=> {
        return res;
      }
    });
  }


}