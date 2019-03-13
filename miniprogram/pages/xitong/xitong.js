// miniprogram/pages/xitong/xitong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfoState: 0,
    listInfo:[
      {title:'首页',category: 0},
      {title:'产品中心',category: 1},
      {title:'新闻详情',category: 2},
      {title:'管理员',category: 3},
      {title:'公司信息',category: 4},
      {title:'个人信息',category: 5},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  },
  onClickProduct: function(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      listInfoState: id
    })
  }
})