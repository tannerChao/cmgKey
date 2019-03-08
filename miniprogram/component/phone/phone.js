Component({
    /** 
     * 私有数据,组件的初始数据 
     * 可用于模版渲染 
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持 
    },
    data: { // 弹窗显示控制 
        isShow: false,
        info: []
    },
    /**
     * 组件的方法列表 
     * 更新属性和数据的方法与更新页面数据的方法类似 
    */
    methods: {
        showPhone() {
             this.getSalesman();  
        },
        getSalesman(){
            wx.cloud.callFunction({
                name: 'getSalesman',
                data:{
                    conditions:{},
                    functions: 'getInfo',  
                },
                success: res =>{
                    let array = [];
                    this.setData({
                        info: res.result.data
                    })
                    if(res.result.data.length > 0){
                        array=res.result.data.map(o=>{
                            return `${o.name}-${o.phone}`
                        })
                        wx.showActionSheet({
                            itemList: array,
                            success(e) {
                                wx.makePhoneCall({
                                    phoneNumber: '13128987924' // 仅为示例，并非真实的电话号码
                                })
                            }
                        })
                    }
                    
                  },
                  fail: err =>{
                    console.error('[云函数] [login] 调用失败', err)
                  }
            })
        }
    }

})