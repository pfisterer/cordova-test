var app = {

	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
	}
};

function onSuccess(contacts) {
	var contactDiv = $('#addressbookcontent');

	var div = '<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-mini="true">';

	for ( var i = 0; i < contacts.length; i++) {
		div += '<div data-role="collapsible">' + '<h3>'
				+ contacts[i].name.formatted + '</h3>' + '<p>' + '<a href="http://'
				+ contacts[i].urls[0].value + '">' + contacts[i].urls[0].value
				+ '</a>' + '</p>' + '</div>';
	}

	div += '</div>';

	contactDiv.empty();
	contactDiv.append(div);

}

function onError(contactError) {
	$('#addressbookcontent').text('Error: ' + contactError);
}

function loadAddressBook() {
	var options = new ContactFindOptions();
	options.multiple = true;
	var fields = [ "displayName", "name", "urls", "emails" ];
	navigator.contacts.find(fields, onSuccess, onError, options);
}
