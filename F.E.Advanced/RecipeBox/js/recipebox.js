//https://code.lengstorf.com/get-form-values-as-json/

var button = document.getElementById('create');
var close = document.getElementById('close');
var modal = document.getElementById('modal');


button.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'block';
});

close.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'none';
});



//----------------------------------------------------------------\\

const form = document.getElementById('input-form');

// Get the form data with our (yet to be defined) function.
//const data = getFormDataAsJSON(form);

const handleFormSubmit = event => {
  
	event.preventDefault();
	
	// TODO: Call our function to get the form data.
	const data = formToJSON(form.elements);
	
	// Demo only: print the form data onscreen as a formatted JSON object.
	console.log(data);
	
  };

form.addEventListener('submit', handleFormSubmit);

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  
	data[element.name] = element.value;
	return data;
  
  }, {});

