var express = require('express');
var router = express.Router();
var connection = require("../sql/mysql.js")

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
var upload = multer({ storage: storage })


router.post('/uploads',upload.single('avatar'), function (req, res) {
	var path = req.file.destination+ "/" + req.file.filename
	var date = new Date()
	var sql = "insert into img (img_type, img_path, create_time) values (?, ?, ?)"
	var sqlparama = [req.file.mimetype, path, date]
	connection.query(sql, sqlparama, function(err, data) {
		if (err) {
			res.json({ code: "1", data: "",msg: err})
		} else {
			res.json({
				code: "0",
				msg: "",
				data: req.file,
				path: path,
				img_id: data.insertId
			})
		}
	})
	
})


module.exports = router;
