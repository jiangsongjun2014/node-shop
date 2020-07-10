/*
	接口：createproduct
	方法：post
	参数：product_name，price，stock，imgpath，product_like_id，product_status
*/ 

var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"

router.post("/createproduct", function (req, res) {
	var product_name = req.body.product_name
	var price = req.body.price
	var stock = req.body.stock
	var imgpath = req.body.imgpath
	var product_like_id = req.body.product_like_id
	var product_status = req.body.product_status
	var token = req.headers.authorization
	var date = new Date()
	// 验证token
	jwt.verify(token, jwtkey, function (err, data) {
		if(err) {
			res.json({ code: "2", msg: "登录信息失效，请登录", data: ""})
		} else {
			// 验证
			if (product_name == undefined ){
				res.json({code: "1", msg: "商品名称为空", data: ""})
			} else if(price == undefined ) {
				res.json({code: "1", msg: "商品单价为空", data: ""})
			} else if(stock == undefined ) {
				res.json({code: "1", msg: "商品库存为空", data: ""})
			} else if(imgpath == undefined ) {
				res.json({code: "1", msg: "商品图片为空", data: ""})
			} else if(product_like_id == undefined ) {
				res.json({code: "1", msg: "商品类别为空", data: ""})
			} else if(product_status == undefined ) {
				res.json({code: "1", msg: "商品状态为空", data: ""})
			} else {
				var sql = "insert into product (product_name, price, stock, imgpath, product_like_id, product_status,create_time) values (?, ?, ?, ?, ?, ?, ?)"
				var sqlparams = [product_name, price, stock, imgpath, product_like_id, product_status, date]
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