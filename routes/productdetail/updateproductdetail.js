var express = require('express');
var router = express.Router();
var connection = require("../../sql/mysql.js")
// 引入jwt 
var jwt = require('jsonwebtoken');
// 定义钥匙
var jwtkey = "shopping"
/*
	接口：updateproductdetail
	方法：post
	参数：product_detail_id，product_detail_name，product_detail，product_detail_status，product_detail_imgpath，product_id
*/ 

router.post("/updateproductdetail", function (req, res) {
	var product_detail_id = req.body.product_detail_id
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
			// 验证数据是否存在
			if (product_detail_id == undefined ){
				res.json({code: "1", msg: "商品详情id为空", data: ""})
			} else if (product_id == undefined ){
				res.json({code: "1", msg: "商品为空", data: ""})
			}  else if(product_detail_status == undefined ) {
				res.json({code: "1", msg: "商品详情状态为空", data: ""})
			} else {
				// 编辑详情
				var sql = "UPDATE product_detail SET product_detail_name=?, product_detail=?, product_detail_status=?, product_detail_imgpath=?, product_id=?, update_time=? WHERE product_detail_id = ?"
				var sqlparams = [product_detail_name, product_detail, product_detail_status, product_detail_imgpath, product_id, date, product_detail_id]
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