//logs.js
const app = getApp();

Page({
  data: {
    logs: [],
    info: {},
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
    }, {
      latitude: 22.5911430000,
      longitude: 113.039986,
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
    scaleNum: 15,
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
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    });
    if(app.globalCompanyData.taobao){
      this.setData({
        info: app.globalCompanyData,
      }) 
    }else{
      this.getCompany()
    }
    this.getLocation()
  },
  getCompany: function(){
    let that = this;
    wx.cloud.callFunction({
      name: 'getCompany',
      data: {
        conditions:{},
        functions: 'getInfo',  
      },
      success: res =>{
        that.setData({
          info:res.result.data[0]
        })
        app.globalCompanyData=res.result.data[0]
      },
      fail: err =>{
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  addScale: function(e){
    let { scaleNum } = this.data;
    if(scaleNum < 18){
      scaleNum++;
      this.setData({
        scaleNum
        }
      )
    }
  },
  jianScale: function(e){
    let { scaleNum } = this.data;
   if( scaleNum > 14){
      scaleNum--;
      this.setData(
        {
          scaleNum
        }
      )
    }
  },
})