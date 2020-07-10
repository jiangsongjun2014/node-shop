var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

/*
	接口：orderlist
	方法：post
	参数：user_id
*/ 
router.post("/orderalllist", function(req, res) {
	var page = parseInt(req.body.page)
	var pagesize = parseInt(req.body.pagesize)
	var keyword = req.body.keyword
	var token = req.headers.authorization
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if (err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			if (keyword) {
				var sql = "SELECT * from orders LEFT JOIN product on orders.product_id = product.product_id LEFT JOIN user_address on orders.user_address_id = user_address.user_address_id where user_address.user_address_name = ?"
				var sqlparams = [page, pagesize, keyword]
				connection.query(sql, sqlparams, function (err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						var sqls = "select count(*) as totallength from orders LEFT JOIN product on orders.product_id = product.product_id LEFT JOIN user_address on orders.user_address_id = user_address.user_address_id where user_address.user_address_name = ?"
						var sqlsparams = [keyword]
						connection.query(sqls, sqlsparams, function (err, datas) {
							res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
						})
					}
				})
			} else {
				var sql = "SELECT * from orders LEFT JOIN product on orders.product_id = product.product_id LEFT JOIN user_address on orders.user_address_id = user_address.user_address_id LIMIT ?, ?"
				var sqlparams = [page, pagesize]
				connection.query(sql, sqlparams, function (err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						var sqls = "select count(*) as totallength from orders"
						connection.query(sqls, function (err, datas) {
							res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
						})
					}
				})
			}
		}
	})
})

module.exports = router;