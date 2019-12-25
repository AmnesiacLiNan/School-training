// pages/subject/subject.js
let WXAPI = require("../../utils/main.js")
Page({

  data: {
    str: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },

  onLoad: function (options) {
    let that = this
    let workIds = options.workIds
    WXAPI.name_list26({
      workIds
    }).then(function (res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          arr: res.data
        })
        console.log("题目列表", res.data)
      } else {
        console.log("请求错误")
      }
    })
  },
})