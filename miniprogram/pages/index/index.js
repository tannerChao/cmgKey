//index.js
const moment =require('../../utils/moment.min.js')
const app = getApp();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    baner: [],
    hotProduct:[],
    new: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    canIUse: wx.canIUse('button.open-type.onGetUserInfo'),

    headerMenus: [
      {
        url:'../../images/headerMenu/about_us.png',
        text:'关于我们',
        pageUrl:'/pages/about/about',
        goPageFunction:'menusNavigateTo'
      },
      {
        url:'../../images/headerMenu/product_us.png',
        text:'产品中心',
        pageUrl:'/pages/product/product',
        goPageFunction:'menusSwitchTabTo'
      },
      {
        url:'../../images/headerMenu/new_us.png',
        text:'新闻中心',
        pageUrl:'/pages/news/news',
        goPageFunction:'menusNavigateTo'
      },
      {
        url:'../../images/headerMenu/message_us.png',
        text:'联系我们',
        pageUrl:'/pages/contact/contact',
        goPageFunction:'menusSwitchTabTo'
      }
    ],


  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.onGetBaner();
    this.onGetProduct();
    this.onGetNew();
    

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res,res.authSetting['scope.userInfo']);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              this.setData({
                encryptedData: res.encryptedData,
                signature: res.signature,
                userInfo: res.userInfo
              })
              app.globalData.userInfo=res.userInfo
            }
          })
        }
      }
    })
  },


  onGetUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid:  function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  onGetBaner: function() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getBaner',
      data: {
        conditions:{},
        functions: 'getInfo',  
      },
      success: res =>{
        that.setData({
          baner:res.result.data
        })
        wx.hideLoading()
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  onGetProduct: function() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        conditions:{isHot: 1},
        functions: 'getHot',  
      },
      success: res =>{
        that.setData({
          hotProduct:res.result.data
        });
        wx.hideLoading()
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  onGetNew: function() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getNews',
      data: {
        conditions:{category: 0},
        functions: 'getNew',  
      },
      success: res =>{
        let array = [];
        if(res.result.data.length > 0){
          array=res.result.data.map(o=>{
            return Object.assign({}, o, { timeText: moment(o.time).format('YYYY-MM-DD')})
          })
        }
        that.setData({
          new: array
        })
        wx.hideLoading()
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  menusNavigateTo:(e)=>{
    wx.navigateTo({
      url: e.currentTarget.dataset.pageurl
    })
  },
  menusRedirectTo:(e)=>{
    wx.reLaunch({
      url: e.currentTarget.dataset.pageurl
    })
  },
  menusSwitchTabTo:(e)=>{
    wx.switchTab({
      url: e.currentTarget.dataset.pageurl
    })
  },
  text: function(){
    console.log(wx.openUrl)
    // wx.openUrl('http://api.kmv18.net/g/okrex7')
  },
  goProductDetails: function(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/productDetails/productDetails?url=${url}`
    })
  },
  goNewDetails: function(e){
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
    }
})
