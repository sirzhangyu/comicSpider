var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

var args = system.args,
	url = args[1];

// page.open(url, function(status){
// 	console.log('URL: ' + url);
// 	console.log("STATUS: " + status);
// 	if (status == 'success') {
// 		var chapter_links = page.evaluate(get_chapter_links);
// 		chapter_links.forEach(function(chapter_link){
// 			fs.write('chapter_links', chapter_links.join('\n'), 'w');
// 		});
// 		phantom.exit();
// 	}
// });

// function get_chapter_links(){
// 	var links = [],
// 	    sections = document.getElementsByClassName('chapter-list cf mt10');
// 	for (var i=0; i<sections.length; i++){
// 		chapter_links = sections[i].getElementsByTagName('a');
// 		for (var j=0; j<chapter_links.length; j++){
// 			links.push(chapter_links[j].href);
// 		}
// 	}
// 	return links;
// }

page.open(url, function(status){
	console.log("DONLOADING CHAPTER: " + url);
	console.log("STATUS: " + status);
	if (status == 'success'){
		var page_attr = page.evaluate(get_page_attr);
		var page_count = page_attr[0],
			chapter_name = page_attr[1];
		console.log("page count: " + page_count);
		console.log("Chapter: " + chapter_name);

		for (var i=0; i<page_count; i++) {
			var img_src = page.evaluate(get_img_src);
			console.log("IMG SRC: " + img_src);
			fs.write(chapter_name, img_src+'\n', 'a');
			page.evaluate(next_page);
		}

	}
	phantom.exit();
});

function get_page_attr(){
    var page_count = 0;
	var page_num = document.getElementById('page').parentElement.textContent;
	console.log(page_num);
	page_count = page_num.match(/(\d+)\/(\d+)/)[2]
	var img = document.getElementById('mangaFile');
    return [page_count, img.alt];
}

function next_page(){
	document.getElementById('next').click();
}

function get_img_src(){
	var img = document.getElementById('mangaFile');
	return img.src;
}
