// pages/Information2/Information2.js
let WXAPI = require("../../utils/main.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0],
    region: ['广东省', '请选择孩子所在城市', '海珠区'],
    // customItem: '全部'
    multiArray: [],
    childArr: [], //用来保存子级的数据
    selectedValue: {},
  },
  //城市年级选择
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindMultiPickerChange: function(e) {
    let value = e.detail.value;
    let multiArray = this.data.multiArray;

    this.setData({
      multiIndex: value,
      selectedValue: multiArray[1][value[1]]
    })
  },
  bindMultiPickerColumnChange: function(e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    let childArr = this.data.childArr;
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        let arr = [];
        childArr.map((dataItem, dataIndex) => {
          let codeAAA = "0" + Number(e.detail.value + 1);
          if (dataItem.superCode == codeAAA) {
            arr.push(dataItem);
          }
        })
        data.multiArray[1] = arr;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        data.multiIndex[3] = 0;
        break;
    }
    this.setData(data);
  },
  onLoad: function(options) {
    this.setData({
      userid: options.userid
    })
    var that = this
    WXAPI.name_list6().then(function(res) {
      if (res.respCode && res.respCode === "00") {
        let arr = [];
        let arr1 = []; //父级
        let arr2 = []; //先给picker的子级一个默认值
        let childArr = that.data.childArr;
        let data = res.data[0].types;
        data.map((dataItem, dataIndex) => {
          arr1.push(dataItem);
          dataItem.types.map((childItem, childIndex) => {
            if (childItem.name.indexOf(dataItem.name) != -1 && dataIndex == 0) {
              arr2.push(childItem);
            }
            childArr.push(childItem);
          });
        });
        arr[0] = arr1;
        arr[1] = arr2;
        that.setData({
          multiArray: arr,
          childArr: childArr
        })
      } else {
        console.log("请求错误")
      }
    })
  },
  //性别
  //男
  sex1: function() {
    this.setData({
      sex: 1
    })
  },
  //女
  sex2: function() {
    this.setData({
      sex: 0
    })
  },
  //孩子名称
  inputname(e) {
    let that = this;
    let vale = e.detail.value;
    if (vale == '') {
      vale = ''
      that.setData({
        inputname: ''
      });
      return ''
    } else {
      that.setData({
        inputname: vale
      });
    }
  },
  //手机号
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
  //年龄
  inputage(e) {
    let that = this;
    let vale = e.detail.value;
    if (vale == '') {
      vale = ''
      that.setData({
        inputage: ''
      });
      return ''
    } else {
      that.setData({
        inputage: vale
      });
    }
  },
  //学校
  inputschool(e) {
    let that = this;
    let vale = e.detail.value;
    if (vale == '') {
      vale = ''
      that.setData({
        inputschool: ''
      });
      return '';
    } else {
      that.setData({
        inputschool: vale
      });
    }
  },
  //保存
  tj: function () {
    let that = this
    let b = []
    let student = {}
    student.name = that.data.inputname
    student.sex = that.data.sex
    student.age = that.data.inputage
    student.city = that.data.region[1]
    student.school = that.data.inputschool
    student.gardeCode = that.data.selectedValue.code
    student.phone = that.data.inputphone
    student.userId = that.data.userid
    student.address = "家里"
    b.push(student)
    console.log("数据", b)
    wx.request({
      url: 'http://39.108.117.174:999/api/students/add', //仅为示例，并非真实的接口地址
      method: "post",
      data: JSON.stringify(b),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("回调", res.data)
      }
    })
    wx.navigateTo({
      url: '../Information3/Information3',
    })
  }
})