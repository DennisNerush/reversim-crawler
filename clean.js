var fuzz = require('fuzzball');

//var contains_dupes = ['fuzzy wuzzy', 'fuzzy wuzz', 'not a dupe'];

var contains_dupes = ['Outbrain', 'WeWork', 'Wix', 'Kenshoo', 'Taboola', 'Wix.com' ]

console.log('\n');
console.log('***  ' + contains_dupes + '  ***');
console.log('\n');

var results_cutoff = fuzz.dedupe(contains_dupes, options) 
console.log(results_cutoff);
console.log('\n');
// [item, index/key of item in original list] 
//[ [ 'fuzzy wuzzy', 0 ],
//  [ 'not a dupe', 2 ] ]
 
options.keepmap = true;
var results_keep = fuzz.dedupe(contains_dupes, options)
console.log(results_keep); 
// [item, index/key of item in original list, [output of fuzz.extract for item]] 
//[ [ 'fuzzy wuzzy', 0, [ [Object], [Object] ] ],
 // [ 'not a dupe', 2, [ [Object] ] ] ]
