// require core module `file system`
var fs = require( 'fs' );
 
// exports 1 method for other modules or files to use
module.exports = {
  write : function( filename, data ){
    var hist = {};
    data.map(function (a) { if (a in hist) hist[a]++; else hist[a] = 1; });

    var array = [];
    for (a in hist) {
      array.push([a, hist[a]])
    }
    array.sort(function (a, b) { return a[1] - b[1] });
    array.reverse();

    for (var a = 0, b, txt = ''; b = array[a]; ++a) {
      txt += b[0] + '=' + b[1] + '\n';
    }

    //write to file inside an output folder
    var dir = './output';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir + '/' + filename, txt);

  }
};