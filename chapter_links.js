var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var args = system.args,
	url = args[1];

page.onConsoleMessage = function(msg) {
	console.log(msg);
}

page.open(url, function(status){
	console.log('URL: ' + url);
	console.log("STATUS: " + status);
	if (status == 'success') {
		var chapter_links = page.evaluate(get_chapter_links);
        fs.write('chapter_links', chapter_links.join('\n'), 'w');
		phantom.exit();
	}
});

function get_chapter_links(){
	var links = [],
	    sections = document.getElementsByClassName('chapter-list cf mt10');
	for (var i=0; i<sections.length; i++){
		chapter_links = sections[i].getElementsByTagName('a');
		for (var j=0; j<chapter_links.length; j++){
			links.push(chapter_links[j].href);
		}
	}
	return links;
}
