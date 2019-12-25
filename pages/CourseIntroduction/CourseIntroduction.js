// pages/search/search.js
let WXAPI = require("../../utils/main.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
  },
  //搜索课程
  inputTyping: function (e) {
    console.log(e.detail.value)
    let that = this;
    let vale = e.detail.value;
    if (vale == '') {
      vale = '';
      that.setData({
        inputVal: ''
      });
      return '';
    } else {
      that.setData({
        inputVal: vale
      });
    }
  },
  ss: function (options) {
    let that = this
    WXAPI.name_list({
      offset: 0,
      limit: 10,
      name: that.data.inputVal || ''
    }).then(function (res) {
      console.log("商品主目录", res)
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
  tap: function (options) {
    console.log(options.currentTarget.dataset.id)
    let id = options.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Course_Details/Course_Details?id=' + id,
    })
  },
  onLoad: function (options) {
    let that = this
    WXAPI.name_list({
      offset: 0,
      limit: 10,
    }).then(function (res) {
      console.log("商品主目录", res)
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
  }
})