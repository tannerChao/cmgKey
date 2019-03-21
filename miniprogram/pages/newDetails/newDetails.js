const WxParse = require("../../wxParse/wxParse.js");
const moment =require('../../utils/moment.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:  {},
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetNew(options.id)
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

  onGetNew: function(id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getNews',
      data: {
        conditions:{_id:id},
        functions: 'getNew',  
      },
      success: res =>{
        console.log(res);
        var that = this;
        this.setData({
          content: res.result.data[0],
          time: moment(res.result.data[0].time).format('YYYY-MM-DD')
        });
        var article = res.result.data[0].details; 
        WxParse.wxParse('article', 'html', article, that, 5);
        wx.hideLoading();
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err);
        wx.hideLoading();
      }
    })
  },

})