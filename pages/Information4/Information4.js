// pages/Information2/Information2.js
let WXAPI = require("../../utils/main.js")
const app = getApp()
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
    console.log(options)
    this.setData({
      userid: options.userid,
      inputage: options.age,
      inputname: options.name,
      sex: options.sex,
      inputschool: options.school,
      id: options.id,
      gardeCode: options.gardeCode,
      // region:options.city,
      gardeName: options.gardeName
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
  // inputphone(e) {
  //   let that = this;
  //   let vale = e.detail.value;
  //   if (vale == '') {
  //     vale = ''
  //     that.setData({
  //       inputphone: ''
  //     });
  //     return ''
  //   } else {
  //     that.setData({
  //       inputphone: vale
  //     });
  //   }
  // },
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
  tj: function() {
    let that = this
    let name = that.data.inputname
    let sex = that.data.sex
    let age = that.data.inputage
    let city = that.data.region[1]
    let school = that.data.inputschool
    let gardeCode = that.data.selectedValue.code
    // let phone = that.data.inputphone
    let id = that.data.id
    let address = "家里"
    WXAPI.name_list20({
      id,
      name,
      sex,
      gardeCode,
      city,
      age,
      school
    }).then(function(res) {
      console.log("学生列表", res)
      if (res.respCode && res.respCode === "00") {
       console.log("请求成功")
       wx.navigateTo({     
         url: '../Information3/Information3',
       })
      } else {
        console.log("请求错误")
      }
    })
   
  }
})