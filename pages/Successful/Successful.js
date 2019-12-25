// pages/Successful/Successful.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back: function() {
    wx.navigateBack({
      delta: 999
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let paySign = options.paySign
    this.setData({
      paySign: paySign
    })
  },
  //查看订单
  ckdd(){
    wx.navigateTo({
      url: '../Order/Order',
    })
  }
})