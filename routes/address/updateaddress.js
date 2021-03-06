var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updateaddress
	方法：post
	参数：user_address_name，user_address_phone，user_address_detail，user_address_status，user_address_id
*/ 

router.post("/updateaddress", function (req, res) {
	var user_address_name = req.body.user_address_name
	var user_address_phone = req.body.user_address_phone
	var user_address_detail = req.body.user_address_detail
	var user_address_status = req.body.user_address_status
	var user_address_id = req.body.user_address_id
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
			} else if (user_address_name == undefined ){
				res.json({code: "1", msg: "姓名为空", data: ""})
			} else if (user_address_phone == undefined) {
				res.json({code: "1", msg: "电话为空", data: ""})
			} else if (user_address_status == undefined) {
				res.json({code: "1", msg: "状态为空", data: ""})
			} else if (user_address_detail == undefined){
				res.json({code: "1", msg: "地址为空", data: ""})
			}  else {
				// 编辑地址
				var sql = "UPDATE user_address SET user_address_name=?,user_address_phone=?,user_address_detail=?,user_address_status=?,update_time=? WHERE user_address_id = ?"
				var sqlparams = [user_address_name, user_address_phone, user_address_detail, user_address_status, date, user_address_id]
				connection.query(sql, sqlparams, function (err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						if(user_address_status) {
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
										} 
									}
									res.json({code: "0", msg: "操作成功", data: ""})
								}
							})
						} else {
							res.json({code: "0", msg: "操作成功", data: ""})
						}
					}
				})
			}
		}
	})
	
})

module.exports = router;