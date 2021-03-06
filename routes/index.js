
const uploads = require("./uploads.js")
const logins = require("./login/logins.js")
const registers = require("./login/registers.js")
// 类别
const createprocategory = require("./category/createprocategory.js")
const procategorylist = require("./category/procategorylist.js")
const updateprocategory = require("./category/updateprocategory.js")
const deleteprocategory = require("./category/deleteprocategory.js")
const updateprocategorystatus = require("./category/updateprocategorystatus.js")
// 商品
const createproduct = require("./product/createproduct.js")
const productlist = require("./product/productlist.js")
const deleteproduct = require("./product/deleteproduct.js")
const updateproduct = require("./product/updateproduct.js")
// 详情
const createproductdetail = require("./productdetail/createproductdetail.js")
const productdetaillist = require("./productdetail/productdetaillist.js")
const deleteproductdetail = require("./productdetail/deleteproductdetail.js")
const updateproductdetail = require("./productdetail/updateproductdetail.js")
// 用户信息
const userlist = require("./admin/userlist.js")
const updateadmin = require("./admin/updateadmin.js")
const admininfo = require("./admin/admininfo.js")
// 地址信息
const createaddress = require("./address/createaddress.js")
const addresslist = require("./address/addresslist.js")
const updateaddress = require("./address/updateaddress.js")
const updatestatusaddress = require("./address/updatestatusaddress.js")
const deleteaddress = require("./address/deleteaddress.js") 
// 购物车
const createcart = require("./cart/createcart.js")
const cartlist = require("./cart/cartlist.js")
const addcartcount = require("./cart/addcartcount.js")
const reducecartcount = require("./cart/reducecartcount.js")
const updatecartstatus = require("./cart/updatecartstatus.js")
const updateallcartstatus = require("./cart/updateallcartstatus.js")
const deletecart = require("./cart/deletecart.js")
// 订单
const createorder = require("./order/createorder.js")
const orderlist = require("./order/orderlist.js")
const updateorderstatus = require("./order/updateorderstatus.js")
const createcartorder = require("./order/createcartorder.js")
const orderalllist = require("./order/orderalllist.js")

module.exports = app => {
	app.use("/api", logins)
	app.use("/api", registers)
	app.use("/api", uploads)
	app.use("/api", createprocategory)
	app.use("/api", procategorylist)
	app.use("/api", updateprocategory)
	app.use("/api", deleteprocategory)
	app.use("/api", updateprocategorystatus)
	app.use("/api", createproduct)
	app.use("/api", productlist)
	app.use("/api", deleteproduct)
	app.use("/api", updateproduct)
	app.use("/api", createproductdetail)
	app.use("/api", productdetaillist)
	app.use("/api", deleteproductdetail)
	app.use("/api", updateproductdetail)
	app.use("/api", userlist)
	app.use("/api", updateadmin)
	app.use("/api", admininfo)
	app.use("/api", createaddress)
	app.use("/api", addresslist)
	app.use("/api", updateaddress)
	app.use("/api", updatestatusaddress)
	app.use("/api", deleteaddress)
	app.use("/api", createcart)
	app.use("/api", cartlist)
	app.use("/api", addcartcount)
	app.use("/api", reducecartcount)
	app.use("/api", updatecartstatus)
	app.use("/api", updateallcartstatus)
	app.use("/api", deletecart)
	app.use("/api", createorder)
	app.use("/api", orderlist)
	app.use("/api", updateorderstatus)
	app.use("/api", createcartorder)
	app.use("/api", orderalllist)
}
