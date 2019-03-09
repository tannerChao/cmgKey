//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cmgkey-6a9d88',
        traceUser: true,
      })
    }

    this.globalData = {}
    this.globalCompanyData = {}
    this.share =  {
      title: "江门金锁匙电器",        // 默认是小程序的名称(可以写slogan等)
      path: '/pages/index/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '../../images/common/share.jpg',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {},
      fail: function () {},
      complete: function(){}
    }
  }
})
