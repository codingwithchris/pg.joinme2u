
/**
 * Define Global Variables
 */
var height = 0;
var chatCount = $('#toby-milo-chat li').length;
var chatWindow = $('#toby-milo-chat');
var scrollWrapper = $('#chat-scroll-wrapper');
var replyDelayMultiplier = 1.5;
var tobyMessageSubmit = $('#send-milo-message');
var tobyMessage = $('#toby-message');
var enterKeycode = '13';



/**
 * Define Global Objects
 */



/**
 * Our function to define our users
 */
var User = function( name, image, link, side ){

	this.name = name;
    this.image = image;
    this.link = link;
    this.side = side;

}



/**
 * Define Message Defaults
 */

var message = function(  ){
	
	
};



/**
 * Define new users
 */


// Define Milo
var milo = new User(
	'Milo',
	'https://placehold.it/100x100',
	'/users/milo/profile.html',
	'left'
);

// Define Toby
var toby = new User(
	'Toby',
	'https://placehold.it/100x100',
	'/users/toby/profile.html',
	'right',
);




/**
 * Define Global Helper functions
 */



/**
 * Check to see if a number is even or odd
 */
var isEven = function( value ){

	if (value % 2 == 0){

		return true

	}else{

		return false;

	}


};


/**
 * Add a message to our chat bubble
 */
var appendToChat = function( message, user ){

	var _message = [

		'<li class="'+ user.side +'">',
			'<img src="'+ user.image +'" alt="" class="profile-photo-sm pull-'+user.side+'">',

			'<div class="chat-item">',
				'<div class="chat-item-header">',
					'<h5>' + user.name + '</h5>',
				'</div>',

				'<p>' + message + '</p>',

			'</div>',

		'</li>',

	];

	// Build Our message
	newMessage = _message.join("");

	// Add the new message tot he chat window
	chatWindow.append( newMessage );

	// Scroll to the newset message so we see everything
	scrollToLatestMessage();

};




/********************************
 * MILO'S AUTO RESPONSES
 * 
 * Eveerything in this section deals
 * directly with handling Milo's
 * responses to Toby's Messages.
 *******************************/


/**
 * Define a pool of milo's responses
 *
 * Each response should be tied to an even number for ease
 * of use since we will be using the chat count to auto-pick
 * the appropriate response;
 */
var  responses = {

	r2: 'What am I supposed to be doing?',
	r4: 'Are you doing anything?',
	r6: 'Me too.',
	r8: 'Yup.',
	r10: 'I know.',
	r12: 'I remember.',
	r14: 'I lied. I\'m actualy not doing anything right now. I tried but I can\'t. I tried something else, but I can\'t do that either.',
	r16: 'Can I come over? We can work on my essay. I\'ll pay you.',
	r18: 'Can I come over?',
	r20: 'Can I please come over?',
	r22: 'Yes.',
	r24: 'I think my room is going to eat me.',
	r26: 'So?',
	r28: 'I have a car service, Toby.'

};


/**
 * Create a response delay based on the lengt of the message to be delivered
 */
var autoResponseDelay = function( functionName ){





}


/**
 * We need to scroll to the latest delivered message.
 */
var scrollToLatestMessage = function(){


	scrollWrapper.scrollTop = scrollWrapper.scrollHeight;

}


/**
 * Fetch data that will help us get Milo's Auto Response
 */

 var fetchMiloResponse = function(){

	// Redefine our chat count after each message
	// sent by Toby.
	var chatCount = $('#toby-milo-chat li').length;
	var newChatCount = chatCount + 1;


	// After Toby send his message, the count will
	// always be odd. In order to get the correct response,
	// we need to add one to the count
	

	// After the appropriate wait, we submit
	// the appropriate response
	submitAutoResponseToToby(
		newChatCount
	) 	


 };


/**
 * Automatically send a message
 *
 * From: Milo
 * To: Toby
 */
var submitAutoResponseToToby = function( responseNumber ){

	// Build our response key dynamically
	responseKey = 'r' + responseNumber;

	appendToChat( responses[responseKey], milo );

}







/*********************************************************** 
	Everyting Below this point deals directly with
	Submitting Toby's Message. The process of submitting
	his message kicks off all other functionality above
	this line, including appending the message to chat
	and getting the appropriate auto-response from Milo.
*************************************************************/




/**
 * Call our submit function when we are attempting to 
 * submit a message
 */
var submitTobyMessage = function(){

	// Get the current value of Toby's Message
	var tobyMessage = $('#toby-message');

	// Empty out the chat input for Toby
	tobyMessage.empty();

	// Officially add the message to chat
	appendToChat( tobyMessage.val(), toby);

	// Now we see what Milo will respond with.
	fetchMiloResponse();

}


/**
 * Watch specified elements for a submit or
 * enter kepress
 */
var watchForMessageSubmit = function(){


	/**
	 * Submit Toby's message if the enter
	 * button is pressed within the watched element.
	 * 
	 */

	tobyMessage.keypress( function( e ) {


		var keycode = (e.keyCode ? e.keyCode : e.which);

		if (keycode == enterKeycode ) {

			// Submit the message
	       submitTobyMessage();

	    }

		

	});


	// When the submit button is clicked,
	// we want to submit our message
	tobyMessageSubmit.click( function() {

		// Submit the message
		submitTobyMessage();

	});


}


// Fire the Watch event on page load
$(document).ready( function(){

	watchForMessageSubmit();


})