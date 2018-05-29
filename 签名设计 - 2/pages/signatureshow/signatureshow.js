var app = getApp();
var Zan = require('../../dist/index');

var GoodList = {};

Page(Object.assign({}, Zan.Quantity, Zan.Toast, {
  data: {
    empty: false,
    isLoading: true,
    checkboxItems: [],
    checkAll: true,
    isEdit: false,
    total: '0.00',
    goodArr: {},
    orderUrl: '',
    unable: ''
  },
  onLoad() {
    var ajaxPath = app.globalData.ajaxPath;
    var orderUrl = ajaxPath+"userShow.html";
    this.data.orderUrl = orderUrl;
    this.upDateList();
  },


  upDateList() { // 更新订单列表
    let _this = this;
    var openid = wx.getStorageSync('openid');
    console.log(openid);
    var searchUrl = this.data.orderUrl + "?weChatID=" + openid;
    wx.request({
      url: searchUrl,  //请求url
      method: 'POST',
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
        console.log(res.data);
        _this.initData(res.data);
      },
      fail: function (error) {
        console.log("fail");
      }
    })

  },

  initData(GoodList) {
    let _this = this
    let selectGoods = GoodList;
    console.log('selectGoods: ' + selectGoods);
    let goodArr = [];

    // 判断订单为空
    if (selectGoods.length == 0) {
      _this.setData({
        empty: true
      });
      return;
    }
    // 从globalData中获得选中的商品在购物车展示出来
    setTimeout(() => {
      selectGoods.forEach((k, index) => {
        let goodItem = {
          pic: k.imgUrl,
          video: k.videoUrl,
          checked: true,
          userName: k.name,
        }
        goodArr.push(goodItem);

      });
      _this.setData({
        checkboxItems: goodArr,
        isLoading: false
      });
    }, 300);
  },

  goIndex() {
    wx.switchTab({
      url: '../index/index'
    });
  }
}));