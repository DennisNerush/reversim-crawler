var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();
const cheerio = require("cheerio");
var _ = require("underscore");
var writer = require( './hist-write');
var blackList = [
  '',
  '!', '.', 'a', '&', '-', 'i', 
  'in', 'at', 'as', 'to', 'by', 'it', 'my', 'so', 'of', 'is', 'do', 
  'and', 'the', 'for', 'you', 'why', 'our', 'how', 'was',
  'with', 'your', 'more', 'into', 'what', 'when', 'from', 'that', ];


request('https://summit2017.reversim.com/proposals', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedCompanyResults = [];
    var parsedTitlesResults = [];

    $('#all-proposals section article h6, #all-proposals section article div > p').each(function (i, element) {
      var text = $(this).text();
      let titles;
      //titles = text.split(' ').split(',').split('-');
      titles = text.toLowerCase().replace('.', '').replace('"', ' ').replace('(',' ').replace(')',' ').replace(',',' ').replace('-',' ').split(' ');
      if (i == 1) console.log(titles);
      
      _.each(titles, function (item, index) {
        if (!_.contains(blackList, item)){
            parsedTitlesResults.push(item);
        }
      });
    });

    $('#all-proposals section small').each(function (i, element) {
      var text = $(this).text();
      let companyName;

      if (text.includes("@")) {
        companyName = text.split('@')[1];
      } else if (text.includes(" at ")) {
        companyName = text.split(' at ')[1];
      }

      if (companyName) {
        parsedCompanyResults.push(companyName.trim());
      }

    });
    writer.write('companies.json', parsedCompanyResults);
    writer.write('content.json', parsedTitlesResults);
  }
});

exports = module.exports = app;
