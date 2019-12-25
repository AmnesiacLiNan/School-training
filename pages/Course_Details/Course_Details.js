// pages/Course_Details/Course_Details.js
let WXAPI = require("../../utils/main.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    box: false,
    item: [],
    id:'',
    interval:3000
  },
  tap: function() {
    this.setData({
      box: true
    })
  },
  tap2: function() {
    this.setData({
      box: false
    })
  },
  //图片放大
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = this.data.image;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 报名
  sign_up: function(options) {
    wx.navigateTo({
      url: '../Purchase/Purchase?id=' + this.data.id,
    })
  },
  call: function() {
    wx.makePhoneCall({
      phoneNumber: '15113656670', //此号码并非真实电话号码，仅用于测试
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad: function(options) {
    var that = this
    let id = options.id
    that.setData({
      id:id
    })
    console.log(id)
    WXAPI.name_list2(
      id = id
    ).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data,
        })
        let image = []
        let image2 = []
        for(let i=0;i<3;i++){
        image2 = that.data.item.detailWheelImage.split(',')
          image.push('http://39.108.117.174:999' +image2[i]);
        }
        that.setData({
          image
        })
        console.log('image',image)
        console.log(that.data.item)
      } else {
        console.log("请求错误")
      }
    })
  }

})