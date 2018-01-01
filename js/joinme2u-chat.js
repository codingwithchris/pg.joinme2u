
/**
 * Define Global Variables
 */
var chatCount = $('#toby-milo-chat li').length;
var chatWindow = $('#toby-milo-chat');
var scrollWrapper = $('#chat-scroll-wrapper');
var shortReplyDelayMultiplier = 1100;
var longReplyDelayMultiplier = 350;
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
 * Define the structure for our message component
 */
var messageComponent = function ( user, message ){

	var _component = [

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

	// Build Our message by joining our message array containing our data
	return component = _component.join("");

}


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
 * Get the number of words in a message
 */

var numberOfWordsInMessage = function( message ){

	// Split the sentence into its parts
	wordCount = message.split(" ");

	// Get number of words
	wordCount = wordCount.length;

	return wordCount;

}


/**
 * Create a response delay based on the length of the message to be delivered
 */
var autoResponseDelay = function( user, count, message ){

	// Initialize our dely as 0 in case we don't have one
	var delay = 0;

	// If it's Milo's message, we will delay
	if( user.name == 'Milo' ){

		// If it's his first message, we need a custom delay that lasts longer than normal
		if( count == 2 ) {

			var delay = numberOfWordsInMessage( message ) * shortReplyDelayMultiplier + 2000;

		} else {

			// Handle short and long replies differently because og how the delay exponentially increases
			// as the sentence gets longer

			if( numberOfWordsInMessage( message ) <= 7 ){

				// Otherwise we will use a standard delay.
				var delay = numberOfWordsInMessage( message ) * shortReplyDelayMultiplier;	


			} else {

				// Otherwise we will use a standard delay.
				var delay = numberOfWordsInMessage( message ) * longReplyDelayMultiplier;	

			}

			

		}

	}

	return delay;

}


/**
 * We need to scroll to the latest delivered message.
 */
var scrollToLatestMessage = function(){

	// Get the scroll height and scroll ot the bottom
	scrollWrapper[0].scrollTop = scrollWrapper[0].scrollHeight;

}


/**
 * Add a message to our chat bubble
 */
var appendToChat = function( message, user, count ){


	// If it's milo's message
	if( user == milo ){

		// we need to use a delay in out reply to make it beleiveable
		setTimeout(function(){

			// Append our message
			chatWindow.append(

				// Creat a new message component
				messageComponent( user, message )

			);

			// scroll to the new message
			scrollToLatestMessage();

		}, autoResponseDelay( user, count, message )  );

	} else {

		// Add the new message to the chat window
		chatWindow.append(

			// Create our message component
			messageComponent( user, message )

		);

		// Scroll to the new message
		scrollToLatestMessage();


	 }

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
 * Fetch data that will help us get Milo's Auto Response
 */

 var fetchMiloResponse = function(){

	// Redefine our chat count after each message
	// sent by Toby.
	var chatCount = $('#toby-milo-chat li').length;


	// After Toby send his message, the count will
	// always be odd. In order to get the correct response,
	// we need to add one to the count
	var newChatCount = chatCount + 1;
	

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

	appendToChat( responses[responseKey], milo, responseNumber );

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
	appendToChat( tobyMessage.val(), toby, 0);

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

			// Only fire submit if we have a message

			if( tobyMessage.val() != '' ){

				// Submit the message
	       		submitTobyMessage();

	       		// Reset the message box
	       		tobyMessage.val('');

	       	}

	    }

	});


	// When the submit button is clicked,
	// we want to submit our message
	tobyMessageSubmit.click( function() {

		// Only fire submit if we have a message

		if( tobyMessage.val() != '' ){

			// Submit the message
			submitTobyMessage();

			// reset the message box
			tobyMessage.val('');

		}

	});

}


// Fire the Watch event on page load
$(document).ready( function(){

	watchForMessageSubmit();


})