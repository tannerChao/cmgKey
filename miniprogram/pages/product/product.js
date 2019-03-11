//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    second_height:0,
    info:{},
    listInfo:[],
    listInfoState: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  menusNavigateTo:()=>{
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  loadMoreProduct:(e)=>{
      console.log(e)
  },
  onLoad: function () {
    
    this.onGetProduct(0);
    this.onGetProductType();
  },
  search: function(){
    wx.navigateTo({
      url: "/pages/productSearch/productSearch"
    })
  },
  onClickProduct: function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    if(!this.data.info[`product${id}`]){
        this.onGetProduct(id);
    }
    this.setData({
      listInfoState: id
    })
  },
  onGetProduct: function(id){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        conditions:{category: id},
        functions: 'ordinary',  
      },
      success: res => {
        this.setData({
          info: {
            [id]: res.result.data
          }
        });
        console.log(this.data.info)
        wx.hideLoading()
      },
      fail: err => {
        console.log('调用函数失败');
        wx.hideLoading()
      }
    })
  },
  onGetProductType: function(){
    wx.cloud.callFunction({
      name: 'getProduct',
      data: {
        conditions:{},
        functions: 'getTpye',  
      },
      success: res => {
        this.setData({
          listInfo: res.result.data
        });
        wx.hideLoading()
      },
      fail: err => {
        wx.hideLoading()
      }
    })
  },
  goProductDetails: function(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/productDetails/productDetails?url=${url}`
    })
  },
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容  
    // 返回shareObj
    return Object.assign({},app.share,{path: '/pages/product/product'});
    }
})
