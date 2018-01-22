let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value=='' || attempt.value=='') {
    	setHiddenFields();
    } 
    if (!validateInput(input.value)){
    	return false;
    }
    attempt.value = ""  + (parseInt(attempt.value)+ 1);
    if (getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay()
    	
    }
    else {
		if (parseInt(attempt.value) >=10) {
			setMessage("You Lose! :(");
				showAnswer(false);
    			showReplay()
    	}
    	else {
    		setMessage("Incorrect, try again.");
    	}

    }
    
}

//implement new functions here
function setHiddenFields() {
	answer.value = Math.floor(Math.random()*9999).toString();
	while (answer.value.length < 4) {
		answer.value = "0" + answer.value;

	}
	attempt.value = "0";
}
function setMessage(msgText) {
	let message = document.getElementById("message");
	message.innerHTML =msgText;
}
function validateInput(param) {
	if (param.length==4) {
		return true;
	}
	else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	results = document.getElementById('results');
	let resStr = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	let correct = 0;
	for (var i=0;i<4;i++) {
		//console.log(answer);
		if (input.charAt(i)==answer.value.charAt(i)) {
			resStr += '<span class="glyphicon glyphicon-ok"></span>';
			correct++;
		}
		else if( answer.value.indexOf(input.charAt(i))>=0) {
			resStr += '<span class="glyphicon glyphicon-transfer"></span>';
		}
		else {
			resStr += '<span class="glyphicon glyphicon-remove"></span>';
		}

	}
	resStr += "</div>";
	results.innerHTML = resStr;
	if (correct==4) return true;
	return false;
}
function showAnswer(success) {
	let code = document.getElementById('code');
	code.innerHTML = answer.value;
	if (success) {
		code.className =  code.classList.className + " success";
	}
	else  {
		code.className =  code.classList.className + " failure";
	}

}
function showReplay() {
	document.getElementById("guessing-div").style.display="none";
	document.getElementById("replay-div").style.display="block";
}