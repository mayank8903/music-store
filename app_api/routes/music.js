var express = require("express");
var router = express.Router();


var ctrlMusic = require("../controllers/music");
var ctrlCustomer = require("../controllers/customer");

//music
router.get("/music", ctrlMusic.getMusic);
router.post("/music", ctrlMusic.createMusic);
router.get("/music/:musicid", ctrlMusic.getSingleMusic);
router.put("/music/:musicid", ctrlMusic.updateMusic);
router.delete("/music/:musicid", ctrlMusic.deleteMusic);

//customer
router.get("/customer", ctrlCustomer.getCustomer);
router.post("/customer", ctrlCustomer.createCustomer);
router.get("/customer/:custid", ctrlCustomer.getSingleCustomer);
router.put("/customer/:custid", ctrlCustomer.updateCustomer);
router.delete("/customer/:custid", ctrlCustomer.deleteCustomer);


module.exports = router;