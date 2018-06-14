var express = require('express');
var router = express.Router();




router.get('/', function (req, res) {
	  res.render('index');
	})

	

router.get('/datadownload',function(req,res){
		res.render('datadownload');
	}) 	
router.get('/interactivemap',function(req,res){
		res.render('interactivemap');
	})	
router.get('/noiseremoval',function(req,res){
		res.render('noiseremoval');
	}) 	
router.get('/testfile',function(req,res){
		res.render('testfile');
	}) 	



module.exports = router;