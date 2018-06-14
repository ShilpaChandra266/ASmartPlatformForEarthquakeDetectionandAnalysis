var express = require('express');  
const path = require('path');
const index = require('./routes/index');
var mysql = require('mysql');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var JSAlert = require("js-alert");
var http=require('http')
var multer=require('multer');
var fileupload=require('express-fileupload');
var datetime=require('node-datetime');
var app = new express();
var session = require('express-session');

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));
var port = 3000;  
app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
}); 
app.use(flash());
app.use(function(req, res, next) {
    res.locals.messages = req.flash();
    next();
}); 

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('views')); //making public directory as static diectory  
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "earthquake"
});
app.use(flash());
app.use(fileupload());
app.use(function(req, res, next) {
    res.locals.messages = req.flash();
    next();
}); 
app.use("/",index);
app.get('/prediction',function(req,res){
  res.render('prediction',{messages:req.flash('info')});
})
app.get('/subscribe',function(req,res){
	res.render('subscribe', { messages: req.flash('info') });
})
 
app.get('/unsubscribe',function(req,res){
	res.render('unsubscribe',{ messages: req.flash('info') });
}) 
app.post('/subscribe', function (req, res) {
 
  console.log(req);
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
   app.post('/unsubscribe', function (req, res) {
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
app.post('/prediction',function (req, res) {
  if(req.files){
    console.log(__dirname);
    var sample=req.files.input_file;
    sample.mv(__dirname+"/files/"+req.files.input_file.name,function(err){
      if(err)
        console.log(err);
      else
        console.log("Successfully");
    })
    var options={
    host:'localhost',
    path:'/predictinput/'+req.files.input_file.name+'/' +req.body.model,
    port:5000,
    method:'GET'
  };
    var result1;
  var req=http.request(options, (result)=>{
    console.log(options);
    var r="";
    result.on('data',(chunk)=>{
        r=chunk;
        console.log("result: "+r);
      });
    result.on('error',(e)=>{
        conosle.log(e);
      });
    result.on('end',()=>{
      console.log("end: "+r);
       result1="The given data has "+r;
       console.log("end s"+result1);
       res.render('prediction',{messages:result1});
      });
    }).end();
    //req.flash('info', 'shilpa');
    }
  else{
  var temp=datetime.create(req.body.starttime);
  var st=temp.epoch();
  temp=datetime.create(req.body.endtime);
  var et=temp.epoch();
  var options={
    host:'localhost',
    path:'/predict/'+req.body.model+'/'+st+'/'+et+'/'+req.body.ppick+'/'+req.body.spick+'/'+req.body.npts,
    port:5000,
    method:'GET'
  };
  var result1;
  var req=http.request(options, (result)=>{
    console.log(options);
    var r="";
    result.on('data',(chunk)=>{
        r=chunk;
        console.log("result: "+r);
      });
    result.on('error',(e)=>{
        conosle.log(e);
      });
    result.on('end',()=>{
      console.log("end: "+r);
       result1="The given data has "+r;
       console.log("end s"+result1);
       res.render('prediction',{messages:result1});
      });
    }).end();
      }
 });



