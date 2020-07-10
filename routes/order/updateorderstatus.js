var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updateorderstatus
	方法：post
	参数：order_id
*/ 

router.post("/updateorderstatus", function (req, res) {
	var order_id = req.body.order_id
	var token = req.headers.authorization
	var date = new Date() 
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (order_id == undefined) {
				res.json({code: "1", msg: "id为空", data: ""})
			} else {
				var sql = "UPDATE orders set order_status = 1 where order_id = ?"
				var sqlparams = [order_id]
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