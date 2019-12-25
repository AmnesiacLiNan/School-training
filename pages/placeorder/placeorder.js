// pages/placeorder/placeorder.js
let WXAPI = require("../../utils/main.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    i: 0,
    shadow: false,
    frame: false,
    item2 :'123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this
    let id = options.id
    that.setData({
      id: id
    })
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
      } else {
        console.log("请求错误")
      }
    })
    let userId = app.globalData.userInfo.userId
    WXAPI.name_list14(
      userId
    ).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item2: res.data,
          userId: userId
        })
        if(that.data.item2.length==0){
          that.setData({
            hiddenname: true
          })
        }else{
          that.setData({
            hiddenname: false
          })
        }
      } else {
        console.log("请求错误")
      }
    })
  },
  //选择孩子按钮
  xz: function() {
    let that = this
    let userId = app.globalData.userInfo.userId
    console.log(userId)
    WXAPI.name_list14(
      userId
    ).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item3: res.data,
          shadow: true,
          frame: true
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  xz2: function(e) {
    this.setData({
      i: e.currentTarget.dataset.index,
      shadow: false,
      frame: false
    })
  },
  //关闭弹出框
  gb() {
    this.setData({
      shadow: false,
      frame: false
    })
  },
  //下单
  tj(e) {
    console.log(11, e)
    let studentId = e.target.dataset.studentid
    let curriculumId = e.target.dataset.curriculumid
    let payAmt = e.target.dataset.discountprice
    let userId = app.globalData.userInfo.userId
    let that = this
    WXAPI.name_list16({
      userId,
      curriculumId,
      payAmt,
      studentId
    }).then(function(res) {
      console.log(res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          pay:res.data
        })
        wx.requestPayment({
          'timeStamp': that.data.pay.timeStamp,
          'nonceStr': that.data.pay.nonceStr,
          'package': that.data.pay.package,
          'signType': 'MD5',
          'paySign': that.data.pay.paySign,
          'success': function(res) {
            console.log("支付成功",res)
            wx.navigateTo({
              url: '../Successful/Successful?paySign=' + payAmt,
            })
          },
          'fail': function(res) {
            console.log("支付失败",res)
            wx.navigateTo({
              url: '../Failure/Failure?paySign=' + payAmt,
            })
          }
        })
        // wx.navigateTo({
        //   url: '../Successful/Successful',
        // })
      } else {
        console.log("请求错误")
      }
    })
    },
    //添加
  tap(){
    wx.navigateTo({
      url: '../Information2/Information2',
    })
  }
})