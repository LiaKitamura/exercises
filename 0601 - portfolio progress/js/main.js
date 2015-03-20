// Load recent projects from Dribble
$(document).ready(function(){
//	alert('jQUERY!!');
	var duser = 'jimniels',
		html = "";
	
	$.getJSON("js/shots.json", function(data){
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
			html += '<a class="lightboxTrigger" href="' + data.shots[i].imageUrl + '">';
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


	// Contact form
	$contact = $('.contact');
	$contactBtn = $('.contact-btn');

	$contact.find('span.close').click(function(){
		$contact.addClass('animated slideOutDown').removeClass('slideInUp');
		$(this).addClass('animated fadeOut').removeClass('fadeIn');
	});
	$contactBtn.click(function(){
		$contact.addClass('animated slideInUp').removeClass('slideOutDown');
		$contact.find('span.close').addClass('animated fadeIn').removeClass('fadeOut');
	});

// not selectors
// .not('#some-div, .anotherElement')

	// var setupLightbox = function(){
		$('ul.shots').on('click', 'a.lightboxTrigger', function(e) { 
			// Code that makes the lightbox appear 
			e.preventDefault();
			// console.log('item clicked');
			var image_href = $(this).attr("href");
			$lightbox = $('#lightbox');
			if ( $lightbox.length > 0) { // #lightbox exists
		
				//insert img tag with clicked link's href as src value
				$lightbox.find('#content').html('<img src="' + image_href + '" />');
			   	
				//show lightbox window - you can use a transition here if you want, i.e. .show('fast')
				$lightbox.show();
			} else { 
				//#lightbox does not exist 
				//create HTML markup for lightbox window 
				var lightbox = '<div id="lightbox">' + '<p>Click to close</p>' + '<div id="content">' + 
				//insert clicked link's href into img src 
				'<img src="' + image_href +'" />' + '</div>' + '</div>'; 
				//insert lightbox HTML into page 
				$lightbox = $(lightbox);
				$('body').append(lightbox); 
			}
		});

		$lightbox.hide();

		// $('#lightbox').on('click', function() { $('#lightbox').hide(); });
	// }
	
});