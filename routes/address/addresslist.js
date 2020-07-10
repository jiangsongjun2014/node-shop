var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

/*
	接口：addresslist
	方法：post
	参数：user_id
*/ 
router.post("/addresslist", function(req, res) {
	var user_id = req.body.user_id
	var token = req.headers.authorization
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if (err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据
			if(user_id == undefined) {
				res.json({code: "1", msg: "用户id为空", data: ""})
			} else {
				var sql = "SELECT * from user_address where user_id = ?"
				var sqlparams = [user_id]
				connection.query(sql, sqlparams, function(err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						res.json({code: "0", msg: "", data: data})
					}
				})
			}
		}
	})
})

module.exports = router;