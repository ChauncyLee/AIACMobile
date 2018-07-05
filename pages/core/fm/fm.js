//xs.js
//获取应用实例
var app = getApp();

Page({
  data: {
    header: {
      defaultValue: '',
      inputValue: '',
    },
    ostatus: true,
    main: {
      mainDisplay: true, // main 显示的变化标识
      total: 0,
      sum: 0,
      page: 0,
      message: '上滑加载更多'
    },
    testData: [
      { id: '0', name: '陈静怡', age: '24', gender: '女', phone: '17800000001', status: 'Y', display: false }
    ],
    messageObj: { // 查询失败的提示信息展示对象
      messageDisplay: true,
      message: ''
    }
  },

  onShow: function () {
    var testData=this.data.testData;
    if (app._testData.id) {
      console.log(app._testData);
      var nid=testData.length-1;
      console.log(nid);
      app._testData.id=nid+'';
      console.log(app._testData);
      testData.push(app._testData);
      console.log(this.data.testData);
      console.log(this.data.testData);
      this.setData({
        testData:testData
      });
      var update = this.data.testData;
      console.log(update);
      app._testData={id:''};
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


  //main——最优
  bindOpenList: function (e) {
    var index = !isNaN(e) ? e : parseInt(e.currentTarget.dataset.index),
      data = {};
    data['testData[' + index + '].display'] = !this.data.testData[index].display;
    this.setData(data);
  },

  abc: function (e) {
    var isostatus = this.data.ostatus;
    console.log("isostatus" + isostatus);
    this.setData({ ostatus: !isostatus });
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