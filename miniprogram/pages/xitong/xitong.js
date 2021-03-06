const WxParse = require("../../wxParse/wxParse.js");
const moment =require('../../utils/moment.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfoState: 0,
    listInfo:[
      {title:'首页',category: 0,database: 'getBaner',dataWay:'getInfo',add:'addInfo'},
      {title:'产品中心',category: 1,database: 'getProduct',dataWay:'getAll',add:'addInfo'},
      {title:'新闻详情',category: 2,database: 'getNews',dataWay:'getAll',add:'addInfo'},
      {title:'管理员',category: 3,database: 'admin',dataWay:''},
      {title:'公司信息',category: 4,database: 'company',dataWay:''},
    ],

    productInfo:{
      title:'',
      content:'',
      modelNum:'',
      price:0,

    },
    getProductDetailsYuLan:'',
    productDetails:'',
    productLogo: [],

    info:[],
    tabBarState: 0,
    chooseImage: [],
    banerTitile: '',
    
    newTitile:'',
    newContentText:'',
    newsDetails:'',
    newsDetailsYuLan: '',
    newsLogo: [],

    typeItem:[{
      id: '0', value: '破壁机',checked:true
    },{
      id: '2', value: '吊扇灯',checked:false
    },
    {
      id: '1', value: '茶具',checked:false
    }],
    isHotItem:[{
      id: '0', value: '否',checked:true
    },
    {
      id: '1', value: '是',checked:false
    }],

    productLogo: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetails(0);  
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
    this.getDetails(id)
  },

  getDetails: function(id){
    let o = this.data.listInfo[id];

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: o.database,
      data: {
        conditions:{},
        functions: o.dataWay,  
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
        console.log(err);
        wx.hideLoading()
      }
    })
  },
  detlate: function(e){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let id = e.currentTarget.dataset.id;
    let way = e.currentTarget.dataset.way;
    let index = e.currentTarget.dataset.index;
    wx.cloud.callFunction({
      name: this.data.listInfo[index].database,
      data: {
        conditions:{_id:id},
        functions: way,  
      },
      success: res => {
        this.setData({
          info: {
            [index]: this.data.info[index].filter(o=>{
              return o._id!==id
            })
          }
        });
        wx.hideLoading()
      },
      fail: err => {
        wx.hideLoading()
      }
    })
  },
  setTabBarState: function(event){
    const id = event.detail.id;
    // console.log(event)
    this.setData({
        tabBarState: id
    })
    if(id==0){
      this.getDetails(this.data.listInfoState);
      console.log(this.data.listInfo)
    }
  },
  chooseImage: function(e){
    let id = e.currentTarget.dataset.name;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data[id];
        images[0]=res.tempFilePaths[0]
        // 限制最多只能留下3张照片
        this.setData({
          [id]: images
        });
        console.log(this.data)
      }
    })
  },
  detleteImage: function(e){
    let name = e.detail.name;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      [name]:[]
    })
    wx.hideLoading()
  },

  //baner模块

  banerTitile: function(e){
    this.setData({
        banerTitile: e.detail.value
    })
  },
  banerSubmit: function(){
    if(this.data.chooseImage.length===0){
      wx.showToast({
        title:'照片不能为空',
        mask: true,
        icon: 'none'
      })
    }else if(this.data.banerTitile===''){
      wx.showToast({
        title:'标题不能为空',
        mask: true,
        icon: 'none'
      })
    }else{
      const cloudPath = this.data.banerTitile + this.data.chooseImage[0].match(/\.[^.]+?$/)[0];
      
      this.addData({
        cloudPath:`image/baner/${cloudPath}`,
        filePath: this.data.chooseImage[0],
      },{
        url:'',
        name: this.data.banerTitile
      },{
        name: 'fileid'
      })
    }
  },
  addData: function(imageInfo,info,cloudImageKey){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const that = this;
    wx.cloud.uploadFile({
      cloudPath:imageInfo.cloudPath,
      filePath:imageInfo.filePath,
      success: res => {
        const listInfoState = that.data.listInfoState;
        info[cloudImageKey.name]=res.fileID
        wx.cloud.callFunction({
          name: that.data.listInfo[listInfoState].database,
          data: {
            conditions:info,
            functions: that.data.listInfo[listInfoState].add,  
          },
          success: res => {
            wx.hideLoading()
          },
          fail: err => {
            wx.hideLoading();
          }
        })

      },
      fail: err => {
        wx.hideLoading();
      }
    }) 
  },

  //新闻模块

  setNewTitile: function(e){
    this.setData({
      newTitile: e.detail.value
    })
  },

  setNewContentText: function(e){
    this.setData({
      newContentText: e.detail.value
    })
  },

  editorNewsDetails: function(event) {
    this.getNewsDetailsYuLan(event.detail.value)
    this.setData({
      newsDetails: event.detail.value,
    })

  },

  getNewsDetailsYuLan: function(value){
    let array = value.split('&Br'); 
    let html=''
    console.log(array)
    array.forEach(o => {
      html=html+`<div style="${o.indexOf('<img')>-1?'':'text-indent:2em;'}text-align:left;padding:8px 0 0 0">${o}</div>`;
    });
    this.setData({
      newsDetailsYuLan: html
    })

    var that = this;
    var article = html; 
    WxParse.wxParse('article', 'html', article, that, 5);

  },

  setBr: function(){
    this.setData({
      newsDetails: `${this.data.newsDetails}&Br`
    })
  },

  getNewsImage: function(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.chooseImage;
        images[0]=res.tempFilePaths[0];
        console.log(res)
        // 限制最多只能留下3张照片
        this.setData({
            newsDetails: `${this.data.newsDetails}&Br<img src="${images[0]}" class='newImage' width='100%' alt="w">&Br`
        })
      }
    })
    
  },

  newSubmit: function(){
      
    if(this.data.newTitile==''){
      wx.showToast({title:'消息标题不能为空',mask: true,icon: 'none'});
      return;
    }
    if(this.data.newsLogo.length===0){
      wx.showToast({title:'消息图标不能为空',mask: true,icon: 'none'});
      return;
    } 
    if(this.data.newsDetails==''){
      wx.showToast({title:'消息内容不能为空',mask: true,icon: 'none'});
      return;
    }
    
    const cloudPath = moment().format('YYYY-MM-DD')+moment().get('seconds') + this.data.newsLogo[0].match(/\.[^.]+?$/)[0];
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    const that = this;
    wx.cloud.uploadFile({
      cloudPath:`image/new/${cloudPath}`,
      filePath: this.data.newsLogo[0],
      success: res => {

        let imgReg = /<img.*?(?:>|\/>)/gi;
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let arr = this.data.newsDetailsYuLan.match(imgReg); 
        let newsDetailsYuLan = that.data.newsDetailsYuLan
        let controlIndex = 0;
        for (let i = 0; i < arr.length; i++) {
          let src = arr[i].match(srcReg);
          let cloudChildPath = moment().format('YYYY-MM-DD')+moment().get('hours')+Math.ceil(Math.random()*1000)+moment().get('seconds') + src[1].match(/\.[^.]+?$/)[0];
          wx.cloud.uploadFile({
            cloudPath:`image/new/${cloudChildPath}`,
            filePath: src[1],
            success: res1 => {
              newsDetailsYuLan=newsDetailsYuLan.replace(src[1], res1.fileID);
              controlIndex++;
              if(controlIndex==arr.length){
                let info = {};
                info['category']=0;
                info['contentText']=that.data.newContentText;
                info['logo']=res.fileID;
                info['title']=that.data.newTitile;
                info['details']=newsDetailsYuLan;
                info['isHot']=0;
                info['reading']=900; 
                wx.cloud.callFunction({
                  name: 'getNews',
                  data: {
                    conditions:info,
                    functions: 'addInfo',  
                  },
                  success: res => {
                    wx.hideLoading();
                    console.log('曾加新闻成功')
                  },
                  fail: err => {
                    console.log(err)
                    wx.hideLoading();
                  }
                })
              } 
            },
            fail: err => {
              console.log(err)
              wx.hideLoading();
            }
          })   
        }
      },
      fail: err => {
        wx.hideLoading();
      }
    }) 
  },

  //产品增加

  productSubmit: function(){
      if(this.data.productLogo.length===0){
        wx.showToast({title:'产品图标不能为空',mask: true,icon: 'none'});
        return;
      }
      if(this.data.product.title==''){
        wx.showToast({title:'产品标题不能为空',mask: true,icon: 'none'});
        return;
      } 
      console.log(this.data.product)
      if(this.data.product.modelNum==''){
        wx.showToast({title:'产品型号不能为空',mask: true,icon: 'none'});
        return;
      }
      if(this.data.product.price==''){
        wx.showToast({title:'产品价格不能为空',mask: true,icon: 'none'});
        return;
      }
      if(this.data.product.productDetails==''){
        wx.showToast({title:'产品详情不能为空',mask: true,icon: 'none'});
        return;
      }

      const cloudPath = moment().format('YYYY-MM-DD')+moment().get('seconds') + this.data.productLogo[0].match(/\.[^.]+?$/)[0];
      wx.showLoading({
        title: '加载中',
        mask: true
      });

      let isHotState= this.data.isHotItem.filter(o=>{
        return o.checked
      })

      let istypeItem =  this.data.typeItem.filter(o=>{
        return o.checked
      })

      const that = this;
      wx.cloud.uploadFile({
        cloudPath:`image/text/${cloudPath}`,
        filePath: this.data.productLogo[0],
        success: res => {
  
          let imgReg = /<img.*?(?:>|\/>)/gi;
          let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          let arr = that.data.productsDetailsYuLan.match(imgReg); 
          let productsDetailsYuLan = that.data.productsDetailsYuLan
          let controlIndex = 0;
          for (let i = 0; i < arr.length; i++) {
            let src = arr[i].match(srcReg);
            let cloudChildPath = moment().format('YYYY-MM-DD')+moment().get('hours')+Math.ceil(Math.random()*1000)+moment().get('seconds') + src[1].match(/\.[^.]+?$/)[0];
            wx.cloud.uploadFile({
              cloudPath:`image/text/${cloudChildPath}`,
              filePath: src[1],
              success: res1 => {
                productsDetailsYuLan=productsDetailsYuLan.replace(src[1], res1.fileID);
                controlIndex++;
                if(controlIndex==arr.length){
                  let info = {};
                  info['fileid']=res.fileID;
                  info['title']=that.data.productInfo.title;
                  info['categoryText']=istypeItem[0].value;
                  info['category']=istypeItem[0].id; 
                  info['isHot']=isHotState[0].id; 
                  info['content']=that.data.productInfo.content; 
                  info['details']=productsDetailsYuLan;
                  info['price']=that.data.productInfo.price;
                  info['remaining']=99;
                  info['sold']=99;
                  info['modelNum']=that.data.productInfo.modelNum; 
                  info['name']=that.data.productInfo.modelNum; 
                  info['url']=''; 
                  
                  wx.cloud.callFunction({
                    name: 'getProduct',
                    data: {
                      conditions:info,
                      functions: 'addInfo',  
                    },
                    success: res => {
                      wx.hideLoading();
                      console.log('曾加产品成功')
                    },
                    fail: err => {
                      console.log(err)
                      wx.hideLoading();
                    }
                  })
                } 
                
              },
              fail: err => {
                console.log(err)
                wx.hideLoading();
              }
            })   
          }
        },
        fail: err => {
          wx.hideLoading();
        }
      })  


  },

  setValue: function(e){
    let name = e.currentTarget.dataset.argus;
    console.log(name,e.detail.value);
    this.setData({
      productInfo:{
        ...this.data.productInfo,
        [name]: e.detail.value
      }
    })
  },

  typeItemChange: function(e){
    let selecteds = e.currentTarget.dataset.json;
    let typeItem = this.data.typeItem;
    if(!selecteds.checked){
      typeItem.forEach(o=>{
        if(o.id==selecteds.id){
          o.checked=true
        }else{
          o.checked=false
        }
      });
      this.setData({
        typeItem
      })
    }
  },

  isHotItemChange: function(e){
    let selecteds = e.currentTarget.dataset.json;
    let isHotItem = this.data.isHotItem;
    if(!selecteds.checked){
      isHotItem.forEach(o=>{
        if(o.id==selecteds.id){
          o.checked=true
        }else{
          o.checked=false
        }
      });
      this.setData({
        isHotItem
      })
    }
  },

  editorProductDetails: function(event) {
    this.getProductDetailsYuLan(event.detail.value)
    this.setData({
      productDetails: event.detail.value,
    })

  },

  getProductDetailsYuLan: function(value){
    let array = value.split('&Br'); 
    let html=''
    console.log(array)
    array.forEach(o => {
      html=html+`<div style="${o.indexOf('<img')>-1?'':'text-indent:2em;'}text-align:left;font-size:0">${o}</div>`;
    });
    this.setData({
      productsDetailsYuLan: html
    })

    var that = this;
    var article = html; 
    WxParse.wxParse('product', 'html', article, that, 5);

  },

  getProductImage: function(){
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.chooseImage;
        images[0]=res.tempFilePaths[0];
        console.log(res)
        // 限制最多只能留下3张照片
        this.getProductDetailsYuLan(`${this.data.productDetails}&Br<img src="${images[0]}" class='newImage' width='100%' alt="w">&Br`)
        this.setData({
          productDetails: `${this.data.productDetails}&Br<img src="${images[0]}" class='newImage' width='100%' alt="w">&Br`, 
        });
        
      }
    })
    
  },

})