//https://code.lengstorf.com/get-form-values-as-json/

const create = document.getElementById('create');
const close = document.getElementById('close');
const modal = document.getElementById('modal');


create.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'block';
});

close.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'none';
});



//----------------------------------------------------------------\\

var savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

const form = document.getElementById('input-form');

const isValidElement = element => {
	return element.name && element.value;
  };

const handleFormSubmit = event => {
  
	event.preventDefault();
	const data = formToJSON(form.elements);
	
	// Demo only: print the form data onscreen as a formatted JSON object.
	console.log(data);
	//console.log(form.elements.namedItem("ingredients").name);

	savedRecipes.push(data);
	localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
	form.reset();

	console.log(localStorage.savedRecipes);
	
  };

form.addEventListener('submit', handleFormSubmit);

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
					//The same as Array.prototype.reduce.call()
					//to be able to use array method on an array-like object

	if (isValidElement(element)) {
		data[element.name] = element.value;
	}
	return data;
  
  }, {});

