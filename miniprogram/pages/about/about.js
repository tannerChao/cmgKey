//logs.js

Page({
  data: {
    logs: [],
    swipers: [
      '../../images/common/swiper_1.jpg', '../../images/common/swiper_1.jpg', '../../images/common/swiper_1.jpg'
    ],
    news:[
        {
          url:'../../assets/image/fengshan-1.jpg',
          text:'关于我们',
          page:'pages/index/index'
        },
        {
          url:'../../assets/image/fengshan-2.jpg',
          text:'产品中心',
          page:'pages/index/index'
        },
        {
          url:'../../assets/image/swiper_1.jpg',
          text:'新闻中心',
          page:'pages/index/index'
        },
        {
          url:'../../assets/image/swiper_1.jpg',
          text:'联系我们',
          page:'pages/index/index'
        }
    ],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})