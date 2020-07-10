var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：createcartorder
	方法：post
	参数：user_id，orderlist，user_address_id
*/ 

router.post("/createcartorder", function (req, res) {
	var orderlist = req.body.orderlist
	var user_id = req.body.user_id
	var user_address_id = req.body.addressId
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
			} else if (orderlist == undefined || orderlist.length < 0) {
				res.json({code: "1", msg: "提交列表为空", data: ""})
			} else {
				for (let i = 0; i < orderlist.length; i++) {
					var sql = "insert into orders (product_id, order_status, user_id,user_address_id, order_count, total_money, create_time) values (?, ?, ?, ?, ?, ?, ?)"
					var sqlparams = [orderlist[i].product_id, 0, user_id, user_address_id, orderlist[i].count, (orderlist[i].price*1)*(orderlist[i].count*1), date ]
					connection.query(sql, sqlparams, function(err, data) {
						if (err) {
							res.json({code: '1', msg: err, data: ""})
						} else {
							res.json({code: '0', msg: "", data: "操作成功"})
						}
					})
					var delsql = "DELETE FROM cart WHERE cart_id = ?"
					var delsqlparams = [orderlist[i].cart_id]
					connection.query(delsql, delsqlparams)
				}
			}
		}
	})
})

module.exports = router;