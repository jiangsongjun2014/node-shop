var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

/*
	接口：deleteproduct
	方法：post
	参数：product_id
*/ 

router.post("/deleteproduct", function (req, res) {
	var product_id = req.body.product_id
	var token = req.headers.authorization
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if (err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (product_id == undefined ){
				res.json({code: "1", msg: "商品id为空", data: ""})
			} else {
				// 删除分类
				var sql = "DELETE FROM product WHERE product_id = ?"
				var sqlparams = [product_id]
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