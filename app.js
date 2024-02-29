var express = require('express'),
    http = require('http'), 
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
	
var https = require('https');
var fs = require('fs');
const PORT = process.env.PORT || 5000 
	
var logFmt = require("logfmt");

app.use(express.static(__dirname + '/client')); 
//app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());  

app.set('port', process.env.PORT || 8080);

/*Allow CORS*/
app.use(function(req, res, next) {
	 
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	  
	next();
});



app.all('/proxy',  function(req, res, next) { 
    
    var url = req.header('SalesforceProxy-Endpoint');  
    request({ url: url, method: req.method, json: req.body, 
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);    
    
});
 
app.get('/' ,  function(req,res,next) {
    res.sendFile('views/index.html', { root: __dirname });
} ); 

app.get('/index*' ,  function(req,res,next) {
    res.sendFile('views/index.html', { root: __dirname });
} );  
 
app.get('/oauthcallback.html' ,  function(req,res,next) {
    res.sendFile('views/oauthcallback.html', { root: __dirname });
} ); 

app.get('/main*' ,   function(req,res,next) {
    res.sendFile('views/lo.html', { root: __dirname });
} );

app.get('/logout', function(req,res,next){
    res.sendFile('views/logout.html', { root: __dirname });
});

app.get("/config", function(req,res){

    var config = {
        clientId: process.env.SALESFORCE_CLIENT_ID,
        clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
        callback: process.env.SALESFORCE_REDIRECT_URL,
        loginUrl: process.env.SALESFORCE_LOGIN_URL,
        appName: process.env.SALESFORCE_APPNAME,
        componentName: process.env.SALESFORCE_COMPONENT
    }

    res.setHeader('Content-Type', 'application/json');
    res.send( config );
});

app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});

//	var options = {
//      key: fs.readFileSync('./key.pem', 'utf8'),
//      cert: fs.readFileSync('./server.crt', 'utf8')
//   };
   
//	https.createServer(options, app).listen(PORT);
//	console.log("Server listening for HTTPS connections on port ", 8081);