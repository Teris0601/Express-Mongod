var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Tab, {
  data: {
    isLoading: true,
    showcoupon: '../../images/picture/coupon.jpg',
    showcouponfade: '../../images/picture/couponfade.jpg',

    orderTab: {
      list: [{
        id: '1',
        title: '我的优惠券'
      }],
      selectedId: '1',  
      scroll: false,
      height: 45
    }
  },
  
  onLoad: function () {
    //模拟请求
    setTimeout(() => {
      this.setData({
        isLoading: false
      })
    })

    var postsCollected = wx.getStorageSync('posts_Collected');
    this.setData({
      Collected: postsCollected
    })
  },
  
}));

