// pages/signup/signup.js
let WXAPI = require("../../utils/main.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../../image/jt1.png',
    img2: '../../image/jt2.png',
    show_num: '',
    show: true,
    show2: false,
    show2_text: 1,
    grade_text: '年级',
    subject_name: '学科',
    Semester_name: '阶段',
    classes_name: '章节',
    dx: '单选',
    grade_num: 1,
    text_color: '#666666',
    List1: false,
    List2: false,
    List3: false,
    showbox: false
  },
  //搜索
  search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  onLoad: function(options) {
    var that = this
    WXAPI.name_list17({
      gardeCode: that.data.show_num2 || '',
      semesterCode: that.data.Semester_num || '',
      shiftsCode: that.data.classes_num || '',
      subjectCode: that.data.subject_num || '',
    }).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          kc: res.data,
        })
        console.log("商品主目录", res.data)
      } else {
        console.log("请求错误")
      }
    })
    WXAPI.name_list6({}).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item: res.data
        })
        console.log("商品主目录", res.data)
      } else {
        console.log("请求错误")
      }
    })
  },
  //选中年纪
  grade_buttom: function(options) {
    console.log(options.currentTarget.dataset)
    var that = this
    let num = options.currentTarget.dataset.num
    WXAPI.name_list7(
      num
    ).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          item2: res.data,
          show_num: num
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  grade_buttom2: function(options) {
    console.log(options)
    var that = this
    let num2 = options.currentTarget.dataset.num
    let name = options.currentTarget.dataset.name
    that.setData({
      show_num2: num2,
      grade_text: name,
      show2: false,
      showbox: false,
      show: true,
      text_color: '#666666'
    })
    that.produces()
  },
  grade: function() {
    let that = this
    if (this.data.show2 == false) {
      this.setData({
        text_color: '#30CD76',
        showbox: true,
        show2: true,
        show: false,

      })
    } else {
      this.setData({
        text_color: '#666666',
        show2: false,
        showbox: false,
        show: true
      })
    }
  },
  //选中班级
  button: function(e) {
    this.setData({
      show2_text: e.target.dataset.show2_text
    })
  },
  button2: function(e) {
    this.setData({
      grade_text: e.target.dataset.grade_text,
      grade_num: e.target.dataset.grade_num
    })
    console.log(this.data.grade_num)
  },
  //选中学科-学期-班次
  List1: function() {
    if (this.data.List1 == false) {
      this.setData({
        showbox: true,
        showbox2: false,
        showbox3: false,
        showbox4: false,
        List1: true,
        List2: false,
        List3: false,
        List4: false
      })
    } else {
      this.setData({
        showbox: false,
        showbox2: false,
        showbox3: false,
        showbox4: false,
        List1: false
      })
    }
  },
  List2: function() {
    if (this.data.List2 == false) {
      this.setData({
        showbox: false,
        showbox2: true,
        showbox3: false,
        showbox4: false,
        List1: false,
        List2: true,
        List3: false,
        List4: false
      })
    } else {
      this.setData({
        showbox: false,
        showbox2: false,
        showbox3: false,
        showbox4: false,
        List2: false
      })
    }
  },
  List3: function() {
    if (this.data.List3 == false) {
      this.setData({
        showbox: false,
        showbox2: false,
        showbox3: true,
        showbox4: false,
        List1: false,
        List2: false,
        List3: true,
        List4: false
      })
    } else {
      this.setData({
        showbox: false,
        showbox2: false,
        showbox3: false,
        showbox4: false,
        List3: false
      })
    }
  },
  List4: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '请选择题目类型',
      cancelText: '单选',
      confirmText: '多选',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            dx: '多选'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            dx: '单选'
          })
        }
      }
    })
  },
  //选中学科-学期-班次子集
  subject: function(options) {
    console.log(options)
    let that = this
    let subject_num = options.currentTarget.dataset.num
    let subject_name = options.currentTarget.dataset.name
    that.setData({
      subject_num: subject_num,
      subject_name: subject_name,
      showbox: false,
      List1: false,
    })
    that.produces()
  },

  Semester: function(options) {
    let that = this
    let Semester_num = options.currentTarget.dataset.num
    let Semester_name = options.currentTarget.dataset.name
    that.setData({
      Semester_num: Semester_num,
      Semester_name: Semester_name,
      List2: false,
      showbox2: false,
    })
    that.produces()
  },
  classes: function(options) {
    let that = this
    let classes_num = options.currentTarget.dataset.num
    let classes_name = options.currentTarget.dataset.name
    that.setData({
      classes_num: classes_num,
      classes_name: classes_name,
      List3: false,
      showbox3: false,
    })
    that.produces()
  },
  produces: function() {
    let that = this
    WXAPI.name_list17({
      gardeCode: that.data.show_num2 || '',
      semesterCode: that.data.Semester_num || '',
      shiftsCode: that.data.classes_num || '',
      // type_code: '',
      subjectCode: that.data.subject_num || '',
    }).then(function(res) {
      if (res.respCode && res.respCode === "00") {
        that.setData({
          kc: res.data,
        })
        console.log("题目列表", res.data)
      } else {
        console.log("请求错误")
      }
    })
  },
  //跳转
  topic(e) {
    let itembankids = e.currentTarget.dataset.itembankids
    console.log(itembankids)
    wx.navigateTo({
      url: '../Topic/Topic?itembankids=' + itembankids,
    })
  }
})