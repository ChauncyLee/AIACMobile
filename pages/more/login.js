//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,

  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var _this = this;
    if (!_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }

    wx.request({
      url: 'http://127.0.0.1:8082/wxfaceac/user/login',
      data: {
        username: _this.data.userid,
        password: _this.data.passwd},
      method:'POST',
      success:function(res){

        wx.showToast({
          title: 'id'+res.data.Rid+'登录成功',
          icon: 'success',
          duration: 2500
        });

        _this.setData({
          'user': app._user,

        });
        app._user.is_bind = true;
        app._user.userid = _this.data.userid;
        app._user.ac = 'Y';
        app._user.rid=res.data.Rid;
        console.log("is_bind:" + app._user.is_bind);
        wx.navigateBack();
      }
    })
    // app.showLoadToast('绑定中');
    /*if (_this.data.userid == "13106296666" && _this.data.passwd == "123456") {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });

      _this.setData({
        'user': app._user,
       
      });
      app._user.is_bind=true;
      app._user.userid = _this.data.userid;
      app._user.ac='Y';
      console.log("is_bind:"+app._user.is_bind);
      wx.navigateBack();
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'error',
        duration: 1500
      });
    }*/
    // wx.request({
    //   method: 'POST',
    //   url: app._server + '/api/users/bind.php',
    //   data: app.key({
    //     openid: app._user.openid,
    //     yktid: _this.data.userid,
    //     passwd: _this.data.passwd
    //   }),
    //   success: function(res){
    //     if(res.data && res.data.status === 200){
    //       app.showLoadToast('请稍候');
    //       //清除缓存
    //       if(app.cache){
    //         wx.removeStorage({ key: 'cache' });
    //         app.cache = '';
    //       }
    //       app.getUser(function(){
    //         wx.showToast({
    //           title: '绑定成功',
    //           icon: 'success',
    //           duration: 1500
    //         });
    //         if(!app._user.teacher){
    //           setTimeout(function(){
    //             wx.showModal({
    //               title: '提示',
    //               content: '部分功能需要完善信息才能正常使用，是否前往完善信息？',
    //               cancelText: '以后再说',
    //               confirmText: '完善信息',
    //               success: function(res) {
    //                 if (res.confirm) {
    //                   wx.redirectTo({
    //                     url: 'append'
    //                   });
    //                 } else {
    //                   wx.navigateBack();
    //                 }
    //               }
    //             });
    //           }, 1500);
    //         }else{
    //           wx.navigateBack();
    //         }
    //       });
    //     }else{
    //       wx.hideToast();
    //       app.showErrorModal(res.data.message, '绑定失败');
    //     }
    //   },


    //   fail: function(res){
    //     wx.hideToast();
    //     app.showErrorModal(res.errMsg, '绑定失败');
    //   }
    // });
  },


  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 11) {
      wx.hideKeyboard();
    }
  },


  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },


  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },


  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },


  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },


  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },


  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
});