// pages/refund/refund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1:false,
    img2:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var arr = JSON.parse(options.item)
    let that = this
    console.log(arr)
    that.setData({
      arr
    })
  },
})