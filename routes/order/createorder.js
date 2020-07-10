var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：createorder
	方法：post
	参数：user_id，product_id，user_address_id，order_count，total_money
*/ 

router.post("/createorder", function (req, res) {
	var product_id = req.body.product_id
	var user_id = req.body.user_id
	var user_address_id = req.body.user_address_id
	var order_count = req.body.order_count
	var total_money = req.body.total_money
	var token = req.headers.authorization
	var date = new Date()
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (product_id == undefined) {
				res.json({code: "1", msg: "商品id为空", data: ""})
			} else if (user_id == undefined) {
				res.json({code: "1", msg: "用户id为空", data: ""})
			} else if (user_address_id == undefined) {
				res.json({code: "1", msg: "地址id为空", data: ""})
			} else if (order_count == undefined) {
				res.json({code: "1", msg: "数量为空", data: ""})
			} else if (total_money == undefined) {
				res.json({code: "1", msg: "总价为空", data: ""})
			} else {
				// 增加
				var sql = "insert into orders (product_id, order_status, user_id,user_address_id, order_count, total_money, create_time) values (?, ?, ?, ?, ?, ?, ?)"
				var sqlparams = [product_id, 0, user_id, user_address_id, order_count, total_money, date]
				connection.query(sql, sqlparams, function (err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						res.json({code: "0", msg: "操作成功", data: ""})
					}
				})
			}
		}
	})
})

module.exports = router;