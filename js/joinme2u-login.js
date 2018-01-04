// Defaults
var submit = document.getElementById('submit-login');
var formName = '';
var formPass = '';


// Allowed Usernames and passwords
var allowedNames 		= ['toby', 'milo', 'joe', 'heidi'];

var allowedPasswords 	= ['toby', 'milo', 'joe', 'heidi'];


var loginSuccess = function( formName ){
	window.location.replace( 'user/' + formName + '/profile.html' );
};


var loginFail = function(){
	window.location.replace( 'index.html' );
};


/**
 * Check and see if the entered name is an allowe name
 */
var checkName = function( name ){

	if( allowedNames.indexOf(name) > -1 ){

		console.log( document.getElementById('user-name').value );

	} else {

		return false;

	}

};


/**
 * Check and see if the password entered name is a valid password
 */

var checkPassword = function( password ){

	if( allowedPasswords.indexOf(password) > -1 ){

		console.log( document.getElementById('user-password').value );

	} else {

		return false;

	}

};



var submitEvents = function(formName, formPass){

	// If the username and password both pass our check
	if( checkName( formName ) != false &&  checkPassword( formPass ) != false ){

		// We have a successful login
		loginSuccess( formName );


	} else {

		loginFail();

	}


};

submit.onclick = function(){

	var formName = document.getElementById('user-name').value;
	var formPass = document.getElementById('user-password').value;

	submitEvents( formName, formPass );


};
