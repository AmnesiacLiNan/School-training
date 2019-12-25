// pages/Attendance_status/Attendance_status.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true
  },
  //选择学生
  xzxs() {
    this.setData({
      show: true
    })
  },
  //跳转到考勤详情列表
  tz(e){
    console.log(e)
    let studentId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Attendance_Record/Attendance_Record?studentId=' + studentId,
    })
  },
  onLoad: function(options) {
    let that = this
    let userId = app.globalData.userInfo.userId
    WXAPI.name_list14(
      userId
    ).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          xz_list: res.data,
        })
        console.log(that.data.xz_list)
      } else {
        console.log("请求错误")
      }
    })
  },
  xz(e) {
    console.log(e)
    let i = e.currentTarget.dataset.index
    let studentId = this.data.xz_list[i].id
    this.setData({
      i,
      show: false
    })
    let that = this
    WXAPI.name_list9({
      studentId
    }).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data
        })
        for (var index in res.data) {
          if (res.data[index].startDate == '') {} else {
            res.data[index].startDate = res.data[index].startDate.split(' ')[0],
              res.data[index].endDate = res.data[index].endDate.split(' ')[0],
              that.setData({
                startDate: res.data[index].startDate,
                endDate: res.data[index].endDate
              })
          }
        }
      } else {
        console.log("请求错误")
      }
    })
  }
})