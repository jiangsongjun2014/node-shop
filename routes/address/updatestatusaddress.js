var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updatestatusaddress
	方法：post
	参数：user_address_id
*/ 

router.post("/updatestatusaddress", function (req, res) {
	var user_address_id = req.body.id
	var token = req.headers.authorization
	var date = new Date()
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (user_address_id == undefined) {
				res.json({code: "1", msg: "id为为空", data: ""})
			}  else {
				var quesql = "select * from user_address"
				connection.query(quesql, function(err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						// 修改其他地址状态
						for (let i = 0; i<data.length; i++) {
							if (data[i].user_address_id !== user_address_id) {
								var sqls = "UPDATE user_address SET user_address_status=? where user_address_id = ?"
								var sqlsparams = [0, data[i].user_address_id]
								connection.query(sqls, sqlsparams)
							} else {
								var sqls = "UPDATE user_address SET user_address_status=? where user_address_id = ?"
								var sqlsparams = [1, user_address_id]
								connection.query(sqls, sqlsparams)
							}
						}
						res.json({code: "0", msg: "操作成功", data: ""})
					}
				})
			}
		}
	})
	
})

module.exports = router;