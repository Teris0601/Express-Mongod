var express = require('express');
var router = express.Router();
var User = require('../models/User');// 引入模型
/* GET users listing. */
router.all('/',function(req,res) {
 
  //获取查询参数
      //console.log(req.query);
      console.log(req.query.name);
      var name=req.query.name;
      var user={'username':req.query.name,'password':'12344567'};
      //console.log(User);
      if(!req.query.name) return res.send({
           msg:'用户名不能为空',
           data:3,
      });
      User.find({'username':name},(err,data)=>{
           if(err) return console.log('查询失败');
           if(data.length>0) return res.send({
               msg:"添加的用户已存在",
               code:3,
               data:[]
           });
          
            User.create(user,(err) => {
                if(err) return console.log("插入数据出错"+err);
                User.find({'username':name},(err,rul)=>{
                    if(err) return  console.log("查询数据数据出错"+err);
                      console.log(rul);
                      res.send({
                        msg:'添加用户成功',
                        code:4,
                        data:{
                           name:rul,
                           psaaword:'roots'
                        }
                    })
                }
        
                )
                
            })
           
          
      })


     
    
   
   //console.log(a)
  //向前端Ajax响应数据
  
  // res.send({
  //     key:'ok',
  //     data:req.query,
  //     user:'这个用户是傻逼'
  // });


});

module.exports = router;
