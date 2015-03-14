/*
 * LOAD DRIBBBLE SHOTS
 *
 * This script uses Dribbble's API
 * to fetch the latest shots
 * from a speficied Dribbble user
 */

// What user are we using?
var dribbbleUsername = 'jimniels';

// Variable to hold the HTML we'll generate
var html = '';

// Load the shots via Dribbble's API
$.getJSON("http://api.dribbble.com/players/"+ dribbbleUsername +"/shots?callback=?", function(data) {

    // how many shots we're displaying on the page
    var numberOfShots = 10;

    // Loop over the results, generating the HTML for each <li> item
    for (i=0; i<numberOfShots; i++) {
        html += '<li>';
        html += '<a href="'+ data.shots[i].url +'">';
        html += '<img src="' + data.shots[i].image_url + '" alt="'+ data.shots[i].title +'" />';
        html += '</a>';
        html += '</li>';
    }

    // Insert the generated HTML to the DOM
    $('.shots').html(html);

    // Set the scroll position of the carousel
    //var _scrollContainer = $('.shots-container');
    //var scrollWidth = _scrollContainer.width();
    //_scrollContainer.scrollLeft(scrollWidth);
});