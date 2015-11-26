/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

/* Minimal configuration to switch LED on or off over the browser */
/* Variables to change */
var port = 3000;
var ledPin = 3;

var mraa = require( 'mraa' ); //require mraa Library
var myOnboardLed = new mraa.Gpio( ledPin ); //LED hooked up to digital pin ledPin
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
myOnboardLed.write(1);  //Standard Status on = 1, turn on

var http = require('http'); // https://www.npmjs.com/package/http
var url = require('url'); // https://www.npmjs.com/package/path

http.createServer(processRequest).listen(port); // Create Server,
// see http://www.sitepoint.com/creating-a-http-server-in-node-js/
console.log("Server running at port " + port);

function processRequest(request, response) {
    "use strict";
    var pathName = url.parse(request.url).pathname;
     if (pathName == "/isOn") {
        sendResponse ('switchOff', response);
        myOnboardLed.write(1);
     } else if (pathName == "/isOff") {
        sendResponse ('switchOn', response);
        myOnboardLed.write(0);

     } else if (pathName == "/") {
         sendResponse ('switchOff', response);
         myOnboardLed.write(1);
     }
}
function sendResponse(status, response) {
     response.writeHead(200, { 'Content-Type': 'text/html' });
     response.write('<!DOCTYPE html><html lang="de"><head>');
     response.write('<meta charset="utf-8">'); 
     response.write('<meta http-equiv="refresh" content="30" />');
     response.write('<title>LED switch</title>');
     response.write('</head>');
     
     response.write('<body><h1>LED is now ');
     if (status === 'switchOff') {
        response.write('on');
     } else {
        response.write('off');
     }    
     response.write('</h1>');
     if (status === 'switchOff') {
        response.write('<a href="/isOff">Switch off</a>');
     } else {
        response.write('<a href="/isOn">Switch on</a>');
     }
     response.write('</body></html>');
     response.end();
}