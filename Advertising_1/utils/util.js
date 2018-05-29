const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function addwechat(data) {
  wx.setClipboardData({
    data: data,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          console.log("设置剪贴板:" + res.data)
        }
      })
    }
  })
  wx.getClipboardData({
    success: function (res) {
      wx.showModal({
        title: '微信号复制成功',
        content: ("添加步骤: 打开微信 > 添加好友 > 长按粘贴 > 点击搜索，然后添加我们"),
      })
    }
  })
}

function calling(data) {
  wx.makePhoneCall({
    phoneNumber: data,
    success: function () {
      console.log("拨打电话成功！")
    },
    fail: function () {
      console.log("拨打电话失败！")
    }
  })
}


module.exports = {
  formatTime: formatTime,
  addwechat: addwechat,
  calling: calling
}
