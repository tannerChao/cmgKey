// component/imageBox/imageBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: { // 属性名 
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
      value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个 
    }, 
    name: { // 属性名 
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
      value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个 
    }, 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapChild: function(event){
        console.log(event)
        // 触发事件的选项
        var myEventOption = {} 
        let myArgus = {name: event.currentTarget.dataset.name}
        // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
        this.triggerEvent('parentEvent',myArgus, myEventOption)
    }
  }
})
