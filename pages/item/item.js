// pages/subject/subject.js
let WXAPI = require("../../utils/main.js")
Page({

  data: {
    i: 0,
    currentAnswer: null,
    subjects: [],
    answerStr:null,
    workIds: null,//题目串
    arr:['A','B','C','D','E','F','G'],
    str:null
  },
  // 下一题
  next() {
    let subject = {
      itemWorkId: this.data.workIds[this.data.i]
    }
    subject.studentAnswer = this.data.arr[this.data.currentAnswer-1]
    let subjects = this.data.subjects
    subjects.push(subject)
    this.setData({
      subjects,
      i: this.data.i + 1
    })
    console.log(this.data.subjects)
  },
  //选择答案
  tj(e) {
    let studentAnswer = e.currentTarget.dataset.id
    console.log("选择的答案", studentAnswer)
    this.setData({
      currentAnswer: studentAnswer
    })
    if (this.data.i < this.data.item.length-1) {
      this.next()
    } else {
      this.next()
      let subjects = JSON.stringify(this.data.subjects);
      wx.navigateTo({
        url: '../grades/grades?subjects=' + subjects,
      })
    }
  },
  //提交作业
  next2(){
    let subject = {
      itemWorkId: this.data.workIds[this.data.i]
    }
    subject.studentAnswer = this.data.answerStr
    let subjects = this.data.subjects
    subjects.push(subject)
    this.setData({
      subjects,
      i: this.data.i + 1
    })
  },
  tap() {
    if (this.data.i < this.data.item.length - 1) {
      this.next2()
    } else {
      this.next2()
      let subjects = JSON.stringify(this.data.subjects);
      wx.navigateTo({
        url: '../grades/grades?subjects=' + subjects,
      })
    }
    console.log(this.data.subjects)
  },
  //多选
  tj2(e) {
    //用户选择的答案
    let id = this.data.arr[e.currentTarget.dataset.id - 1]
    let str = this.data.item[this.data.i].items
    let _myAnswer = this.data.currentAnswer || []
    console.log(str)
    str.forEach(function (n) {
      if (n.sort == e.currentTarget.dataset.id) {
        console.log("ceshi", id)
        if (n.click) {
          n.click = false
          console.log("false")
        } else {
          n.click = true
          console.log("true")
        }
      }
    })
    let currentItem = this.data.item
    currentItem[this.data.i].items = str
    this.setData({
      item:currentItem
    })
    if (!_myAnswer.find((n) => n == id)){
      _myAnswer.push(id)
      _myAnswer.sort()
    }else{
      _myAnswer.forEach(function (item, index, arr) {
        if (item == id) {
          arr.splice(index, 1);
        }
      })
    }
    let _answerStr = _myAnswer.join('')
    this.setData({
      currentAnswer:_myAnswer,
      answerStr:_answerStr
    })
    console.log("用户选择的答案",this.data.answerStr,this.data.currentAnswer)
  },
  onLoad: function(options) {
    console.log(options)
    let that = this
    let workIds = options.workIds
    console.log(workIds.split(","))
    this.setData({
      workIds: workIds.split(",")
    })
    WXAPI.name_list26({
      workIds
    }).then(function(res) {
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