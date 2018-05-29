// pages/signature/signature.js

var goodlistdata = require('../../data/signatureList.js');
var GoodList = {};
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    artDevise: '../../images/picture/art.jpg',
    cancel: '../../images/picture/xx.png',
    requestUrl: "",
    goodData: {},
    signatures: {},
    totalCount: 1,
    containerShow: true,
    searchPanelShow: false,
    isLoading: true,
    isEmpty: true
  },

  onLoad: function (options) {
    let _this = this;
    var ajaxPath = app.globalData.ajaxPath;
    var dataUrl = ajaxPath+ "signatureShowList.html";
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processData);
    //_this.initData();

  },

  processData: function(signatureData){
    console.log( signatureData);
    var signatures = [];
    if (!signatureData) return false;
    for(var idx in signatureData.list){
      var subject = signatureData.list[idx];
      var lastPage = signatureData.lastPage;
      var pic1 = subject.img
      var pic2 = "https://beijingzhuangxiu01.cn/"
      var pic =pic2.concat(pic1) 

      var temp = {
        pic: pic,
        id: subject.id,
        name: subject.name,
        class: subject.styleName
      }
      signatures.push(temp)
    }
    var totalSignatures = {}
    
    if (!this.data.isEmpty) {
        totalSignatures = this.data.signatures.concat(signatures);
    } else {
      totalSignatures = signatures;
      this.data.isEmpty = false;
    }

    this.setData({
      signatures: signatures
    })
    this.data.totalCount += 1;
    //结束当前页面导航条加载动画
    wx.hideNavigationBarLoading();
    //结束当前页面上拉刷新的动画
    wx.stopPullDownRefresh();
  },

  onScrollLower: function(event){ 
    var nextUrl = this.data.requestUrl + "?pageNo=" + this.data.totalCount + "&pageSize=10";
    util.http(nextUrl, this.processData);
    //在请求的时候，在当前页面显示导航条加载动画，setdata的时候结束导航条加载动画
    wx.showNavigationBarLoading()
  },


  //页面实现下拉刷新的功能
  onPullDownRefresh: function(){
    console.log("onPullDownRefresh");
    var refreshUrl = this.data.requestUrl + "?start=1&count=15";
    this.data.signatures = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl,this.processData);
    wx.showNavigationBarLoading()
  },


  onBindFocus: function (event) {
    this.setData({
      // 数据绑定的页面的状态给换了
      containerShow: false,
      searchPanelShow: true
    })
  },

  // 关键字搜索功能
  onBindChange: function (event) {
    var _this = this;
    var text = event.detail.value;
    var searchUrl = this.data.requestUrl
    wx.request({
      url: searchUrl,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { key: event.detail.value },
      success: function (res) {
        _this.processSearchData(res.data);
      }
    })  
    // util.http(searchUrl, this.processSearchData);
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    })
  },

  processSearchData: function (signatureData) {
    console.log(signatureData);
   
    var signatures = [];
    for (var idx in signatureData.list) {
      var subject = signatureData.list[idx];

      var temp = {
        pic: subject.imgUrl,
        id: subject.styleId,
        name: subject.name,
        class: subject.styleName
      }
      signatures.push(temp)
    }
    this.setData({
      signatures: signatures
    })
  },



  onCancelImg: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },


  initData() {
    let orderArr = [];
    let types = [];
    for (let i in GoodList.type) {
      let typeItem = {};
      if (GoodList.type[i].recommended) {
        typeItem.id = GoodList.type[i].tid;
        typeItem.title = GoodList.type[i].name;
        types.push(typeItem);
        orderArr.push(GoodList.type[i].tid);
      }
    }
    let orderId = Math.min(...orderArr);
    this.setGoodList(orderId);
  },

  setGoodList(typ) {
    for (let i in GoodList.type) {
      if (GoodList.type[i].tid == typ) {
        this.setData({
          goodData: GoodList.type[i]
        });
      }
    }
  },

  
  onShareAppMessage: function () {
  
  }
})