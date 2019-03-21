const moment =require('../../utils/moment.min.js')

Page({
  data: {
    news:[],
    details:''
  },
  onLoad: function () {

    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    this.onGetNew();

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onGetNew: function() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getNews',
      data: {
        conditions:{},
        functions: 'getNew',  
      },
      success: res =>{
        let array = [];
        if(res.result.data.length > 0){
          array=res.result.data.map(o=>{
            return Object.assign({}, o, { timeText: moment(o.time).format('YYYY-MM-DD')})
          })
        }
        console.log(array);
        that.setData({
          news: array
        })
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  goDetails: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/newDetails/newDetails?id=${id}`
    })
  },
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容  
    // 返回shareObj
    return app.share;
  },
  downloadFile: function(e){
    let type = e.currentTarget.dataset.type;
    let url = e.currentTarget.dataset.url;
    let that = this;
    console.log(e);
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getNews',
      data: {
        conditions:{fileID:url},
        functions: 'getDetails',  
      },
      success: res =>{
        console.log(res)
          if(res.result.errMsg=='ok'){
            const FileSystemManager = wx.getFileSystemManager();
            wx.downloadFile({
              url: res.result.tempFileURL,
              success: function (res) {
                var filePath = res.tempFilePath;
                console.log(filePath);
                FileSystemManager.readFile({
                  filePath: filePath,
                  encoding:'utf8',
                  success: res => {
                    console.log(res)
                    console.log("打开文档成功:" + url);
                    that.setData({
                      details: res.data
                    })
                    wx.hideLoading();
                  },
                  fail: function (r) {
                    console.log(r);
                    wx.hideLoading();
                    wx.showToast({
                      title: '打开失败',
                      duration: 2000
                    })
                  },
                  complete: function (r) {
                    console.log(r);
                    wx.hideLoading();
                  }
                })
              },
              fail: function (r) {
                console.log("下载失败:" + url + "." + r);
                wx.hideLoading();
                wx.showToast({
                  title: '下载失败',
                  duration: 2000
                })
              }
            })
        
              wx.hideLoading()
          }
          wx.hideLoading()
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err);
        wx.hideLoading()
      }
    })
    
    // const res = await cloud.downloadFile({
    //   fileID: url,
    // })
    // const buffer = res.fileContent;
    // console.log(buffer)
    // this.setData({
    //   details:buffer.toString('utf8')
    //  })
    
  },
  base64_decode: function (input) { // 解码，配合decodeURIComponent使用
      const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let output = "";
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
          enc1 = base64EncodeChars.indexOf(input.charAt(i++));
          enc2 = base64EncodeChars.indexOf(input.charAt(i++));
          enc3 = base64EncodeChars.indexOf(input.charAt(i++));
          enc4 = base64EncodeChars.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }
      }
      return this.utf8_decode(output);
  },
  utf8_decode: function (utftext) { // utf-8解码
      let string = '';
      let i = 0;
      let c = 0;
      let c1 = 0;
      let c2 = 0;
      while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          } else if ((c > 191) && (c < 224)) {
              c1 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
              i += 2;
          } else {
              c1 = utftext.charCodeAt(i + 1);
              c2 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
              i += 3;
          }
      }
      return string;
  }
})
