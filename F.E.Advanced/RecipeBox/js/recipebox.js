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

//-------------Recipes----------------------------\\
var savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

const recipeList = document.getElementById('list');

const updateRecipeNames = () => {
	if(savedRecipes) {
		let names = '';
		for (let i = 0; i < savedRecipes.length; i++) {
			names += `<li onclick="showRecipe(this)">${savedRecipes[i]["recipe-name"]}</li>`;		
		}
	
		recipeList.innerHTML = `<ul>${names}</ul>`;
	}
}

const recipesInTheList = [].slice.call(document.querySelectorAll('#list li'), 0);

const showRecipe = (rec) => {
	const recipeNumber = recipesInTheList.indexOf(rec)

	const recipeName = document.getElementById('name');
	const recipeIngredients = document.getElementById('ingredients');
	const recipeDirections = document.getElementById('directions');


	recipeName.innerHTML = `<h2>${savedRecipes[recipeNumber]["recipe-name"]}</h2>`;
	recipeIngredients.innerHTML = `<p>${savedRecipes[recipeNumber]["ingredients"]}</p>`;
	recipeDirections.innerHTML = `<p>${savedRecipes[recipeNumber]["directions"]}</p>`;
	
	// for (let r = 0; r < 10; r++) {
	// 	if(savedRecipes[r]["recipe-name"] == e.innerText) {
	// 		recipeName.innerHTML = `<h2>${savedRecipes[r]["recipe-name"]}</h2>`;
	// 		recipeIngredients.innerHTML = `<p>${savedRecipes[r]["ingredients"]}</p>`;
	// 		recipeDirections.innerHTML = `<p>${savedRecipes[r]["directions"]}</p>`;

	// 		break;
	// 	}
	// }
}

updateRecipeNames();


//----------------------------------------------------------------\\
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
	updateRecipeNames();
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

