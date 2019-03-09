// miniprogram/pages/productSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [], 
    searchData: [],
    searchVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetProduct()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this;
    // 设置菜单中的转发按钮触发转发事件时的转发内容  
    // 返回shareObj
    return app.share;
  },
  setSearchVal: function(e){
    this.setData({
      searchVal: e.detail.value
    })
    return e.detail.value
  },
  search: function(){
    let { searchVal, info } = this.data;
    console.log(searchVal,info)
    let array = info.filter(o=>{
      return o.categoryText.indexOf(searchVal)>-1 || o.content.indexOf(searchVal)>-1 || o.name.indexOf(searchVal)>-1 || o.title.indexOf(searchVal)>-1
    })
    console.log(array);
    this.setData({
      searchData: array
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
        conditions:{},
        functions: 'getAll',  
      },
      success: res => {
        this.setData({
          info: res.result.data
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
})