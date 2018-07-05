
import '../fm.js';
//append.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    flag: 0,
    items: [
      { name: '女', value: '女', checked: 'true' },
      { name: '男', value: '男' },
    ],
    name: '',
    gender: '女',
    uname: '',
    age: '',
    dob: '',
    idc: '',
    username: '',
    password: '',
    angle: 0
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var gender = this.data.gender;
    // this.setData({ gender: e.detail.value });
    gender = e.detail.value;
    this.setData({
      gender: gender
    });
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    console.log('gender携带value值为：', gender);
  },
  bindname: function (e) {
    var name = this.data.name;
    console.log('name获取到的值', e.detail.value);
    console.log(e);
    // this.setData({name:e.detail.value});
    name = e.detail.value;
    this.setData({
      name: name
    });
    console.log("name是：", name);
  },
  binduname: function (e) {
    var uname = this.data.uname;
    console.log('uname获取到的值', e.detail.value);
    console.log(e);
    // this.setData({ uname: e.detail.value });
    uname = e.detail.value;
    this.setData({
      uname: uname
    });
    console.log("uname是：", uname);
  },
  bindage: function (e) {
    var age = this.data.age;
    console.log('age获取到的值', e.detail.value);
    console.log(e);
    // this.setData({ age: e.detail.value });
    age = e.detail.value;
    this.setData({
      age: age
    });
    console.log("age是：", age);
  },
  binddob: function (e) {
    var dob = this.data.dob;
    console.log('dob获取到的值', e.detail.value);
    console.log(e);
    // this.setData({ dob: e.detail.value });
    dob = e.detail.value;
    this.setData({
      dob: dob
    });
    console.log("dob是：", dob);
  },
  bindidc: function (e) {
    var idc = this.data.idc;
    console.log('idc获取到的值', e.detail.value);
    console.log(e);
    // this.setData({ idc: e.detail.value });
    idc = e.detail.value;
    this.setData({
      idc: idc
    });
    console.log("idc是：", idc);
  },
  bindusername: function (e) {
    var username = this.data.username;
    console.log('username获取到的值', e.detail.value);
    console.log(e);
    // this.setData({ username: e.detail.value });
    username = e.detail.value;
    this.setData({
      username: username
    });
    console.log("username是：", username);
  },
  bindpassword: function (e) {
    var password = this.data.password;
    console.log('password获取到的值', e.detail.value);
    console.log(e);
    // this.setData({ password: e.detail.value });
    password = e.detail.value;
    this.setData({
      password: password
    });
    console.log("password是：", password);
  },
  onLoad: function () {
    var _this = this;
    if (app._user.we.build) {
      _this.data.buildings.forEach(function (e, i) {
        if (e.split("栋")[0] == app._user.we.build) {
          _this.setData({
            ibuilding: i
          });
        }
      });
    }
    if (app._user.we.room) {
      _this.setData({
        'room': app._user.we.room
      });
    }
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
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
  buildingPicker: function (e) {
    this.setData({
      ibuilding: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'room') {
      this.setData({
        'room_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'room') {
      this.setData({
        'room_focus': false
      });
    }
  },
  roomInput: function (e) {
    this.setData({
      'room': e.detail.value
    });
    if (e.detail.value.length >= 3) {
      wx.hideKeyboard();
    }
  },


  next: function () {
    var _this = this;
    var flag = _this.data.flag;
    if (flag == 0) {
      if (_this.data.name == "" || _this.data.uname == "" || _this.data.gender == "") {
        app.showErrorModal('请先输入表单信息', '提醒');
        console.log("uname:", _this.data.uname);
        console.log("name:", _this.data.name);
        console.log("gender:", _this.data.gender);
      } else {
        this.setData({ flag: flag + 1 });
        console.log("uname:", _this.data.uname);
        console.log("name:", _this.data.name);
        console.log("gender:", _this.data.gender);
      }
    } else if (flag == 1) {
      if (_this.data.age == "" || _this.data.dob == "" || _this.data.idc == "") {
        app.showErrorModal('请先输入表单信息', '提醒');
      } else {
        this.setData({ flag: flag + 1 });
      }
    }

  },
  upload: function () {
    var _this = this;
    if (_this.data.username == "" || _this.data.password == "") {
      app.showErrorModal('请先输入表单信息', '提醒');
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
      var obj = { id: '0', name: _this.data.name, age: _this.data.age, gender: _this.data.gender, phone: _this.data.username, status: 'N', display: false };
      app._testData = obj;
      console.log(app._testData);
      console.log("backN")
      wx.navigateBack({
        delta: 1
      });
      console.log("backy")
    }
  },


  confirm: function () {
    var _this = this;
    var data = {
      openid: app._user.openid
    };
    if (!_this.data.ibuilding || !_this.data.room) {
      app.showErrorModal('请先输入表单信息', '提醒');
      return false;
    }
    if (!/^\d+$/.test(_this.data.room) || _this.data.room.length !== 3) {
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
      success: function (res) {
        if (res.data && res.data.status === 200) {
          app.appendInfo(data);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
          wx.navigateBack();
        } else {
          wx.hideToast();
          app.showErrorModal(res.data.message);
        }
      },
      fail: function () {
        wx.hideToast();
        app.showErrorModal(res.errMsg);
      }
    })
  }
});