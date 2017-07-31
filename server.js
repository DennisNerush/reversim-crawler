var express = require('express');
var fs = require('fs');
var request = require('request');
var app     = express();
const cheerio = require("cheerio");

request('https://summit2017.reversim.com/proposals', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];

    $('#all-proposals section small').each(function(i, element){
      
      var text = $(this).text();
        let companyName;

      if (text.includes("@")){
        companyName = text.split('@')[1];
      }
else if(text.includes(" at ")){
        companyName = text.split(' at ')[1];
      }


      if(companyName){
        parsedResults.push(companyName.trim());
      }
     
    });
    // Log our finished parse results in the terminal
    var hist = {};
parsedResults.map( function (a) { if (a in hist) hist[a] ++; else hist[a] = 1; } );


var array=[];
for(a in hist){
 array.push([a,hist[a]])
}
array.sort(function(a,b){return a[1] - b[1]});
array.reverse();

for(var a=0,b,txt='';b=array[a];++a){
 txt+=b[0]+'='+b[1]+'\n';
}


fs.writeFile('outpit.json', txt);
  }
});

exports = module.exports = app;
