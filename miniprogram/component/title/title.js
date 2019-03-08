Component({ 
    /** 
     * 私有数据,组件的初始数据 
     * 可用于模版渲染 
     */ 
    options: { 
        multipleSlots: true // 在组件定义时的选项中启用多slot支持 
    }, 
    properties: {
        // 弹窗标题 
        title: { // 属性名 
          type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
          value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个 
        }, 
    }, 
    data: { // 弹窗显示控制 
      isShow: false
    }, 
    /**
     * 组件的方法列表 
     * 更新属性和数据的方法与更新页面数据的方法类似 
    */ 
    methods: { 
    } 
  })