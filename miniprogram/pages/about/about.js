//logs.js
const moment =require('../../utils/moment.min.js')

Page({
  data: {
    logs: [],
    swipers: [
      '../../images/common/swiper_1.jpg', '../../images/common/swiper_2.jpg', '../../images/common/swiper_3.jpg'
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
        conditions:{category: 1},
        functions: 'getNew',  
      },
      success: res =>{
        let array = [];
        if (res.result.data.length > 0) {
          array = res.result.data.map(o => {
            return Object.assign({}, o, { timeText: moment(o.time).format('YYYY-MM-DD')})
          })
        }
        that.setData({
          news: array
        })
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
})