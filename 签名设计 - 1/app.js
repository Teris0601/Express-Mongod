//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
  
  },
   //获取用户登陆信息   
   
  getUserInfo: function (ag) {
    var that = this;
    var ajaxPath=this.globalData.ajaxPath;
    if (this.globalData.userInfo) {
      typeof ag == "function" && ag(this.globalData.userInfo);
    } else {
      wx.authorize({
        scope: 'scope.userInfo',
        success:()=>{
          //调用登录接口
          wx.login({
            success: function (res) {
              var code = res.code
              
              wx.request({
                url: ajaxPath+'addUser.html',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  code: res.code,
                  num:that.globalData.num
                },
                success: function (res) {
                   console.log(res);
                  wx.setStorageSync('openid', res.data);
                  console.log("openid: ",res.data);
                }
              });

              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo
                  typeof ag == "function" && ag(that.globalData.userInfo);
                }
              });
            }
          })
        },
        fail:()=>{
          console.log('用户拒绝授权');
          wx.showModal({
            title: '提示',
            content: '拒绝授权可能影响您的用户体验！点击下方“确认授权”打开“用户信息”即可开启授权。',
            cancelText: "拒绝",
            confirmText: "确认授权",
            confirmColor: "#1AAD19",
            success: function (res) {
              if (res.confirm) {
                // 这个 API 是基础库 1.1.0 才有的，所以需要做兼容处理：
                if (wx.openSetting) {
                  wx.openSetting({
                    success: function(res){
                      //第三种情况：用户拒绝授权，进入引导弹窗，用户点击授权，进入授权设置页，用授权。 
                      console.log('引导用户成功授权');
                      wx.login({
                        success: function (res) {
                          console.log(res.code);
                          // 通过code获取openid
                          wx.request({
                            url: 'https://api.weixin.qq.com/sns/jscode2session',
                            method: 'POST',
                            header: {
                              'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: {
                              //小程序唯一标识
                              appid: that.globalData.appid,
                              //小程序的 app secret
                              secret: that.globalData.appsecret,
                              grant_type: 'authorization_code',
                              js_code: res.code
                            },
                            success: function (res) {
                              // console.log(res);
                              wx.setStorageSync('openid', res.data.openid);
                            }
                          });
                          wx.getUserInfo({
                            success: function (res) {
                              that.globalData.userInfo = res.userInfo
                              typeof ag == "function" && ag(that.globalData.userInfo);
                            }
                          });
                        }
                      })
                    }
                  })
                } else {
                  wx.showModal({
                    title: '授权提示',
                    content: '错过授权处理方法：删除小程序->重新搜索励熙商城进入->点击授权按钮'
                  })
                }
              } else if (res.cancel) {//第二种情况：用户拒绝授权，进入引导弹窗，用户继续拒绝授权。
                wx.showModal({
                  title: '提示',
                  content: '错过授权处理方法：删除小程序->重新搜索励熙商城进入->点击授权按钮',
                  showCancel: false,
                  confirmColor: "#c00",
                  success: function (res) {
                    console.log(res);
                    if (res.confirm) {
                      console.log('用户点击确定');
                    }
                  }
                })
              }
            }
          });
        }
      });
      
    }
  },

  globalData: {
    userInfo: null,
   
  },

  onShow: function(){
    console.log('App Show');
  },
  onHide: function(){
    console.log('App Hide')
  },
  
  globalData: {
    selectGoods: [],
    wx: 'but773',//需要复制的微信号
    ajaxPath:'https://beijingzhuangxiu01.cn/yibao2/',
    //ajaxPath: 'http://192.168.0.178:8080/',
    appid:'wx0411563df04efc4b',
    appsecret:'f63ee3f050391f89b5a58f415a6f4dea',
    num:1,
  }
})