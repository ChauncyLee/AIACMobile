//xs.js
//获取应用实例
var app = getApp();

Page({
  data: {
    header: {
      defaultValue: '',
      inputValue: ''
    },
    main: {
      mainDisplay: true, // main 显示的变化标识
      total: 0,
      sum: 0,
      page: 0,
      message: '上滑加载更多'
    },
    testData: [
      { id: '0', name: '王强', age: '18', gender: '男', phone: '17800000001', status: 'Y', display: false },
      { id: '1', name: '陈玉', age: '22', gender: '女', phone: '17800000002', status: 'Y', display: false },
      { id: '2', name: '刘晨阳', age: '21', gender: '女', phone: '17800000003', status: 'N', display: false }
     
    ],
    messageObj: { // 查询失败的提示信息展示对象
      messageDisplay: true,
      message: ''
    }
  },
  onShow: function () {
    var testData = this.data.testData;
    if (app._testData.id) {
      console.log(app._testData);
      var nid = testData.length - 1;
      console.log(nid);
      app._testData.id = nid + '';
      console.log(app._testData);
      testData.push(app._testData);
      console.log(this.data.testData);
      console.log(this.data.testData);
      this.setData({
        testData: testData
      });
      var update = this.data.testData;
      console.log(update);
      app._testData = { id: '' };
    }
    if (app._index.index) {

      console.log(testData);
      // var item=testData[app._index.index];
      // item.status='Y';
      var index= app._index.index;
      var status = "testData[" + 1 + "].status";
      console.log(testData);
      console.log(status);
      this.setData({
        status: 'Y'
      });
      this.setData({
        testData:testData
      });
      console.log(testData);

      app._index.index = 0;
    }
  },
  delete: function (e) {
    var _this = this;
    var testData = _this.data.testData;
    console.log(e);
    var id = !isNaN(e) ? e : parseInt(e.currentTarget.dataset.index);
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          testData.splice(id, 1);
          _this.setData({
            testData: testData
          });
          console.log("删除成功");
        } else {
          console.log('用户点击取消')
        }

      }
    })
  },
  bindClearSearchTap: function (e) {
    this.setData({
      'main.mainDisplay': true,
      'main.total': 0,
      'main.sum': 0,
      'main.page': 0,
      'main.message': '上滑加载更多',
      'testData': [],
      'header.inputValue': ''
    });
  },

  bindSearchInput: function (e) {
    this.setData({
      'header.inputValue': e.detail.value,
      'main.total': 0,
      'main.sum': 0,
      'main.page': 0,
      'main.message': '上滑加载更多',
      'testData': []
    });
    if (!this.data.messageObj.messageDisplay) {
      this.setData({
        'messageObj.messageDisplay': true,
        'messageObj.message': ''
      });
    }
    return e.detail.value;
  },


  // main——最优
  bindOpenList: function (e) {
    var index = !isNaN(e) ? e : parseInt(e.currentTarget.dataset.index),
      data = {};
    data['testData[' + index + '].display'] = !this.data.testData[index].display;
    this.setData(data);
  },

  onLoad: function (options) {
    if (options.key) {
      this.setData({
        'main.mainDisplay': false,
        'header.defaultValue': options.key,
        'header.inputValue': options.key
      });
      this.search();
    }
  }
});