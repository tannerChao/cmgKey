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

  async getAll(info) {
    const db = cloud.database();
    return await db.collection('new').get({
      success: res=> {
        return res;
      }
    });
  }

  async addInfo(info) {
    const db = cloud.database();
    return await db.collection('new').add({
      data: {
        time: db.serverDate(),
        ...info
      },
      success: res=> {
        return res;
      }
    });
  }

  async deleteInfo(info) {
    const db = cloud.database();
    return await db.collection('new').doc(info._id).remove({
      success: res=> {
        return res;
      }
    });
  }

  async getDetails(info) {
    const fileID = info.fileID;
    const fileList = [fileID]
    const res = await cloud.getTempFileURL({
      fileList: fileList,
    })
    return res.fileList[0]
  }

}