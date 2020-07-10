
var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"


router.post("/login", function(req,res){
	// 获取参数
	var username = req.body.username
	var password = req.body.password
	// 判断参数是否存在
	if (username == undefined) {
		res.json({code: "1", msg: "请输入账号", data: ""})
	} else if (password == undefined) {
		res.json({code: "1", msg: "请输入密码", data: ""})
	} else {
		// 查询用户是否存在
		var quesql = "select user_id, username, password,nickname,role_id from user where username = ?"
		var quesqlparams = [username]
		connection.query(quesql, quesqlparams, function(err,data){
			if (err) {
				res.json({code: "1", msg: err, data: ""})
			} else {
				if (data.length == 0) {
					res.json({code: "1", msg: "用户不存在", data: ""})
				} else {
					var user = data[0]
					if (password == user.password) {
						// 定义加密数据
						var jwtflag = {username: username},
						// 生成token 
						token = jwt.sign(jwtflag, jwtkey, {expiresIn: 60 * 60 * 60});
						if (token) {
							res.json({code: "0", msg: "登录成功", data:user, token: token})
						} else {
							res.json({code: "1", msg: "token生成失败", data: ""})
						}
					} else {
						res.json({code: "1", msg: "密码错误", data: ""})
					}
				}
			}
		})
	}
})

module.exports = router