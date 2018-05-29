//index.js
var GoodList = {};
var app = getApp();

var goodlistdata = require('../../data/signatureList.js');

Page({
  data: {
    bgImg: '../../images/picture/mall.jpg',
    coupon: '../../images/picture/coupon.jpg',
    coupon_anti: '../../images/picture/couponfade.jpg',
    isLoading: true,
    goodData: {},
    openid: '',
    devise: '../../images/picture/devise.jpg',
    kefu: '../../images/picture/kefu.png',
    close: '../../images/picture/close.png',
    flag_wechat: true,
    flag_error: true,
    isReceive: false,
    collected: true
  },

  receive: function (e) {
    var postsCollected = wx.getStorageSync('posts_Collected')
    console.log(postsCollected);
    //领取变成不领取，不领取变成不领取
    postsCollected = !postsCollected;
    this.showToast(postsCollected, postsCollected);


    if (!this.data.isReceive) {
      this.setData({
        flag_wechat: false,
      });
    } else {
      this.setData({ flag_wechat: false });
    }
  },

  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_Collected', postsCollected);
    this.setData({
      collected: postCollected
    })
  },

  hidden: function (e) {
    this.setData({
      flag_wechat: true,
      isReceive: true
    });
  },

  addwechat: function () {
    var wechatNumber = this.data.wechatNumber
    util.addwechat(wechatNumber)
  },
  ensure: function () {
    this.setData({
      flag_wechat: true,
      isReceive: true
    });
  },

  onLoad: function () {
    let _this = this;
    var ajaxPath = app.globalData.ajaxPath;
    // setTimeout(() => {
    //     _this.setData({
    //         isLoading: falses
    //     })
    // }, 300);
    app.getUserInfo(function (userInfo) {
      app.globalData.userInfo = userInfo; 
    });
  
    wx.request({
      url: ajaxPath+'homePage.html',  //请求url
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      data: {},
      success: function (res) {
        setTimeout(() => {
          _this.setData({
            isLoading: false
          })
        }, 300)
        _this.initData(res.data);
      },
      fail: function (error) {
        console.log("fail");
      }
    })


    // GoodList = goodlistdata;
    // _this.initData();


    var postsCollected = wx.getStorageSync('posts_Collected')


    if (postsCollected) {
      this.setData({
        collected: postsCollected //优惠券是否被领取
      })
    } else {
      var postsCollected = {};
      wx.setStorageSync('posts_Collected', postsCollected); //把postsCollected对象放入到缓存当中
    }


  },

  // processData(signatureData){
  //   var 
  // },

  initData(GoodList) {
    console.log(GoodList);
    let orderArr = [];
    let types = [];

    let typeItem = {};
    if (GoodList.type.recommended) {
      typeItem.id = GoodList.type.tid;
      typeItem.title = GoodList.type.name;
      types.push(typeItem);
      orderArr.push(GoodList.type.tid);
    }

    let orderId = Math.max(...orderArr);
    this.setGoodList(GoodList, orderId);
  },

  setGoodList(GoodList, typ) {
    if (GoodList.type.tid == typ) {
      this.setData({
        goodData: GoodList.type
      });
    }

  },
  tapGood(event) {
    wx.navigateTo({
      url: '../details/details?gid=' + event.currentTarget.dataset.gid
    })
  },

  onShareAppMessage: function (res) {
    var that = this;
    //分享的类型为按键类型
    if (res.from == 'button') {
      if (res.target.id == 1) {
        return {
          title: '按键1要分享的功能',
          path: '/pages/index/index',
          success: function (res) {

          }
        }
      }
      if (res.target.id == 2) {
        return {
          title: '按键2要分享的功能',
          path: 'pages/signature/signature',
          success: function (res) {

          }
        }
      }
    } else {
      return {
        title: '点击右上角要分享的标题',
        path: '/pages/index/index',
        success: function (res) {

        }
      }
    }

  }


})