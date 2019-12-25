 // pages/Purchase/Purchase.js
let WXAPI = require("../../utils/main.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tj:function(){
    wx.navigateTo({
      url: '../placeorder/placeorder?id='+this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    let id = options.id
    that.setData({
      id: id
    })
    console.log(id)
    WXAPI.name_list2(
      id = id
    ).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        res.data.startDate = res.data.startDate.split(' ')[0]
        res.data.endDate = res.data.endDate.split(' ')[0]
        that.setData({
          item: res.data,
          startDate: res.data.startDate,
          endDate: res.data.endDate
        })

        console.log(that.data.item)
      } else {
        console.log("请求错误")
      }
    })
  },
})