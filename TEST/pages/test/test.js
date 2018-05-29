// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    headImg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var user = {};
    wx.getUserInfo({
      success: function(res) {
        // userInfo = res.userInfo;
        // var temp = {    
        //   name: res.userInfo.nickName,
        //   headImg: res.userInfo.avatarUrl
        // }
        // var user = Object.assign({},temp);
        // that.data.name = res.userInfo.nickName;
        // that.data.headImg = user.headImg;
        // that.setData({ 
        //   user: user
        // })


        var name = res.userInfo.nickName;
        that.processData(name);
        that.data.username = name;
      }
      
   
    })
   
    //console.log("headImg: " + this.data.headImg)
 
  },

  processData(username) {
    console.log("name: ", this.data.username);
    console.log("name: ", username);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})