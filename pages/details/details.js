// pages/details/details.js
let WXAPI = require("../../utils/main.js")

Page({
  data: {
    orderId: ''
  },
  onLoad: function(options) {
    console.log(options)
    let that = this
    let orderId = options.orderid
    that.setData({
      orderId
    })
    WXAPI.name_list4(
      orderId
    ).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        res.data.startDate = res.data.produceSnapshot.startDate.split(' ')[0],
          res.data.endDate = res.data.produceSnapshot.endDate.split(' ')[0]
        that.setData({
          item: res.data,
          startDate: res.data.startDate,
          endDate: res.data.endDate
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  //取消订单
  qx: function() {
    let that = this
    console.log(e)
    let orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      success(res) {
        if (res.confirm) {
          WXAPI.name_list27(
            orderId
          ).then(function(res) {
            if (res.respCode && res.respCode === "00") {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              console.log("请求错误")
            }
          })
        } else if (res.cancel) {}
      }
    })
  },
  //申请退款
  refund: function() {
    wx.navigateTo({
      url: '../Application/Application?orderId=' + this.data.orderId + '&produceName=' + this.data.item.produceSnapshot.name + '&refundAmt=' + this.data.item.produceSnapshot.discountPrice,
    })
  },
  //删除订单
  delete: function() {
    wx.showModal({
      title: '提示',
      content: '是否删除该订单',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //取消退款
  Cancellation: function() {
    wx.showModal({
      title: '提示',
      content: '是否取消该订单退款申请',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //退款详情
  Detailsrefund: function() {
    wx.navigateTo({
      url: '../refund/refund',
    })
  },
  fk(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../placeorder/placeorder?id=' + id,
    })
  }
})