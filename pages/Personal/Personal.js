// pages/Personal/Personal.js
const app = getApp()
let WXAPI = require("../../utils/main.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    multiArray: [],
    childArr: [], //用来保存子级的数据
    selectedValue: {},
  },
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,
    })
    app.globalData.userInfo.region = e.detail.value[1]

  },
  input_name(e){
    console.log(e)
  },
  //事件处理函数
  onLoad: function() {
    this.setData({

    })
    var that = this
    WXAPI.name_list6().then(function (res) {
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
    if (app.globalData.userInfo) {
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
        }
      })
    }
  },
  bindMultiPickerChange: function (e) {
    let value = e.detail.value;
    let multiArray = this.data.multiArray;

    this.setData({
      multiIndex: value,
      selectedValue: multiArray[1][value[1]]
    })
  },
  bindMultiPickerColumnChange: function (e) {
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

  
})