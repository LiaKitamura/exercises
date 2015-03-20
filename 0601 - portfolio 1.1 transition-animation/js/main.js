// Load recent projects from Dribble
$(document).ready(function(){
	var $avatar = $('.avatar').addClass(' animated fadeInDown');
	
	var duser = 'jimniels',
		html = "";
	$.getJSON("js/shots.json", function(data){

		// Do something with the result
		
		var numberOfShots = data.shots.length,
			shotWidth = 400,
			shotHeight = 300,
			shotMargin = 10,
			shotPadding = 10,
			shotBorder = 1,
			shotUnit = 'px',
			width = numberOfShots * (shotWidth + (shotMargin * 2)+ (shotPadding * 2) + (shotBorder * 2)) + shotUnit,
			minHeight = shotHeight + shotUnit;
		
		
		// Loop over the results and generate our html markup for each <li>
		for(var i=0; i<numberOfShots; i++){
			html += '<li>';
			html += '<a href="' + data.shots[i].imageUrl + '">';
			html += '<img src="' + data.shots[i].thumb + '" alt="' + data.shots[i].title + '" >';
			html += '</a>';
			html += '</li>';
		}
		
		// Insert our <li>s into the list
		var $shots = $('.shots').css({width:width, minHeight: minHeight}).html(html).find('li').css({
				width: (shotWidth + shotUnit),
				height: (shotHeight + shotUnit),
				margin: (shotMargin + shotUnit),
				padding: (shotPadding + shotUnit)
			});
		
	});
});

//	$.getJSON("http://api.dribbble.com/players/" + duser + "/shots?callback=?", function(data){