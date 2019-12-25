// pages/management/management.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  data: {

  },

  //查看
ck:function(e){
  let shiftid = e.currentTarget.dataset.shiftid
  wx.navigateTo({
    url: '../Check-in/Check-in?shiftid=' + shiftid,
  })
},
  onLoad: function (options) {
    let that =this
    let teacherId = app.globalData.userInfo.userId
    WXAPI.name_list9({
      teacherId
    }).then(function (res) {
      console.log("课程商品", res)
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
})