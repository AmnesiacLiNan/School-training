// pages/Authorized/Authorized.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //同意跳转

  bindInfo: function (e) {
    if (e.detail.userInfo) {
      console.log('授权通过')
      wx.reLaunch({
        url: '../index/index',
      })
    } else {
      console.log('拒绝授权')
      wx.reLaunch({
        url: '/pages/Authorized/Authorized',
      })
    }
  },
  onLoad: function(options) {

  },
})