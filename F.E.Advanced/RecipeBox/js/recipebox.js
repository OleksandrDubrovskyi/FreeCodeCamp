//https://code.lengstorf.com/get-form-values-as-json/

const create = document.getElementById('create');
const deleteRec = document.getElementById('delete');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

const recipeName = document.getElementById('name');
const recipeIngredients = document.getElementById('ingredients');
const recipeDirections = document.getElementById('directions');


create.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'block';
});

deleteRec.addEventListener('click', function (evt) {
	evt.preventDefault();
	deleteRecipe();
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
			names += `<li onclick="showRecipe(this)" class="stored">${savedRecipes[i]["recipe-name"]}</li>`;		
		}
	
		recipeList.innerHTML = `<ul>${names}</ul>`;
	}
}

updateRecipeNames();

var recipesInTheList = [].slice.call(document.querySelectorAll('.stored'), 0);
var recipeNumber;

const showRecipe = (rec) => {
	recipeNumber = recipesInTheList.indexOf(rec);

	recipeName.innerHTML = `<h2>${savedRecipes[recipeNumber]["recipe-name"]}</h2>`;
	recipeIngredients.innerHTML = `<p>${savedRecipes[recipeNumber]["ingredients"]}</p>`;
	recipeDirections.innerHTML = `<p>${savedRecipes[recipeNumber]["directions"]}</p>`;
	
}

const deleteRecipe = () => {
	savedRecipes.splice(recipeNumber, 1);
	resetLocalStorage();
	recipeName.innerHTML = ``;
	recipeIngredients.innerHTML = ``;
	recipeDirections.innerHTML = ``;
}


//----------------------------------------------------------------\\
const form = document.getElementById('input-form');

const isValidElement = element => {
	return element.name && element.value;
  };

const handleFormSubmit = event => {
  
	event.preventDefault();
	const data = formToJSON(form.elements);

	savedRecipes.push(data);
	resetLocalStorage();
	form.reset();	
  };

form.addEventListener('submit', handleFormSubmit);

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

	if (isValidElement(element)) {
		data[element.name] = element.value;
	}
	return data;
  
  }, {});


function resetLocalStorage() {
	localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
	updateRecipeNames();
	recipesInTheList = [].slice.call(document.querySelectorAll('.stored'), 0);
}
