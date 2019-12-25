// pages/Topic/Topic.js
let WXAPI = require("../../utils/main.js")
Page({

  data: {
    subjects:[],
    chooseSubjects:[],
    item:null
  },

  onLoad: function(options) {
    console.log(1, options.itembankids)
    let that = this
    let itemBankIds = options.itembankids
    console.log(3, itemBankIds)
    WXAPI.name_list18({
      itemBankIds : itemBankIds
    }).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        let _item = res.data
        _item.forEach(function(i){
          i.click = false
        })
        that.setData({
          item: _item
        })
        console.log("题目列表", res.data)
      } else {
        console.log("请求错误")
      }
    })
  },
  //跳转到题目详情
  subject(e){
   console.log(e)
    let id = e.currentTarget.dataset.id2
    wx.navigateTo({
      url: '../subject/subject?id='+id,
    })
  },
  //跳转
  button(){
    wx.navigateTo({
      url: '../ChoosingClasses/ChoosingClasses?subjects=' + this.data.subjects,
    })
  },
  //选中
  img(e){
    let subjects = this.data.subjects
    let id = e.currentTarget.id
    let topics = this.data.item
    topics.forEach(function (i) {
      if (i.id == id) {
        console.log("ceshi", id)
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
    if (id) {
      if (!subjects.find((n) => n == id)) {
        subjects.push(id)
        subjects.sort()
        this.setData({
          subjects
        })
      } else {
        subjects.forEach(function (item, index, arr) {
          if (item == id) {
            arr.splice(index, 1);
          }
        })
      }
    }
    console.log(this.data.subjects)
  }
})