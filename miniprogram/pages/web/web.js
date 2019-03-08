//logs.js

Page({
  data: {
    logs: []
  },
  onLoad: function (query) {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      url: query.url
    })
  }
})