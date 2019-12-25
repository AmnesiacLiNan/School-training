let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({
  data: {
    item: [],
    num: '01',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //跳转
  tap: function (options) {
    console.log(options.currentTarget.dataset.id)
    let id = options.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Course_Details/Course_Details?id=' + id,
    })
  },
  onLoad: function (options) {
    let that = this
    that.setData({
      num: '01'
    })
    this.image_box()
    //登入
    wx.login({
      success: function (res_top) {
        console.log('微信登陆', res_top)
        wx.getSetting({
          success: function (res) {
            console.log("授权状态", res)
            if (res.authSetting["scope.userInfo"]) {
              wx.getUserInfo({
                success: function (res) {
                  console.log(res)
                  that.setData({
                    name: res.userInfo.nickName,
                    headUrl: res.userInfo.avatarUrl,
                    area: res.userInfo.province,
                    sex: res.userInfo.gender
                  })
                  let a = {}
                  a.name = that.data.name
                  a.area = that.data.area
                  a.sex = that.data.sex
                  a.headUrl = that.data.headUrl
                  a.code = res_top.code
                  console.log('data', a)
                  wx.request({
                    url: 'http://39.108.117.174:999/api/appletUsers/login', //仅为示例，并非真实的接口地址
                    method: "post",
                    data: JSON.stringify(a),
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                      console.log("回调", res.data)
                      that.setData({
                        userId: res.data.data.userId,
                      })
                      let userInfo = {}
                      userInfo.a = a
                      userInfo.type = res.data.data.type
                      userInfo.userId = res.data.data.userId
                      userInfo.region = ''
                      app.globalData.userInfo = userInfo
                    },
                    fail(res) {
                      console.log(res)
                    }
                  })

                },
                fail(res) {
                  console.log(res)
                }
              })
            } else {
              wx.redirectTo({
                url: '../Authorized/Authorized',
              })
            }
          }
        })
      }
    })
    //个人信息
    WXAPI.name_list({
      offset: 0,
      limit: 10
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
  //跳转
  CourseIntroduction: function () {
    wx.navigateTo({
      url: '../CourseIntroduction/CourseIntroduction',
    })
  },
  Feedback: function () {
    wx.navigateTo({
      url: '../Feedback/Feedback',
    })
  },
  //选定
  curriculum: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
    let that = this
    let id = that.data.num
    WXAPI.name_list({
      offset: 0,
      limit: 10,
      gardeCode: id
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
      console.log("课程", res, id)
    })
  },
  //页面跳转 搜索页面
  search: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  //联系我们
  Contact: function () {
    wx.navigateTo({
      url: '../Contact/Contact',
    })
  },
  //轮播图
  image_box: function () {
    let that = this
    WXAPI.image_box({
    }).then(function (res) {
      console.log('轮播图',res)
      that.setData({
        image_item: res.data,
      })
    })
  },
})