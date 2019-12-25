// pages/Information3/Information3.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
Page({


  data: {

  },
 //添加孩子信息
 tj:function(){
   let that = this
   let userid = app.globalData.userInfo.userId
   wx.navigateTo({
     url: '../Information2/Information2?userid=' + userid
   })
 },
 //删除
  delete(e){
    let that = this
    console.log(e)
    let studentId = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定删除该信息',
      confirmColor:'#30CD76',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          WXAPI.name_list21(
            studentId
          ).then(function (res) {
            console.log("请求", res)
            if (res.respCode && res.respCode === "00") {            
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              that.onLoad()
            } else {
              console.log("请求错误")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  
  },
  onLoad: function (options) {
    let that = this
    let userid = app.globalData.userInfo.userId
    WXAPI.name_list14(
      userid
    ).then(function (res) {
      console.log("学生列表", res)
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  //修改
  xg(e){
    console.log(e)
    let i = e.currentTarget.dataset.index
    let age = this.data.item[i].age
    let city = this.data.item[i].city
    let gardeCode = this.data.item[i].gardeCode
    let gardeName = this.data.item[i].gardeName
    let id = this.data.item[i].id
    let school = this.data.item[i].school
    let name = this.data.item[i].name
    let sex = this.data.item[i].sex
    wx.navigateTo({
      url: '../Information4/Information4?age=' + age + '&city=' + city + '&gardeCode=' + gardeCode + '&gardeName=' + gardeName + '&id=' + id + '&school=' + school + '&name=' + name + '&sex=' + sex,
    })
  }
})