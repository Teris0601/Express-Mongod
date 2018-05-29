// pages/details/details.js
var app = getApp();
var Zan = require('../../dist/index')
var WxParse = require('../../wxParse/wxParse.js');

var util = require("../../utils/util.js");


var SignatureData = {};
Page(Object.assign({}, Zan.Quantity, Zan.topTips, {

  data: {
    phonecall: "15327325997",
    imgUrls: [],
    goodName: "加载中...",
    currentPrice: "0.00",
    originalPrice: "0.00",
    detail: "现实生活中很多地方会用到签名。合同签名，写信批文求职留名，都需要签名。人要衣装，知识要字装签好名能给人留下好印象，反映出自身的知识修养。 签名设计集合众多顶尖设计师为您量身定制，让您受益终生！高清晰的签名视频，勤加练习就可以拥有属于自己的个性签名！",
    kinds: [],
    kindName: "",
    // current: 0,
    // total: 0,
    smpic: "",
    indicatorDots: true,
    autoplay: true, 
    interval: 5000,
    duration: 1000,
    showDialog: false,
    ischeck: true,
    iscollected: true,
    userName: '',
    userIphone: '',
    gid: '',
    openid: ''
  },


  onLoad: function (options) {
    let _this = this;
    
     var ajaxPath = app.globalData.ajaxPath;
    this.setData({
       gid: options.gid
    })
    console.log(this.data.gid);
    wx.request({
      url: ajaxPath+'styleid.html?id=' + options.gid,  //请求url
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
        //_this.initData();
      },
      fail: function (error) {
        console.log("fail");
      }
    })


    var postsCollected = wx.getStorageSync('posts_Collected');
    this.setData({
      Collected: postsCollected
    })


  },
  getCopyTxt() {
    wx.setClipboardData({
      data: app.globalData.wx,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  initData(SignatureData) {
    console.log(SignatureData);
    this.setData({
      videoUrl: SignatureData.videoUrl,
      signatureName: SignatureData.styleName,
      currentPrice: SignatureData.price,
      originalPrice: SignatureData.oldPrice,
    });

    var article = this.data.detail;
    var that = this;
    WxParse.wxParse('article', 'html', article, that);
  },

  /*弹框的出现*/
  toggleDialog(e) {
    var _this = this;
    var id = this.data.gid;
    var ajaxPath = app.globalData.ajaxPath;
    console.log(id)
    wx.request({
      url:ajaxPath+'homePage.html',  //请求url
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      data: {},
      success: function (res) {
        setTimeout(() => {
          _this.setData({
            isLoading: false,
            SignatureData: res.data
          })
        }, 300)
        _this.processData(res.data,id);
      },
      fail: function (error) {
        console.log("fail");
      }
    })

    let gowhere;
    if(e){
      gowhere = e.currentTarget.dataset.gowhere;
    }
    if(gowhere && gowhere=='cart'){
      this.setData({
        goOrder: false
      })
    }else{
      setTimeout(()=>{
        this.setData({
          goOrder: true
        })
      },300)
    }
    this.setData({
      showDialog: !this.data.showDialog
    })
  },

  processData(SignatureData, id) {
    this.setData({
      kindName: SignatureData.type.data[id-1].styleName,
      total: SignatureData.type.data[id-1].price,
      kinds: SignatureData.type.data,
      id: id-1,
      smpic: SignatureData.type.data[id - 1].imgUrl
    });

    var article = SignatureData.detail;
  },


  /*签名样式选择*/
  tapKind(event) {
    console.log(this.data.SignatureData);
    var id = this.data.SignatureData.type.data[event.currentTarget.dataset.current].id
    var id = id - 1;
    console.log(id);
    this.setData({
      current: event.currentTarget.dataset.current,
      id: id,
      kindName: this.data.SignatureData.type.data[event.currentTarget.dataset.current].styleName,
      total: this.data.SignatureData.type.data[event.currentTarget.dataset.current].price + 5,
      signatureName: this.data.SignatureData.type.data[event.currentTarget.dataset.current].styleName,
      currentPrice: this.data.SignatureData.type.data[event.currentTarget.dataset.current].price,
      originalPrice: this.data.SignatureData.type.data[event.currentTarget.dataset.current].oldPrice,
      smpic: this.data.SignatureData.type.data[event.currentTarget.dataset.current].imgUrl,
    });
  },

  /*加入订单*/
  formBindsubmit: function (e) {
    var ajaxPath = app.globalData.ajaxPath;
    var that = this;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (e.detail.value.userName.length == 0) {
      wx.showToast({
        title: '输入姓名',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
      focus = !this.data.focus
      this.setData({
        focus: focus
      })
    } else if (e.detail.value.userIphone.length == 0) {
      wx.showToast({
        title: '输入手机号',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else if (e.detail.value.userEmail.length == 0) {
      wx.showToast({
        title: '输入邮箱',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else if (!myreg.test(e.detail.value.userIphone)) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1000)
    } else {
      let flag = true;
      let num = 0;

      

      let Collected = !this.data.Collected;
      wx.setStorageSync('posts_Collected', Collected)

      app.globalData.selectGoods.forEach((item, index) => {
        if (this.data.kid == item.kid) {
          flag = false;
        }
      });

      if (flag) {
        // app.getUserInfo(function (userInfo) {
        //   app.globalData.userInfo = userInfo;
        var openid = wx.getStorageSync('openid');
        this.setData({
          openid:openid
        })
        console.log("openid: ", this.data.openid);
        console.log("openid: ", openid);
        // });
        
        var money = this.data.total;
        var id = this.data.id;
        var total = this.data.total;
        //var _this=this;
        wx.login({
          success: function (res) {
            console.log(res.code);
            if (res.code) {
              wx.request({
                url:ajaxPath+ 'prepay.html',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                  code: res.code,      //要去换取openid的登录凭证
                  money: money,
                  num:app.globalData.num,
                },
                success: function (res) {
 
                  wx.requestPayment({
                    'timeStamp': res.data.timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': res.data.package,
                    'signType': 'MD5',
                    'paySign': res.data.paySign,
                    success: function (res) {
                      var openid = wx.getStorageSync('openid');
                     
                      console.log('支付成功'); 
                      wx.request({
                        url:ajaxPath+ 'addOrder.html',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        data: { weChatID: openid, styleId: id + 1, name: e.detail.value.userName, phone: e.detail.value.userIphone, email: e.detail.value.userEmail, price: total },
                        success: function (res) {
                        }
                      });        
                      wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 3000
                      })
                    },
                    fail: function (res) {
                      // fail
                      console.log(res);
                    },
                    complete: function (res) {
                      
                      console.log('总算完成了')    
                    }
                  })
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
        
      } else {
        wx.showToast({
          title: '已在订单中',
          icon: 'success',
          duration: 1000
        })
      }
    }
  },

  navigation() {
    wx.navigateTo({
      url: '../order/confirm/confirm'
    })
  },


  goIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  },

  /*加意外险*/
  switch1Change: function (e) {
    var ischeck = this.data.ischeck;
    if (ischeck) {
      this.setData({
        total: this.data.total + 5,
        ischeck: !ischeck
      })
    } else {
      this.setData({
        total: this.data.total - 5,
        ischeck: !ischeck
      })
    }
  },

  switch2Change: function (e) {
    var iscollected = this.data.iscollected;
    if (!this.data.Collected) {
      if (iscollected) {
        this.setData({
          total: this.data.total - 3,
          iscollected: !iscollected
        })
      } else {
        this.setData({
          total: this.data.total + 3,
          iscollected: !iscollected
        })
      }
    } else {
      wx.showToast({
        title: '你没有优惠券',
        icon: 'success',
        duration: 1000
      })
    }
  },


  calling: function () {
    //var phonecall = this.data.phonecall;
    //util.calling(phonecall)
    wx.setClipboardData({
      data: app.globalData.wx,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}));