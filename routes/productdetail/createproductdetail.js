/*
	接口：createproductdetail
	方法：post
	参数：product_detail_name，product_detail，product_detail_status，product_detail_imgpath，product_id
*/ 

var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

router.post("/createproductdetail", function (req, res) {
	var product_detail_name = req.body.product_detail_name
	var product_detail = req.body.product_detail
	var product_detail_status = req.body.product_detail_status
	var product_detail_imgpath = req.body.product_detail_imgpath
	var product_id = req.body.product_id
	var token = req.headers.authorization
	var date = new Date()
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证
			if (product_id == undefined ){
				res.json({code: "1", msg: "详情商品为空", data: ""})
			} 
			// else if(product_detail_name == undefined ||  product_detail == undefined || product_detail_imgpath == undefined) {
			// 	res.json({code: "1", msg: "详情名称，内容，图片至少有一个不为空", data: ""})
			// } 
			else if(product_detail_status == undefined ) {
				res.json({code: "1", msg: "详情状态为空", data: ""})
			} else {
				var sql = "insert into product_detail (product_detail_name, product_detail, product_detail_status, product_detail_imgpath, product_id,create_time) values (?, ?, ?,?, ?, ?)"
				var sqlparams = [product_detail_name, product_detail, product_detail_status, product_detail_imgpath, product_id, date]
				connection.query(sql, sqlparams, function(err, data) {
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