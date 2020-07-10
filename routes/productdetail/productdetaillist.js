var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")

/*
	接口：productdetaillist
	方法：post
	参数：page， pagesize, keyword， product_id
*/ 

router.post("/productdetaillist", function(req, res) {
	var page = parseInt(req.body.page)
	var pagesize = parseInt(req.body.pagesize)
	var keyword = req.body.keyword
	var product_id  = req.body.product_id 
	if (page < 1 && page ==undefined) {
		res.json({code: "1", msg: "当前页信息错误", data: ""})
	} else if(pagesize == undefined) {
		res.json({code: "1", msg: "每页数量为空", data: ""})
	} else {
		if (keyword) {
			var sql = "SELECT * from product_detail WHERE product_id = ? AND product_detail_name = ?"
			var sqlparams = [product_id, keyword]
			connection.query(sql, sqlparams, function(err, data) {
				if (err) {
					res.json({code: "1", msg: err, data: ""})
				} else {
					var sqls = "select count(*) as totallength from product_detail WHERE product_id = ? AND product_detail_name = ?"
					var sqlsparams = [product_id, keyword]
					connection.query(sqls,sqlsparams, function (err, datas) {
						res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
					})
				}
			})
		} else {
			var sql = "SELECT * from product_detail WHERE product_id = ? LIMIT ?,?"
			var sqlparams = [product_id, (page - 1) * pagesize, pagesize]
			connection.query(sql, sqlparams, function(err, data) {
				if (err) {
					res.json({code: "1", msg: err, data: ""})
				} else {
					var sqls = "select count(*) as totallength from product_detail"
					connection.query(sqls, function (err, datas) {
						res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
					})
				}
			})
		}
	}
})

module.exports = router;