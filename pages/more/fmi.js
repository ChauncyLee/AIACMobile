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
      { id: '0', name: '陈静怡', age: '24', gender: '女', phone: '17800000001', status: 'Y', display: false}     
    ],
    messageObj: { // 查询失败的提示信息展示对象
      messageDisplay: true,
      message: '' 
    }
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

  bindSearchInput: function(e) {
    this.setData({
      'header.inputValue': e.detail.value,
      'main.total': 0,
      'main.sum': 0,
      'main.page': 0,
      'main.message': '上滑加载更多',
      'testData': []
    });
    if(!this.data.messageObj.messageDisplay){
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
    data['testData['+index+'].display'] = !this.data.testData[index].display;
    this.setData(data);
  },

  onLoad: function (options) {
    var _this=this;
    var id=app._user.rid;
    wx.request({
      url: 'http://127.0.0.1:8082/wxfaceac/user/getresidents',
      data:{rid:6},
      method:'GET',
      success:function(res){
        var list=res.data.list;
        if(list==null){
          var toastText="获取数据失败"+res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon:'',
            duration:2000
          })
        }else{
          _this.setData({
            testData:list
          });
        }
      }
    })

    if(options.key){
      this.setData({
        'main.mainDisplay': false,
        'header.defaultValue': options.key,
        'header.inputValue': options.key
      });
      this.search();
    }
  }
});