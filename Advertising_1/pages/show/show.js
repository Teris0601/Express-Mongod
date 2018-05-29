var postsData = require('../../data/posts-data.js')
var util = require("../../utils/util.js")

Page({
  data: {
    phonecall: '15327325997',
    wechatNumber: 'jduw69',
    flag_wechat: true,
    flag_error: true,
    banners: [
      {
        id: 0,
        img: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/aa8a227c29b3873bbfa34397d50db0a6e33a5f9cb4c86c83baf782d2ff3aa7079fd75d46a75be623d2c9bdf1eaf8282b?pictype=scale&from=30113&version=2.0.0.2&uin=2678697201&fname=top1.jpg&size=1024',
      },
      {
        id: 1,
        img: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/959ecedc887daf82e10476a72dfbc14d9dfe9db68b0d7cc3b626b0ed4f6676ab3a565ecfa35f4c0a8101033a6cd77111?pictype=scale&from=30113&version=2.0.0.2&uin=2678697201&fname=top2.jpg&size=1024',
      },
      {
        id: 2,
        img: 'https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/5c8471335b60a530062630969756fe828db87093fef325841a2e30b603c09298af55e9a9c7d4a946b208f6a5b8692689?pictype=scale&from=30113&version=2.0.0.2&uin=2678697201&fname=top3.jpg&size=1024',
      }
    ],
   
    show_pic: "https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/a6bbfafd553abeb3af1c0cd13ad92c1de1b77475bcc95279d2d02907d2729e1bbee0f143bba98d9ede62c2f2126c8a0c?pictype=scale&from=30113&version=2.0.0.2&uin=2678697201&fname=end.jpg&size=1024"
  },

  onLoad: function () {
    this.setData({
      shops_key: postsData.postList,
      msgList: [
        { url: "../myfortune/myfortune", title: "藏品江湖千人交流会，诚邀您的光临！" },
        { url: "../myfortune/myfortune", title: "详情添加微信：jduw69" },
      ]
    });
  },

  tapBanner: function (e) {
    this.setData({ flag_wechat: false });
  },

  hidden: function (e) {
    this.setData({ flag_wechat: true });
  },

  addwechat: function () {
    var wechatNumber = this.data.wechatNumber
    util.addwechat(wechatNumber)
  },
  calling: function () {
    var phonecall = this.data.phonecall
    util.calling(phonecall)
  },

  ensure: function () {
    this.setData({ flag_wechat: true });
  },

  toSeller: function (event) {
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: './detail/detail?id=' + postId,
    })
  },
  onShowTap: function (event) {
    var postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: './detail/detail?id=' + postId,
    })
  }
})
