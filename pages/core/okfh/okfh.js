Page({
  data: {
    disabled: true
  },
  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: '13700000000',
      success: function () {
        console.log("成功拨打电话")
      },
      error:function(){
        console.log("求助出故障，请自行联系物业")
      }
    })
  }
})
