// pages/Check-in/Check-in.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  data: {
    num: 0
  },
  //提交
  tj(e) {
    console.log(e)
    let that = this
    //学生id
    let studentId = e.currentTarget.dataset.id
    //状态
    let attendanceStatus = e.currentTarget.dataset.num
    //老师ID
    let teacherId = app.globalData.userInfo.userId
    //班级ID
    let classCode = that.data.shiftId
    let shiftId = that.data.shiftId
    let attendanceStatus2 = e.currentTarget.dataset.cur
    //提交状态
    WXAPI.name_list23({
      studentId,
      attendanceStatus,
      teacherId,
      classCode
    }).then(function(res) {
      console.log("提交状态", res)
      //刷新数据
      WXAPI.name_list12({
        shiftId
      }).then(function(res) {
        console.log("学生列表", res)
        if (res.respCode && res.respCode === "00") {
          that.setData({
            item: res.data,
            shiftId
          })
        } else {
          console.log("请求错误")
        }
      })
    })
  },
  onLoad: function(options) {
    let that = this
    let shiftId = options.shiftid
    that.setData({
      shiftId
    })
    WXAPI.name_list12({
      shiftId
    }).then(function(res) {
      console.log("学生列表", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data,
          shiftId
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  tz(e) {
    let id = e.currentTarget.dataset.id
    let shiftId = this.data.shiftId
    wx.navigateTo({
      url: '../Studentdetails/Studentdetails?shiftId=' + shiftId + '&id=' + id,
    })
  }
})