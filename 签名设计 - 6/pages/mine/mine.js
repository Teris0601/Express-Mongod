var app = getApp();
var util = require("../../utils/util.js");


Page({
  data: {
    userInfo: {},
    userListInfo: [
      {
        icon: '../../images/picture/iconfont-dingdan.png',
        text: '我的订单',
        isorder: true,
        unreadNum: 2,
        path: '../order/confirm/confirm'
      },
      {
        icon: '../../images/picture/iconfont-card.png',
        text: '我的优惠券',
        isorder: true,
        unreadNum: 2,
        path: '../coupon/coupon'
      },
      {
        icon: '../../images/picture/iconfont-icontuan.png',
        text: '我的签名秀',
        isorder: true,
        unreadNum: 1,
        path: '../signatureshow/signatureshow'
      },
      {
        icon: '../../images/picture/iconfont-shouhuodizhi.png',
        text: '关于我们',
        isorder: true,
        path: '../about/about'
      },
      {
        icon: '../../images/picture/iconfont-kefu.png',
        text: '联系客服',
        isorder: true,
        path: '18210820283'
      }
    ]
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
   
  },
  
  bindViewTap(e){
    console.log(e);
    var userinfo=e.detail.userInfo;
    this.setData({
        userInfo:userinfo
    })
  },
  navigateTo(e) {
    const index = e.currentTarget.dataset.index;
    const path = e.currentTarget.dataset.path;
    switch (index) {
      case 4:
        phone: 
          util.calling(path)
        break;
      case 5:
        wx.showShareMenu({
          withShareTicket: true
        })
        break;
      default:
        util.navigateTo(path)
    }
  },

  onShareAppMessage: function () {
    return {
      title: '小程序设计签名',
      desc: '最具人气的小程序开发!',
      path: '/page/mine/mine?id=123'
    }
  },


})