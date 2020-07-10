var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updatecartstatus
	方法：post
	参数：cart_id, status
*/ 

router.post("/updatecartstatus", function (req, res) {
	var cart_id = req.body.cart_id
	var cart_status = req.body.status
	var token = req.headers.authorization
	var date = new Date() 
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (cart_id == undefined) {
				res.json({code: "1", msg: "id为空", data: ""})
			} else {
				var sql = "UPDATE cart set cart_status = ? where cart_id = ?"
				var sqlparams = [cart_status, cart_id]
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