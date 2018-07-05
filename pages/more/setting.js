//more.js
//获取应用实例
var app = getApp();
Page({
  data: {
    user: {}
  },
  onShow: function () {
    this.getData();
  },
  getData: function () {
    var _this = this;
    _this.setData({
      'user': app._user,
      'is_bind': !!app._user.is_bind,
      'userid': app._user.userid
    });
  }
});