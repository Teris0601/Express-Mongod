var express = require('express');
var router = express.Router();

/* GET home page. */

// router.get('/', function(req, res, next) {
//   console.log('请求成功');
  
//   res.send({
//       key:'ok',
//   })
// });

router.all('/',function(req,res) {
  console.log(req.method); //提交方式
  console.log(req.baseUrl);  //上级请求路径
  console.log(req.path);   //当前请求路径

  //获取头部信息
  console.log(req.headers['user-agent']);
  console.log(req.get('user-agent'));

  //获取查询参数
  console.log(req.query);

  //post请求时，获取body中的json对象
  console.log(req.body);

  //向前端Ajax响应数据
  res.send({
      key:'ok',
      data:req.query
  });


});

module.exports = router;
