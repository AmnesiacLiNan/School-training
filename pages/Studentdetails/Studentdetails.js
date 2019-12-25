// pages/Studentdetails/Studentdetails.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({


  data: {

  },

  onLoad: function(options) {
    console.log(options)
    let id = options.id
    let that = this
    let userId = app.globalData.userInfo.userId
    WXAPI.name_list14(
      userId,
      id
    ).then(function(res) {
      console.log("学生", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data,
        })
      } else {
        console.log("请求错误")
      }
    })
    let teacherId = app.globalData.userInfo.userId
    WXAPI.name_list9({
      teacherId
    }).then(function (res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        for (var index in res.data) {
          res.data[index].startDate = res.data[index].startDate.split(' ')[0],
            res.data[index].endDate = res.data[index].endDate.split(' ')[0]
        }
        that.setData({
          item2: res.data,
          startDate: res.data[index].startDate,
          endDate: res.data[index].endDate
        })
      } else {
        console.log("请求错误")
      }
    })
  },
})