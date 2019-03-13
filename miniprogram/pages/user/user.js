//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {avatarUrl:'../../images/common/xsy.png'},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    admin: []
  },
  //事件处理函数
  loadMoreProduct:(e)=>{
      console.log(e)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    if(app.globalCompanyData.taobao){
      this.setData({
        companyInfo: app.globalCompanyData,
      }) 
    }else{
      this.getCompany()
    }
    if(app.globalData.admin){
      this.setData({
        admin: app.globalData.admin,
      }) 
    }else{
      this.getAdmin()
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getCompany: function(){
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getCompany',
      data: {
        conditions:{},
        functions: 'getInfo',  
      },
      success: res =>{
        that.setData({
          companyInfo:res.result.data[0]
        })
        app.globalCompanyData=res.result.data[0];
        wx.hideLoading()
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err);
        wx.hideLoading()
      }
    })
  },
  getAdmin: function(){
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {
        conditions:{},
        functions: 'getAdmin',  
      },
      success: res =>{
        that.setData({
          admin:res.result.data
        })
        app.globalData.admin=res.result.data;
        wx.hideLoading()
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err);
        wx.hideLoading()
      }
    })
  },
  taobao: function(){
    wx.setClipboardData({
      data: this.data.companyInfo.taobao,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showModal({
              title: '复制成功',
              content: '由于微信限制,请在浏览器中打开淘宝商城',
              mask: true,
              showCancel: false,
              confirmColor: "#1C82F8"
            })
          }
        })
      }
    })
    // wx.navigateTo({
    //   url: `/pages/web/web?url=${this.data.companyInfo.taobao}`
    // })
  },
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容  
    // 返回shareObj
    return app.share;
  },
  goXitong: function(){
    wx.navigateTo({
      url: '/pages/xitong/xitong'
    })
  }
})