// pages/Attendance_Record/Attendance_Record.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attendanceCount1: 0,
    attendanceCount2: 0,
    attendanceCount3: 0
  },

  onLoad: function(options) {
    let that = this
    let studentId = options.studentId
    console.log(options)
    WXAPI.name_list22({
      studentId
    }).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data.attList,
          item2: res.data.attStatistical
        })
        
        for (var i = 0; i < that.data.item2.length; i++) {
          console.log('32333', that.data.item2[i])
          if (that.data.item2[i].attendanceName == '签到') {
            that.setData({
              attendanceCount1: that.data.attendanceCount1+1
            })
          } else if (that.data.item2[i].attendanceName == '缺勤'){
            that.setData({
              attendanceCount2: that.data.attendanceCount2+1
            })
          } else if (that.data.item2[i].attendanceName == '请假'){
            that.setData({
              attendanceCount3: that.data.attendanceCount3+1
            })
          }else{}
        }
      } else {
        console.log("请求错误")
      }
    })
  },
})