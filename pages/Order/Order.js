let WXAPI = require("../../utils/main.js")
Page({
  data: {
    num: '01',
    item: []
  },
  //申请退款
  Application: function(e) {
    console.log(e)
    let orderId = e.currentTarget.dataset.id
    let refundAmt = e.currentTarget.dataset.money
    let produceName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '../Application/Application?orderId=' + orderId + '&refundAmt=' + refundAmt + '&produceName=' + produceName,
    })
  },
  onLoad: function(options) {
    var that = this
    let num = options.num
    that.setData({
      num: num
    })
    if (that.data.num == '01') {
      that.setData({
        status: ''
      })
    } else if (that.data.num == '02') {
      that.setData({
        status: '0'
      })
    } else if (that.data.num == '03') {
      that.setData({
        status: '1'
      })
    } else if (that.data.num == '04') {
      that.setData({
        status: '6'
      })
    } else if (that.data.num == '05') {
      that.setData({
        status: '4'
      })
    }
    console.log(that.data.status)
    WXAPI.name_list5({
      status: that.data.status,
      offset: 0,
      limit: 10
    }).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        for (var index in res.data) {
          res.data[index].startDate = res.data[index].startDate.split(' ')[0],
            res.data[index].endDate = res.data[index].endDate.split(' ')[0]
        }
        that.setData({
          item: res.data,
          startDate: res.data[index].startDate,
          endDate: res.data[index].endDate
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  //跳转
  orderId: function(options) {
    let orderid = options.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '../details/details?orderid=' + orderid,
    })
  },
  // 切换
  curriculum: function(e) {
    var that = this
    that.setData({
      num: e.target.dataset.num
    })
    if (that.data.num == '01') {
      that.setData({
        status: ''
      })
    } else if (that.data.num == '02') {
      that.setData({
        status: 0
      })
      console.log(that.data.status)
    } else if (that.data.num == '03') {
      that.setData({
        status: 1
      })
      console.log(that.data.status)
    } else if (that.data.num == '04') {
      that.setData({
        status: 6
      })
      console.log(that.data.status)
    } else if (that.data.num == '05') {
      that.setData({
        status: 4
      })
      console.log(that.data.status)
    }
    WXAPI.name_list5({
      status: that.data.status,
      offset: 0,
      limit: 10
    }).then(function(res) {
      for (var index in res.data) {
        if (res.data[index].startDate == '') {
        } else {
          res.data[index].startDate = res.data[index].startDate.split(' ')[0],
            res.data[index].endDate = res.data[index].endDate.split(' ')[0],
            that.setData({
              startDate: res.data[index].startDate,
              endDate: res.data[index].endDate
            })
        }
      }
      that.setData({
        item: res.data,
      })
    })
  },
  //取消订单
  qx: function(e) {
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
})