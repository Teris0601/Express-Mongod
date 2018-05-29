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

function calling(data){
  wx.makePhoneCall({
    phoneNumber: data,
    success: function(){
      console.log("拨打电话成功!");
    },
    fail: function(){
      console.log("拨打电话失败!");
    }
  })
}



function onShareAppMessage() {
  return 
}

function navigateTo(path){
  wx.navigateTo({
    url: path,
  })
}

function http(url,callback){
  wx.request({
    url: url,
    method: 'POST',
    header:{
      "Content-Type": "json"
    },
    success: function(res){
      callback(res.data);
    },
    fail: function(error){
      console.log(error);
    }
  })
}



module.exports = {
  formatTime: formatTime,
  calling: calling,
  onShareAppMessage: onShareAppMessage,
  navigateTo: navigateTo,
  http: http

}
