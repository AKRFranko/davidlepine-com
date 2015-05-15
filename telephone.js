!(function() {
	var replacePhoneNumber = function() {
		var teltags = document.querySelectorAll('.teltag'),
			number = ['819', '238', '0262'].join('.');
		for (var i = 0, l = teltags.length; i < l; i++) {
			var tag = teltags[i];

			tag.innerText = number;
		}

	}
	window.onload = replacePhoneNumber;

})()