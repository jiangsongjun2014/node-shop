
/* 
	注册：register
	方法：Post
	参数：username， password
*/ 

var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")

router.post("/register", function (req,res) {
	// 获取数据
	var username = req.body.username
	var password = req.body.password
	var date = new Date()
	// 判断账号是否存在
	var sql = "select username from user where username = ?"
	var sqlparams = [username]
	connection.query(sql, sqlparams, function(err, data) {
		if (err) {
			res.json({code: "1", msg: "注册失败" + err, data: ""})
		} else {
			if (data.length == 0) {
				// 注册
				var addsql = "insert into user(username,role_id,create_time,password) values (?,?,?,?)"
				var addsqlparams = [username,"1003", date, password]
				connection.query(addsql, addsqlparams, function(err, data) {
					res.json({code: "0", msg: "注册成功", data:""})
				})
			} else {
				res.json({code: "1", msg: "账号已存在", data: ""})
			}
		}
	})
})

module.exports = router