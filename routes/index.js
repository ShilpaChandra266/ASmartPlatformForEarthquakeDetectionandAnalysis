var express = require('express');
var router = express.Router();




router.get('/', function (req, res) {
	  res.render('index');
	})

	
router.get('/subscribe',function(req,res){
		res.render('subscribe' );
	})

router.get('/unsubscribe',function(req,res){
		res.render('unsubscribe');
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


router.post('/subscribe', function (req, res) {
	  console.log(req.body);
	  var data = {
	    name: req.body.name,
	    email: req.body.email,
	    phone: req.body.phone,
	    zip: req.body.zip
	   }
	   con.query('SELECT * from subscription where email=?',data.email ,function(err,resp){
	    if(err) throw err;
	    else{
	        if(resp.length>0){
	          req.flash('info', 'Email you have entered is already exists in subscription user list.')
	          res.render('subscribe',{messages:req.flash('info')});
	        }
	        else{
	           con.query('INSERT INTO subscription SET ?', data, function (err, resp) {
	           if (err) throw err;
	             req.flash('info', 'You Have Successfully Subcribed to the Alerting System !!!')
	            res.render('subscribe',{messages:req.flash('info')});

	             });
	        }
	    }
	   });
	   
	 });

router.post('/unsubscribe', function (req, res) {
	  console.log(req.body);
	  var data = {
	    name: req.body.name,
	    email: req.body.email
	   }
	   con.query('SELECT * from subscription where email=?',data.email,function(err,resp){
	    if(err) throw err;
	    if(resp.length>0){
	        con.query('DELETE FROM subscription where email=?',data.email , function (err, resp) {
	        if (err) throw err;
	       req.flash('info', 'You Have Successfully UnSubcribed from the Alerting System !!!')
	        res.render('unsubscribe',{messages:req.flash('info')});

	   });
	    }
	    else{
	          req.flash('info', 'Email you have entered does not exists in subscription user list.')
	          res.render('unsubscribe',{messages:req.flash('info')});
	    }

	   });
	   
	 });

module.exports = router;