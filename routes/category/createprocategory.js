var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：createprocategory
	方法：post
	参数：product_like_name，product_like_status
*/ 

router.post("/createprocategory", function (req, res) {
	var product_like_name = req.body.product_like_name
	var product_like_status = req.body.product_like_status
	var token = req.headers.authorization
	var date = new Date()
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (product_like_name == undefined) {
				res.json({code: "1", msg: "类别名称为空", data: ""})
			} else if (product_like_status == undefined) {
				res.json({code: "1", msg: "状态为空", data: ""})
			} else {
				// 增加分类
				var sql = "insert into product_like (product_like_name, product_like_status, create_time) values (?, ?, ?)"
				var sqlparams = [product_like_name, product_like_status, date]
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