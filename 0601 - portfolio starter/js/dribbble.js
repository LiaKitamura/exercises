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
	// START HERE...
	
    // how many shots we're displaying on the page

    // Loop over the results, generating the HTML for each <li> item
    
    // Insert the generated HTML to the DOM
    
});