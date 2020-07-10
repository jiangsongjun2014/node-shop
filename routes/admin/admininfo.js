var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：admininfo
	方法：post
	参数：userid_id，
*/ 

router.post("/admininfo", function(req, res) {
	var token = req.headers.authorization
	var user_id = req.body.user_id
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			if(user_id == undefined) {
				res.json({ code: "1", msg: "用户id为空", data: ""})
			} else {
				var sql = "select * from user where user_id = ?"
				var sqlparams = [user_id]
				connection.query(sql, sqlparams, function(err, data) {
					if (err) {
						res.json({ code: "1", msg: err, data: ""})
					} else {
						res.json({ code: "0", msg: "", data: data})
					}
				})
			}
		}
	})
})

module.exports = router;