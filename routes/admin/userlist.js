var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

/*
	接口：userlist
	方法：post
	参数：page， pagesize, keyword
*/ 
router.post("/userlist", function(req, res) {
	var page = parseInt(req.body.page)
	var pagesize = parseInt(req.body.pagesize)
	var keyword = req.body.keyword
	var token = req.headers.authorization
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if (err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证数据
			if (page < 1 && page ==undefined) {
				res.json({code: "1", msg: "当前页信息错误", data: ""})
			} else if(pagesize == undefined) {
				res.json({code: "1", msg: "每页数量为空", data: ""})
			} else {
				if (keyword) {
					var sql = "SELECT * from user LEFT JOIN role on user.role_id = role.role_id WHERE nickname = ?"
					var sqlparams = [keyword]
					connection.query(sql, sqlparams, function(err, data) {
						if (err) {
							res.json({code: "1", msg: err, data: ""})
						} else {
							var sqls = "select count(*) as totallength from user WHERE nickname = ?"
							var sqlsparams = [keyword]
							connection.query(sqls,sqlsparams, function (err, datas) {
								res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
							})
						}
					})
				} else {
					var sql = "SELECT * from user LEFT JOIN role on user.role_id = role.role_id LIMIT ?, ?"
					var sqlparams = [(page - 1) * pagesize, pagesize]
					connection.query(sql, sqlparams, function(err, data) {
						if (err) {
							res.json({code: "1", msg: err, data: ""})
						} else {
							var sqls = "select count(*) as totallength from user"
							connection.query(sqls, function (err, datas) {
								res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
							})
						}
					})
				}
			}
		}
	})
})

module.exports = router;