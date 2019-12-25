// pages/Members/Members.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({
  data: {
    allselect: false
  },
  //点击时间 单点
  click(e) {
    console.log(e)
    let id = e.currentTarget.dataset.num
    let topics = this.data.item
    topics.forEach(function(i) {
      if (i.id == id) {
        console.log("学生id", id)
        if (i.click) {
          i.click = false
          console.log("false")
        } else {
          i.click = true
          console.log("true")
        }
      }
    })
    this.setData({
      item: topics
    })
  },
  //全选
  click2(e) {
    console.log(e)
    let that = this
    let _allselect = that.data.allselect
    that.setData({
      allselect: !_allselect
    })
    let students = that.data.item
    students.forEach(function(i) {
      if (that.data.allselect) {
        i.click = true
      } else {
        i.click = false
      }
    })
    that.setData({
      item: students
    })
  },
  //发布
  publish() {
    let that = this
    let studentIds = this.data.item
    let _studentids = []
    console.log(11,that.data.subjects)
    for(let i = 0;i<studentIds.length;i++){
      if(studentIds[i].click){
        _studentids.push(studentIds[i].id)
      }
    }
    let a = {}
    a.studentIds = _studentids.join(',')
    a.itemBankIds = that.data.subjects
    a.teacherId = app.globalData.userInfo.userId
    console.log('data', a)
    wx.showModal({
      title: '提示',
      content: '确定的选择的学生发布作业?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://39.108.117.174:999/api/itemWorks/publish', //仅为示例，并非真实的接口地址
            method: "post",
            data: a,
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
            },
            success(res) {
              console.log("回调", res.data)
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
              })
              wx.navigateTo({
                url: '../Itembank/Itembank',
              })
            },
            fail(res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  onLoad: function(options) {
    console.log(options)
    let that = this
    let shiftId = options.shiftId
    let subjects = options.subjects
    that.setData({
      shiftId,
      subjects
    })
    WXAPI.name_list12({
      shiftId: shiftId
    }).then(function(res) {
      console.log("商品主目录", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data,
        })
      } else {
        console.log("请求错误")
      }
    })
  }
})