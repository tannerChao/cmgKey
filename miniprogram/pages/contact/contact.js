//logs.js

Page({
  data: {
    logs: [],
    swipers: [
      '../../assets/image/swiper_1.jpg', '../../assets/image/swiper_1.jpg', '../../assets/image/swiper_1.jpg'
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
    duration: 500,
    latitude: 22.5911430000,
    longitude: 113.039986,
    markers: [{
      latitude: 22.5911430000,
      longitude: 113.039986,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 22.5911430000,
      longitude: 113.039986,
      iconPath: '/image/location.png'
    }, {
      latitude: 22.5911430000,
      longitude: 113.039986,
      iconPath: '/image/location.png'
    }],
    polygons: [{
      points: [
        {
          latitude: 23.099994,
          longitude: 113.324520,
        },
        {
          latitude: 23.098994,
          longitude: 113.323520,
        },
        {
          latitude: 23.098994,
          longitude: 113.325520,
        }
      ],
      strokeWidth: 3,
      strokeColor: '#FFFFFFAA',
    }],
    subKey: 'B5QBZ-7JTLU-DSSVA-2BRJ3-TNXLF-2TBR7',
    enable3d: false,
    showCompass: false,
    enableOverlooking: false,
    enableZoom: true,
    enableScroll: true,
    enableRotate: false,
    drawPolygon: false,
  },
  getLocation() {
    const that = this
    wx.getLocation({
      success(res) {
        console.log(res)
        
      }
    })
  },
  onLoad: function () {
    this.getLocation()
  }
})