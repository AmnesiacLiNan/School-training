// pages/Feedback/Feedback.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //孩子名称
  inputphone(e) {
    let that = this;
    let vale = e.detail.value;
    if (vale == '') {
      vale = ''
      that.setData({
        inputphone: ''
      });
      return ''
    } else {
      that.setData({
        inputphone: vale
      });
    }
  },
  inputtext(e) {
    let that = this;
    let vale = e.detail.value;
    if (vale == '') {
      vale = ''
      that.setData({
        inputtext: ''
      });
      return ''
    } else {
      that.setData({
        inputtext: vale
      });
    }
  },
  tj() {
    let userId = app.globalData.userInfo.userId
    let phone = this.data.inputphone
    let content = this.data.inputtext
    let that = this
    WXAPI.name_list29({
      userId,
      content,
      phone
    }).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        console.log('请求成功')
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  onLoad: function(options) {

  },
})