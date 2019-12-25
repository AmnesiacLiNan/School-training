// pages/homework/homework.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '',
    studentId: '',
    show:true
  },
  //选择学生
  xzxs() {
    this.setData({
      show: true
    })
  },
  //点击时间 选择筛选
  curriculum2(){
    this.setData({
      num: e.target.dataset.num
    })
    let that = this 
    that.curriculum()
  },
  curriculum: function() {
    let that = this
    let completion = that.data.num
    let studentId = that.data.studentId
    console.log(completion)
    WXAPI.name_list10({
      studentId
    }).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        if (completion != '') {
          for (let i = 0; i < res.data.length; i++) {
            if (completion != res.data[i].completion) {
              console.log(res.data[i])
              delete res.data[i];
            }
          }
        }
        console.log(res.data)
        that.setData({
          item: res.data
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  //页面跳转
  go(e) {
    console.log(e)
    let workIds = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../item/item?workIds=' + workIds,
    })
  },
  xz(e) {
    console.log(e)
    let arr = e.currentTarget.dataset.index
    let studentId = this.data.xz_list[arr].id
    this.setData({
      arr,
      show: false,
      studentId
    })
    let that = this
    WXAPI.name_list10({
      studentId
    }).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          name: res.data,
        })
        that.curriculum()
      } else {
        console.log("请求错误")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
  }
})