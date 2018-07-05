//append.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
   
    ibuilding: false,  // picker-index
    room_focus: false,
    room: '',
    angle: 0
  },
  onLoad: function(){
    var _this = this;
    if(app._user.we.build){
      _this.data.buildings.forEach(function(e,i){
        if(e.split("栋")[0] == app._user.we.build){
          _this.setData({
            ibuilding: i
          });
        }
      });
    }
    if(app._user.we.room){
      _this.setData({
        'room': app._user.we.room
      });
    }
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
  buildingPicker: function(e) {
    this.setData({
      ibuilding: e.detail.value
    });
  },
  inputFocus: function(e){
    if(e.target.id == 'room'){
      this.setData({
        'room_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'room'){
      this.setData({
        'room_focus': false
      });
    }
  },
  roomInput:  function(e){
    this.setData({
      'room': e.detail.value
    });
    if(e.detail.value.length >= 3){
      wx.hideKeyboard();
    }
  },
  confirm: function(){
    var _this = this;
    var data = {
      openid: app._user.openid
    };
    if(!_this.data.ibuilding || !_this.data.room){
      app.showErrorModal('请先输入表单信息', '提醒');
      return false;
    }
    if(!/^\d+$/.test(_this.data.room) || _this.data.room.length !== 3){
      app.showErrorModal('请输入正确的寝室号', '提醒');
      return false;
    }
    var buildText = _this.data.buildings[_this.data.ibuilding];
    var build = buildText.split("栋")[0];
    data.build = build;
    data.room = _this.data.room;
    app.showLoadToast();
    wx.request({
      url: app._server + '/api/users/set_info.php',
      data: app.key(data),
      method: 'POST',
      success: function(res){
        if(res.data && res.data.status === 200){
          app.appendInfo(data);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
          wx.navigateBack();
        }else{
          wx.hideToast();
          app.showErrorModal(res.data.message);
        }
      },
      fail: function() {
        wx.hideToast();
        app.showErrorModal(res.errMsg);
      }
    })
  }
});