// pages/subject/subject.js
let WXAPI = require("../../utils/main.js")
Page({

  data: {

  },

  onLoad: function(options) {
    let that = this
    let id = options.id
    WXAPI.name_list18({
      itemBankIds: id
    }).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data
        })
        console.log("题目列表", res.data)
      } else {
        console.log("请求错误")
      }
    })
  },
})