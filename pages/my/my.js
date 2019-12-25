//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  //购物单跳转
  Order: function() {
    let num = '01'
    wx.navigateTo({
      url: '../Order/Order?num=' + num,
    })
  },
  //待付款
  Unpaid: function(e) {
    console.log(e.currentTarget.dataset.num)
    let num = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../Order/Order?num=' + num,
    })
  },
  //已付款
  Payment: function(e) {
    console.log(e.currentTarget.dataset.num)
    let num = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../Order/Order?num=' + num,
    })
  },
  //退款
  refund: function(e) {
    console.log(e.currentTarget.dataset.num)
    let num = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../Order/Order?num=' + num,
    })
  },
  //已完成
  Completed: function(e) {
    console.log(e.currentTarget.dataset.num)
    let num = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '../Order/Order?num=' + num,
    })
  },
  //个人信息
  bindViewTap: function() {
    wx.navigateTo({
      url: '../Personal/Personal',
    })
  },
  //事件处理函数
  onLoad: function() {
    console.log(app.globalData)
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.log(res.userInfo.avatarUrl)
        }
      })
    }
  },
  //孩子信息
  Information: function() {
    wx.navigateTo({
      url: '../Information3/Information3',
    })
  },
  //意见反馈
  Feedback: function() {
    wx.navigateTo({
      url: '../Feedback/Feedback',
    })
  },
  //联系我们
  Contact: function() {
    wx.navigateTo({
      url: '../Contact/Contact',
    })
  },
  //考勤状态
  status: function() {
    wx.navigateTo({
      url: '../Attendance_status/Attendance_status',
    })
  },
  //题库
  Itembank: function() {
    wx.navigateTo({
      url: '../Itembank/Itembank',
    })
  },
  //我的作业
  homework: function() {
    wx.navigateTo({
      url: '../homework/homework',
    })
  },
  //班级管理
  management: function() {
    wx.navigateTo({
      url: '../management/management',
    })
  }
})