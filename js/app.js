const myForm = document.getElementById('generate-names');

myForm.addEventListener('submit', loadNames);

function loadNames(e) {
	e.preventDefault();

	//get values
	const country = document.getElementById('country').value,
		sex = document.getElementById('genre').value,
		quantity = document.getElementById('quantity').value;

	//build the url
	let nameUrl = `http://uinames.com/api/?`;

	//append country
	if (country !== '') {
		nameUrl += `region=${country}&`;
	}

	//append sex
	if (sex !== '') {
		nameUrl += `gender=${sex}&`;
	}

	//append quantity
	if (quantity !== '') {
		nameUrl += `amount=${quantity}&`;
	}

	//Ajax call

	//create object XMLHttpRequest
	const xhr = new XMLHttpRequest();
	//open connection
	xhr.open('GET', nameUrl, true);
	//onload
	xhr.onload = function () {
		if (this.status === 200) {
			let generatedNames = JSON.parse(this.responseText);

			let myUiElement = `<h1>Generated Names</h1>`;

			myUiElement += `<ul class="list">`;
			generatedNames.forEach((userData) => {
				myUiElement += `<li>${userData.name}</li>`;
			});
			myUiElement += `</ul>`;

			document.querySelector('#result').innerHTML = myUiElement;
		}
	};
	//send request
	xhr.send();
}
