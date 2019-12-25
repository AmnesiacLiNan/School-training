const API_BASE_URL = "http://39.108.117.174:999"
const request = (url, data, method = "post", id, query) => {
  let that = this
  let _url = API_BASE_URL + url
  if (id) {
    _url = _url + '/' + id
  }
  if (query) {
    _url = _url + "?"
    Object.keys(query).forEach(function(key) {
      _url = _url + key + "=" + query[key] + "&"
    });
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}

module.exports = {
  //课程（商品）列表接口
  name_list: (data) => {
    return request("/api/produces", data, "get")
  },
  //课程详情接口
  name_list2: (id) => {
    return request("/api/produces", '', "get", id)
  },
  //课程详情接口下单
  // name_list3: () => { return request("/api/produces", "get") },
  //课程详情接口订单详情
  name_list4: (id) => {
    return request("/api/orders", "", "get", id)
  },
  // //课程列表接口订单查询
  name_list5: (data) => {
    return request("/api/orders", data, "get")
  },
  // //课程列表接口
  name_list6: () => {
    return request("/api/types/tree", '', "get")
  },
  // //课程列表接口父级
  name_list7: (id) => {
    return request("/api/types", '', "get", id)
  },
  //课程列表接口 获取年级下科目
  name_list8: (query) => {
    return request("/api/types/getSubjectByGarde", '', "get", '', query)
  },
  //班级管理
  name_list9: (data) => {
    return request("/api/shifts/getMyshifts", data, "get")
  },
  //题库
  name_list10: (query) => {
    return request("/api/itemWorks/getMyWorks", '', "get", '', query)
  },
  //课程列表接口 老师用户下查看题库
  name_list11: (data) => {
    return request("/api/itemBanks", data, "get")
  },

  // //班级详情 老师
  name_list12: (query) => {
    return request("/api/shifts/getShiftDetail", '', "get", '', query)
  },
  //考勤
  name_list13: (data) => {
    return request("/api/shifts/getMyshifts", data, "get")
  },
  // //学生列表 家长
  name_list14: (id) => {
    return request("/api/students", '', "get", id)
  },
  // //新增学生接口 家长
  name_list15: (data) => {
    return request("/api/students/add", data, "post")
  },
  // 下单
  name_list16: (data) => {
    return request("/api/orders/unifiedOrder", data, "post")
  },
  //课程列表接口 老师用户下查看题库列表
  name_list17: (data) => {
    return request("/api/itemBanks/getGroups", data, "get")
  },
  //课程列表接口 老师用户下查看题库列表下的题目查看或选择
  name_list18: (query) => {
    return request("/api/itemBanks/getByIds", '', "get", '', query)
  },
  //课程列表接口 老师用户下查看题库列表下的题目查看或选择
  name_list19: (query) => {
    return request("/api/shifts/getMyshifts", '', "get", '', query)
  },
  //编辑学生信息
  name_list20: (data) => {
    return request("/api/students/update", data, "post")
  },
  //删除学生信息
  name_list21: (id) => {
    return request("/api/students/delete", '', "post", id)
  },
  //我的考勤 学生
  name_list22: (query) => {
    return request("/api/attendances/getByStudent", '', "get", '', query)
  },
  //老师登记考勤
  name_list23: (data) => {
    return request("/api/attendances/add", data, "post")
  },
  //题目发布
  name_list24: (data) => {
    return request("/api/itemWorks/publish", data, "post")
  },
  //学生做作业
  name_list25: (data) => {
    return request("/api/itemWorks/doWork", data, "post", )
  },
  //查看作业
  name_list26: (query) => {
    return request("/api/itemWorks/workItems", '', "get", '', query)
  },
  //订单取消
  name_list27: (id) => {
    return request("/api/orders/cancel", '', "post", id)
  },
  //退款
  name_list28: (data) => {
    return request("/api/refundDetails/add",data, "post")
  },
  //意见反馈  
  name_list29: (data) => {
    return request("/api/feedbacks/add", data, "post")
  },
  //老师修改考勤
  name_list30: (data) => {
    return request("/api/attendances/update", data, "post")
  },
  //轮播图
  image_box: () => {
    return request("/api/wheelPlantings", '', "get")
  },
  // 登入
  login: (data) => {
    return request("/api/appletUsers/login", data, "post")
  }
}