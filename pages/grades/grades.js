// pages/grades/grades.js
let WXAPI = require("../../utils/main.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //选择
  xz(e) {
    console.log(e)
    let workIds = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Topicdetails/Topicdetails?workIds=' + workIds,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let subjects = options.subjects;
    let that = this
    WXAPI.name_list25(
      subjects
    ).then(function(res) {
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