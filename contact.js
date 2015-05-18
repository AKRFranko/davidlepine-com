window.DL = (function() {
	var DL = {
		name: "David Lepine",
		version: "0.0.1",
		email: '100605091002000307090103-1041306090002151113ln.egvapzidojm%ck',
		_sortEmail: function() {
			var chars = DL.email.slice(-17);
			var nums = DL.email.slice(0, -17);
			var order = nums.replace(/(\d\d|\-\d)/g, " $1").split(' ').slice(1).map(Number);
			return order.map(DL._createEmailFilter(chars)).join('');
		},
		_createEmailFilter: function(chars) {
			return function(i) {
				return i < 0 ? '@' : chars.charAt(i);
			}
		}
	}

	var errorField = function(field) {
		field.style.borderColor = "#900";
	}
	var validField = function(field) {
		field.style.borderColor = "#999";
	}
	var readContactForm = function() {
		var fields = {
				name: document.querySelector('#nom'),
				phone: document.querySelector('#phone'),
				text: document.querySelector('#message'),
				email: document.querySelector('#courriel')
			},
			data = {
				_subject: "Contact via davidlepine.com."
			},
			hasErrors = false;
		message = [];
		if (fields.name.value && fields.name.value.length) {
			message.push("Nom: " + fields.name.value);
			data.name = fields.name.value;
			validField(fields.name);
		} else {
			hasErrors = true;
			errorField(fields.name);
		}
		if (fields.phone.value && fields.phone.value.length) {
			var numbers = fields.phone.value.replace(/\D/g, '');
			if (numbers.length < 10 || numbers.length > 11) {
				hasErrors = true;
				errorField(fields.phone);
			} else {
				message.push("Tel: " + fields.phone.value);
				validField(fields.phone);
			}
		}
		if (fields.email.value && fields.email.value.length) {
			data._replyto = data.email = fields.email.value;
			validField(fields.email);
		} else {
			hasErrors = true;
			errorField(fields.email);
		}
		if (fields.text.value && fields.text.value.length) {
			message.push("Message:\n\n");
			message.push(fields.text.value);
			data.message = message.join("\n");
			validField(fields.text);
		} else {
			hasErrors = true;
			errorField(fields.email);
		}
		return hasErrors ? null : data;
	}

	var submitContactForm = function(url) {
		var form = document.getElementById('contact'),
			request = new XMLHttpRequest(),
			data = readContactForm();

		if (data) {
			form.disabled = true;
			request.open('POST', url, true);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			request.setRequestHeader('Accept', 'application/json');
			request.send(JSON.stringify(data));
		}
		clearTimeout(submitContactForm.__TO);
		submitContactForm.__TO = setTimeout(function() {
			form.disabled = false;
			form.reset();
		}, 2000);
	}

	var createContactForm = function() {
		var form = document.getElementById('contact');
		if (form) {
			form.addEventListener('submit', function(event) {
				event.preventDefault();
				submitContactForm("http://formspree.io/" + DL._sortEmail());
				return false;
			}, false);
		}

	}
	$(createContactForm);


	return DL;
})();