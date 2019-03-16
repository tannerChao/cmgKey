// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const baner = new Baner();
  return await baner[event.functions](event.conditions);
}
class Baner {

  async getInfo(info) {
    const db = cloud.database();
    return await db.collection('baner').get({
      success: res=> {
        return res;
      }
    });
  }

  async addInfo(info) {
    const db = cloud.database();
    return await db.collection('baner').add({
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
    return await db.collection('baner').doc(info._id).remove({
      success: res=> {
        return res;
      }
    });
  }

}