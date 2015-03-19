// Load recent projects from Dribble
$(document).ready(function(){
//	alert('jQUERY!!');
	var duser = 'jimniels',
		html = "";
	
	$.getJSON("/js/shots.json", function(data){
		// Do something with the result
		
		var numberOfShots = data.shots.length;
		
			var shotWidth = 400;
			var shotHeight = 300;
			var shotMargin = 10;
			var shotPadding = 10;
			var shotBorder = 1;
			var shotUnit = 'px';
			var width = numberOfShots * (shotWidth + (shotMargin * 2)+ (shotPadding * 2) + (shotBorder * 2)) + shotUnit;
			var minHeight = shotHeight + shotUnit;
		
		// Loop over the results and generate our html markup for each <li>
		for(var i=0; i<numberOfShots; i++){
			html += '<li>';
			html += '<a href="' + data.shots[i].imageUrl + '">';
			html += '<img src="' + data.shots[i].thumb + '" alt="' + data.shots[i].title + '" >';
			html += '</a>';
			html += '</li>';
		}
		
		// Insert our <li>s into the list
		$('.shots').css("width", width).html(html);
	});
	
	var $avatar = $('.avatar');
	
//	setInterval(function(){
//		$avatar.addClass("fadeOut");
//	},3000);
	
});