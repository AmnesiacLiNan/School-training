// pages/Application/Application.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img1: true,
    img2: false
  },
  //提交
  go: function() {
    let that = this
    let produceName = that.data.produceName
    let orderId = that.data.orderId
    let payee = that.data.zfbname
    let account = that.data.zfbnumber
    let refundAmt = that.data.refundAmt
    let refundReason = that.data.text
    WXAPI.name_list28({
      orderId,
      produceName,
      payee,
      payType: 0,
      account,
      refundAmt,
      refundReason
    }).then(function(res) {
      console.log("退款提交", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data,
        })
        var arr = JSON.stringify(that.data.item)
        wx.redirectTo({
          url: '../refund/refund?item=' + arr //对于传递多个参数数据
        })
      } else {
        console.log("请求错误")
      }
    })

  },
  go2: function() {
    let that = this
    let produceName = that.data.produceName
    let orderId = that.data.orderId
    let payee = that.data.yhk
    let account = that.data.yhknumber
    let bankName = that.data.yhkname
    let refundAmt = that.data.refundAmt
    let refundReason = that.data.text
    WXAPI.name_list28({
      orderId,
      produceName,
      payee,
      payType: 2,
      account,
      bankName,
      refundAmt,
      refundReason
    }).then(function(res) {
      console.log("退款提交", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data,
        })
        var arr = JSON.stringify(that.data.item)
        wx.redirectTo({
          url: '../refund/refund?item=' + arr //对于传递多个参数数据
        })
      } else {
        console.log("请求错误")
      }
    })
    wx.redirectTo({
      url: '../refund/refund' //对于传递多个参数数据
    })
  },
  //支付宝或银行卡
  tap1: function() {
    this.setData({
      img1: true,
      img2: false
    })
  },
  tap2: function() {
    this.setData({
      img1: false,
      img2: true
    })
  },
  //获取名字
  bindInput: function(e) {
    let name = e.detail.value
    this.setData({
      name: name
    })
  },
  //获取退款原因
  bindtext: function(e) {
    console.log(e)
    let text = e.detail.value
    this.setData({
      text: text
    })
  },
  //支付宝
  bindzfb: function(e) {
    console.log(e)
    let zfbname = e.detail.value
    this.setData({
      zfbname: zfbname
    })
  },
  bindzfbnumber: function(e) {
    console.log(e)
    let zfbnumber = e.detail.value
    this.setData({
      zfbnumber: zfbnumber
    })
  },
  //银行卡
  bindyhk: function(e) {
    console.log(e)
    let yhk = e.detail.value
    this.setData({
      yhk: yhk
    })
  },
  bindyhkname: function(e) {
    console.log(e)
    let yhkname = e.detail.value
    this.setData({
      yhkname: yhkname
    })
  },
  bindyhknumber: function(e) {
    console.log(e)
    let yhknumber = e.detail.value
    this.setData({
      yhknumber: yhknumber
    })
  },
  onLoad: function(options) {
    console.log(options)
    let orderId = options.orderId
    let produceName = options.produceName
    let refundAmt = options.refundAmt
    this.setData({
      orderId,
      produceName,
      refundAmt
    })
  },

})