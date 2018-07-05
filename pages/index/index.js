//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    imgUrls: [
     '/images/index/swiper1.jpg',
      '/images/index/swiper2.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    core: [
      // Entry and exit records（Double E Records） 出入记录情况
      { id: 'der', name: '出入情况', disabled: false, teacher_disabled: false },
      //Visitor management
      { id: 'vm', name: '访客管理', disabled: false, teacher_disabled: true },
      // Family management
      { id: 'fm', name: '家人管理', disabled: false, teacher_disabled: false },
      // Tenant management
      { id: 'tm', name: '租户管理', disabled: false, teacher_disabled: false },
      // Notice of announcement
      { id: 'na', name: '公告通知', disabled: false, teacher_disabled: false },
      // Vehicle information
      { id: 'vi', name: '车辆信息', disabled: false, teacher_disabled: false },
      // Property repair
      { id: 'pr', name: '物业报修', disabled: false, teacher_disabled: false },
      // One key for help
      { id: 'okfh', name: '一键求助', disabled: false, teacher_disabled: false }
    ],
    user: {},
    disabledItemTap: false //点击了不可用的页面
  },
  //下拉更新
  onPullDownRefresh: function(){
    if(app._user.is_bind){
      // this.getCardData();
    }
  },
  onShow: function(){
    var _this = this;
    _this.response();
    function isEmptyObject(obj){ for(var key in obj){return false;} return true; }
    function isEqualObject(obj1, obj2){ if(JSON.stringify(obj1) != JSON.stringify(obj2)){return false;} return true; }
    var l_user = _this.data.user,  //本页用户数据
        g_user = app._user; //全局用户数据
        l_user=g_user;
    //排除第一次加载页面的情况（全局用户数据未加载完整 或 本页用户数据与全局用户数据相等）
    if(isEmptyObject(l_user)  || isEqualObject(l_user.ac, g_user.ac)){
      return false;
    }
    //全局用户数据和本页用户数据不一致时，重新获取卡片数据
    if(!isEqualObject(l_user.we, g_user.we)){
      //判断绑定状态
      if(!g_user.is_bind){
        _this.setData({
          'remind': '未绑定'
        });
      }else{
        _this.setData({
          'remind': '加载中'
        });
        //清空数据
        _this.setData({
          user: app._user,
          'card.kb.show': false,
          'card.ykt.show': false,
          'card.jy.show': false,
          'card.sdf.show': false
        });
        _this.getCardData();
      }
    }
  },
  onLoad: function(){
    this.login();
  },
  login: function(){
    var _this = this;
    //如果有缓存
    if(!!app.cache){
      try{
        _this.response();
      }catch(e){
        //报错则清除缓存
        wx.removeStorage({ key: 'cache' });
      }
    }
    //然后通过登录用户, 如果缓存更新将执行该回调函数
    app.getUser(_this.response);
  },
  response: function(){
    var _this = this;
    _this.setData({
      user: app._user
    });
    //判断绑定状态
    if(!app._user.is_bind){
      _this.setData({
        'remind': '未绑定'
      });
    }else{
      _this.setData({
        'remind': '加载中'
      });
     // _this.getCardData();
    }
  },
  disabled_item: function(){
    var _this = this;
    if(!_this.data.disabledItemTap){
      _this.setData({
        disabledItemTap: true
      });
      setTimeout(function(){
        _this.setData({
          disabledItemTap: false
        });
      }, 2000);
    }
  },
  
});