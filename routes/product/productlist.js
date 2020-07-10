var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")

/*
	接口：productlist
	方法：post
	参数：product_like_id, page， pagesize, keyword
*/ 
router.post("/productlist", function(req, res) {
	var page = parseInt(req.body.page)
	var pagesize = parseInt(req.body.pagesize)
	var keyword = req.body.keyword
	var product_like_id = req.body.product_like_id
	if (page < 1 && page ==undefined) {
		res.json({code: "1", msg: "当前页信息错误", data: ""})
	} else if(pagesize == undefined) {
		res.json({code: "1", msg: "每页数量为空", data: ""})
	} else {
		if (keyword) {
			var sql = "SELECT * from product LEFT JOIN product_like on product.product_like_id = product_like.product_like_id WHERE product_name = ?"
			var sqlparams = [keyword]
			connection.query(sql, sqlparams, function(err, data) {
				if (err) {
					res.json({code: "1", msg: err, data: ""})
				} else {
					var sqls = "select count(*) as totallength from product WHERE product_name = ?"
					var sqlsparams = [keyword]
					connection.query(sqls,sqlsparams, function (err, datas) {
						res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
					})
				}
			})
		} else {
			if (product_like_id) {
				var sql = "SELECT *  from product LEFT JOIN product_like on product.product_like_id = product_like.product_like_id WHERE product.product_like_id = ? LIMIT ?,?"
				var sqlparams = [product_like_id, (page - 1) * pagesize, pagesize]
				connection.query(sql, sqlparams, function(err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						var sqls = "select count(*) as totallength from product WHERE product.product_like_id = ?"
						var sqlsparams = [product_like_id]
						connection.query(sqls,sqlsparams, function (err, datas) {
							res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
						})
					}
				})
			} else {
				var sql = "SELECT *  from product LEFT JOIN product_like on product.product_like_id = product_like.product_like_id LIMIT ?,?"
				var sqlparams = [(page - 1) * pagesize, pagesize]
				connection.query(sql, sqlparams, function(err, data) {
					if (err) {
						res.json({code: "1", msg: err, data: ""})
					} else {
						var sqls = "select count(*) as totallength from product"
						connection.query(sqls, function (err, datas) {
							res.json({code: "0", msg: "", data: data, totallength: datas[0].totallength})
						})
					}
				})
			}
		}
	}
})

module.exports = router;