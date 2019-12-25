// pages/ChoosingClasses/ChoosingClasses.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  data: {

  },

  onLoad: function(options) {
    let subjects = options.subjects
    this.setData({
      subjects: subjects
    })
    console.log(subjects)
    let teacherId = app.globalData.userInfo.userId
    let that = this
    WXAPI.name_list19({
      teacherId
    }).then(function (res) {
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
  //跳转
  ck(e) {
    console.log(e)
    let shiftId = e.currentTarget.id
    wx.navigateTo({
      url: '../Members/Members?shiftId=' + shiftId + "&subjects=" + this.data.subjects,
    })
  }
})