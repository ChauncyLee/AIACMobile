//news.js
//获取应用实例
var app = getApp();
Page({
  data: {
    page: 0,
     'active': {
      id: 0,
      'type': 'all',
      data: [
        { articleid: 1, title: "关于小区FaceAC人脸识别门禁安装通知", time: "2018-04-10" },
        { articleid: 2, title: "关于小区养宠物建议", time: "2018-04-8"},
        { articleid: 8, title: "关于近期气温变化建议", time: "2018-04-05" },
        { articleid: 3, title: "关于小区近期公共设施维护通知", time: "2018-03-25"},
        { articleid: 4, title: "关于小区运动馆开放方式通知", time: "2018-03-18"},
        { articleid: 5, title: "收缴水费通知", time: "2018-03-05"},
        { articleid: 6, title: "关于小区部分电路检修通知", time: "2018-03-03"},
        { articleid: 7, title: "收缴电费知", time: "2018-03-01"},        
        { articleid: 9, title: "关于小区快递箱启用通知", time: "2018-02-26"}
      ],
      showMore: true,
      remind: '上滑加载更多'
    },
    loading: false,
    user_type: 'guest',
    disabledRemind: false
  },
  onLoad: function () {
    this.getNewsList();
  },
  onShow: function () {
    if (app._user.is_bind) {
      this.setData({
        user_type: !app._user.teacher ? 'student' : 'teacher'
      });
    } else {
      this.setData({
        user_type: 'guest',
        'active.id': 5,
        'active.type': 'new'
      });
      // this.getNewsList();
    }
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;
    _this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'page': 0
    });
    // _this.getNewsList();
  },
  //上滑加载更多
  onReachBottom: function () {
    var _this = this;
    if (_this.data.active.showMore) {
      // _this.getNewsList();
    }
  },
  //获取新闻列表
  // getNewsList: function (typeId) {
  //   var _this = this;
  //   typeId = typeId || _this.data.active.id;
  //   if (_this.data.page >= 5) {
  //     _this.setData({
  //       'active.showMore': false,
  //       'active.remind': '没有更多啦'
  //     });
  //     return false;
  //   }
  //   if (!_this.data.page) {
  //     _this.setData({
  //       'active.data': _this.data.list[typeId].storage
  //     });
  //   }
  //   _this.setData({
  //     'active.remind': '正在加载中'
  //   });
  //   wx.showNavigationBarLoading();
  //   wx.request({
  //     url: app._server + '/api/' + _this.data.list[typeId].url,
  //     data: {
  //       page: _this.data.page + 1,
  //       openid: app._user.openid
  //     },
  //     success: function (res) {
  //       if (res.data && res.data.status === 200) {
  //         if (_this.data.active.id != typeId) { return false; }
  //         if (res.data.data) {
  //           if (!_this.data.page) {
  //             if (!_this.data.list[typeId].storage.length || app.util.md5(JSON.stringify(res.data.data)) != app.util.md5(JSON.stringify(_this.data.list[typeId].storage))) {
  //               var data = {
  //                 'page': _this.data.page + 1,
  //                 'active.data': res.data.data,
  //                 'active.showMore': true,
  //                 'active.remind': '上滑加载更多',
  //               };
  //               data['list[' + typeId + '].storage'] = res.data.data;
  //               _this.setData(data);
  //             } else {
  //               _this.setData({
  //                 'page': _this.data.page + 1,
  //                 'active.showMore': true,
  //                 'active.remind': '上滑加载更多'
  //               });
  //             }
  //           } else {
  //             _this.setData({
  //               'page': _this.data.page + 1,
  //               // 'active.data': _this.data.active.data.concat(res.data.data),
  //               'active.showMore': true,
  //               'active.remind': '上滑加载更多',
  //             });
  //           }
  //         } else {
  //           _this.setData({
  //             'active.showMore': false,
  //             'active.remind': '没有更多啦'
  //           });
  //         }
  //       } else {
  //         app.showErrorModal(res.data.message);
  //         _this.setData({
  //           'active.remind': '加载失败'
  //         });
  //       }
  //     },
  //     fail: function (res) {
  //       app.showErrorModal(res.errMsg);
  //       _this.setData({
  //         'active.remind': '网络错误'
  //       });
  //     },
  //     complete: function () {
  //       wx.hideNavigationBarLoading();
  //       wx.stopPullDownRefresh();
  //       _this.setData({
  //         loading: false
  //       });
  //     }
  //   });
  // },
  //获取焦点
  changeFilter: function (e) {
    this.setData({
      'active': {
        'id': e.target.dataset.id,
        'type': e.target.id,
        data: [],
        showMore: true,
        remind: '上滑加载更多'
      },
      'page': 0
    });
    this.getNewsList(e.target.dataset.id);
  },
  //无权限查询
  changeFilterDisabled: function () {
    var _this = this;
    if (!_this.data.disabledRemind) {
      _this.setData({
        disabledRemind: true
      });
      setTimeout(function () {
        _this.setData({
          disabledRemind: false
        });
      }, 2000);
    }
  }
});