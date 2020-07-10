var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

/*
	接口：deleteaddress
	方法：post
	参数：user_address_id
*/ 

router.post("/deleteaddress", function (req, res) {
	var user_address_id = req.body.user_address_id
	var token = req.headers.authorization
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (user_address_id == undefined ){
				res.json({code: "1", msg: "id为空", data: ""})
			} else {
				// 删除地址
				var sql = "DELETE FROM user_address WHERE user_address_id = ?"
				var sqlparams = [user_address_id]
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