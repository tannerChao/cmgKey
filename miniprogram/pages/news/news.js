const moment =require('../../utils/moment.min.js')

Page({
  data: {
    news:[]
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
  goNews: function(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/web/web?url=https://mp.weixin.qq.com/tmpl/0_4487865-zh_CN.html`
    })
  },
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容  
    // 返回shareObj
    return app.share;
    }
})
