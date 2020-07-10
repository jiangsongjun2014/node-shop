var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updateallcartstatus
	方法：post
	参数：user_id, status
*/ 

router.post("/updateallcartstatus", function (req, res) {
	var user_id = req.body.user_id
	var cart_status = req.body.status
	var token = req.headers.authorization
	var date = new Date() 
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (user_id == undefined) {
				res.json({code: "1", msg: "id为空", data: ""})
			} else {
				var sql = "UPDATE cart set cart_status = ? where user_id = ?"
				var sqlparams = [cart_status, user_id]
				connection.query(sql, sqlparams, function (err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						res.json({code: "0", msg: "", data: "操作成功"})
					}
				})
			}
		}
	})
})

module.exports = router;