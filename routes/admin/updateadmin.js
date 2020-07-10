var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updateadmin
	方法：post
	参数：user_id，nickname，pay_password，sex，age，phone
*/ 

router.post("/updateadmin", function (req, res) {
	var user_id = req.body.user_id
	var nickname = req.body.nickname
	var pay_password = req.body.pay_password
	var sex = req.body.sex
	var age = req.body.age
	var phone = req.body.phone
	var token = req.headers.authorization
	var date = new Date()
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据是否存在
			if (user_id == undefined) {
				res.json({code: "1", msg: "id为为空", data: ""})
			} else if (nickname == undefined ){
				res.json({code: "1", msg: "姓名为空", data: ""})
			} else if (sex == undefined) {
				res.json({code: "1", msg: "性别为空", data: ""})
			} else if (age == undefined) {
				res.json({code: "1", msg: "年龄为空", data: ""})
			} else if (phone == undefined){
				res.json({code: "1", msg: "手机号码为空", data: ""})
			} else if (pay_password == undefined){
				res.json({code: "1", msg: "支付密码为空", data: ""})
			} else {
				// 编辑分类
				var sql = "UPDATE user SET nickname=?,sex=?,age=?,phone=?,pay_password=?,update_time=? WHERE user_id = ?"
				var sqlparams = [nickname, sex, age, phone,pay_password, date, user_id]
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