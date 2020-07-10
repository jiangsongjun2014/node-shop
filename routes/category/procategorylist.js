var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")

/*
	接口：procategorylist
	方法：post
	参数：page， pagesize, keyword
*/ 
router.post("/procategorylist", function(req, res) {
	var page = parseInt(req.body.page)
	var pagesize = parseInt(req.body.pagesize)
	var keyword = req.body.keyword
	if (page < 1 && page ==undefined) {
		res.json({code: "1", msg: "当前页信息错误", data: ""})
	} else if(pagesize == undefined) {
		res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
	} else {
		if (keyword) {
			var sql = "SELECT * from product_like WHERE product_like_name = ?"
			var sqlparams = [keyword]
			connection.query(sql, sqlparams, function(err, data) {
				if (err) {
					res.json({code: "1", msg: err, data: ""})
				} else {
					var sqls = "select count(*) as totallength from product_like WHERE product_like_name = ?"
					var sqlsparams = [product_like_name]
					connection.query(sqls, sqlsparams, function (err, datas) {
						res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
					})
				}
			})
		} else {
			var sql = "SELECT * from product_like LIMIT ?,?"
			var sqlparams = [(page - 1) * pagesize, pagesize]
			connection.query(sql, sqlparams, function(err, data) {
				if (err) {
					res.json({code: "1", msg: err, data: ""})
				} else {
					var sqls = "select count(*) as totallength from product_like"
					connection.query(sqls, function (err, datas) {
						res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
					})
				}
			})
		}
	}
})

module.exports = router;