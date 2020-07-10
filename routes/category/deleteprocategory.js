var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

/*
	接口：deleteprocategory
	方法：post
	参数：product_like_id
*/ 

router.post("/deleteprocategory", function (req, res) {
	var product_like_id = req.body.product_like_id
	var token = req.headers.authorization
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (product_like_id == undefined ){
				res.json({code: "1", msg: "类别id为空", data: ""})
			} else {
				// 删除分类
				var sql = "DELETE FROM product_like WHERE product_like_id = ?"
				var sqlparams = [product_like_id]
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