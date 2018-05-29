module.exports = {
    mongodb : 'mongodb://teris:123456@localhost:27017/sh_user'
    // 'mongodb://用户名:密码@localhost:27017(mongodb默认打开的端口号)/sh_user(数据库的名字)'
}

//数据库连接失败的时候，如果是MongoError: Authentication failed;需要向数据库添加用户；
//use sh_user (数据库名)
//db.createUser( 
//{ 
//user: “reportsUser”, （用户名）
//pwd: “12345678”,（密码）
//roles: [         （角色）
//{ role: “read”, db: “reporting” }, 
//{ role: “read”, db: “products” }, 
//{ role: “read”, db: “sales” }, 
//{ role: “readWrite”, db: “accounts” } 
//] 
//} 
//) 