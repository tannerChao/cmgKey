Component({
    /** 
     * 私有数据,组件的初始数据 
     * 可用于模版渲染 
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持 
    },
    data: { // 弹窗显示控制 
        isShow: false
    },
    /**
     * 组件的方法列表 
     * 更新属性和数据的方法与更新页面数据的方法类似 
    */
    methods: {
        actionSheetTap() {
            console.log(11)
            wx.showActionSheet({
                itemList: ['item1', 'item2', 'item3', 'item4'],
                success(e) {
                    console.log(e.tapIndex)
                }
            })
        }
    }

})