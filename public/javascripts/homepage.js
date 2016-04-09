
$(document).ready(function(){
	$('#buttonConfirmNumFriends').on('click', generateFriendsFields);
	$('#linkContainer').on('click', 'button', createMeeting);
	$('#linkContainer').on('click', 'a', addMeeting);
});


// VARIABLES
var friendCount = 0;
var friendNames;

////////////// FUNCTIONS

function generateFriendsFields() {
	var count = $('#container #friendsBlockContainer #friendsBlock #inputNumFriends').val();
	count = parseInt(count, 10);
	if (count > 0) {
		for (i = 0; i < count; i++) {
			if (i == 0) {
				var friendField = '<input class="inputFriendName" type="text" placeholder="enter YOUR name here">';
			}
			else {
				var friendField = '<input class="inputFriendName" type="text" placeholder="enter friends name here">';
			}
			$('#container #friendsBlockContainer #friendsBlock #enterFriendsBlock').append(friendField);
		}
		var button = '<button id="buttonGenerateLink">Generate Link</button>';
		$('#container #linkContainer').append(button);
	}
	else {
		// do nothing 
	}
}

function createMeeting() {
	// check if all inputs filled
	// save in database
	// generate and show link
	var allInputsFilled = checkAllInputsFilled();
	if (allInputsFilled) {
		generateLink();
	}
	else {
		window.alert('Please fill all friend fields');
	}
}

function checkAllInputsFilled() {
	console.log('do we even hit this check inputs filled block');
	var emptyCount = 0;
	friendNames = [];
	$('#container #friendsBlockContainer #friendsBlock #enterFriendsBlock input').each(function(index, item){
		console.log('inner');
		// console.log('index');
		if($(this).val() === ''){
			emptyCount++;
			console.log('empty');
		}
		else {
			friendNames.push($(this).val());
			friendCount++;
		}
	});
	if (emptyCount > 0) {
		friendCount = 0;	// reset friend count
		return false;
	}
	else {
		return true;
	}
}

function generateLink(event) {
	console.log("generateLink");
	var link = '<a id="meetingLink" href="#">konradjuszkiewicz.com/letsmeetup/7vx89</a>';
	$('#container #linkContainer').append(link);
}

function printEntry(event) {
	console.log("here we go");
	event.preventDefault();
	// console.log("could this be the problem");
	// $.getJSON('/users/getmeeting/56f9458edfc6651d7976fedb', function(data){
	$.getJSON('/users/getmeeting/56f962adeb0e75dcc2623ff1', function(data){
		console.log(data.name);
		// $.each(data, function(){
		//console.log(this.responsesRequested);
		// })
		console.log("DO WE HIT THIS?");
	});
}

function addMeeting(event) {
	console.log("lets try to add an entry");
	var friendsArray = [];
	for (i = 0; i < friendCount; i++) {
		var friendObject = {
			name: friendsArray[i]
			//"daysArray": ''
		};
		friendsArray.push(friendObject);
	}

	// var newMeeting = {
	// 	"dayMeetingCreated" : 3,
	// 	"meetingStartTime" : 0, 
	// 	"meetingEndTime" : 0, 
	// 	"responsesRequested" : friendCount,
	// 	"responsesReceived" : 0, 
	// 	"friends" : JSON.stringify(friendsArray)
	// };
	var newMeeting = {
		dayMeetingCreated: 3,
		meetingStartTime: 0,
		meetingEndTime: 0,
		responsesRequested: friendCount,
		responsesReceived: 0
	}
	newMeeting = JSON.stringify(newMeeting);

	console.log('we convered successfully');

	$.ajax({
		type: 'POST',
		data: newMeeting,
		url: '/users/addmeeting',
		dataType: 'JSON'
	}).done(function(response){
		console.log('we have finished adding');
	});

}