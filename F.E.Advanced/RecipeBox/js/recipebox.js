//https://code.lengstorf.com/get-form-values-as-json/


// Global DOM constants
const create = document.getElementById('create');
const deleteRec = document.getElementById('delete');
const close = document.getElementById('close');
const modal = document.getElementById('modal');
const update = document.getElementById('update');
const updateRecipeButton = document.getElementById('update-recipe');

const form = document.getElementById('input-form');
const recipeList = document.getElementById('list');
const recipeName = document.getElementById('name');
const recipeIngredients = document.getElementById('ingredients');
const recipeDirections = document.getElementById('directions');

// DOM elements event listeners
create.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'block';
});

deleteRec.addEventListener('click', function (evt) {
	evt.preventDefault();
	deleteRecipe();
});

update.addEventListener('click', function (evt) {
	evt.preventDefault();
	updateRecipe();
});

close.addEventListener('click', function (evt) {
	evt.preventDefault();
	modal.style.display = 'none';
});

//-------------Recipes----------------------------\\
let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

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

let recipesInTheList = [].slice.call(document.querySelectorAll('.stored'), 0);
let recipeNumber;

const showRecipe = (rec) => {
	recipeNumber = recipesInTheList.indexOf(rec);

	recipeName.innerHTML = `<h2>${savedRecipes[recipeNumber]["recipe-name"]}</h2>`;
	recipeIngredients.innerHTML = `<p>${savedRecipes[recipeNumber]["ingredients"]}</p>`;
	recipeDirections.innerHTML = `<p>${savedRecipes[recipeNumber]["directions"]}</p>`;
	update.style.display = 'block';
}

const deleteRecipe = () => {
	savedRecipes.splice(recipeNumber, 1);
	resetLocalStorage();
	recipeName.innerHTML = ``;
	recipeIngredients.innerHTML = ``;
	recipeDirections.innerHTML = ``;
}

const updateRecipe = () => {
	modal.style.display = 'block';
	document.getElementById("update-recipe").style.display = 'block';
	document.getElementById("submit-recipe").style.display = 'none';

	document.querySelector('textarea[name="recipe-name"]').innerHTML = savedRecipes[recipeNumber]["recipe-name"];
	document.querySelector('textarea[name="ingredients"]').innerHTML = savedRecipes[recipeNumber]["ingredients"];
	document.querySelector('textarea[name="directions"]').innerHTML = savedRecipes[recipeNumber]["directions"];
	

}

const resetLocalStorage = () => {
	localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
	updateRecipeNames();
	recipesInTheList = [].slice.call(document.querySelectorAll('.stored'), 0);
}

//---------------------Modal widget------------------------\\
const handleFormSubmit = event => {
  
	event.preventDefault();
	const data = formToJSON(form.elements);

	savedRecipes.push(data);
	resetLocalStorage();
	form.reset();
	modal.style.display = 'none';	
  };

const handleUpdateRecipe =  event => {
  
	event.preventDefault();
	const data = formToJSON(form.elements);

	savedRecipes[recipeNumber] = data;
	resetLocalStorage();

	recipeName.innerHTML = `<h2>${data["recipe-name"]}</h2>`;
	recipeIngredients.innerHTML = `<p>${data["ingredients"]}</p>`;
	recipeDirections.innerHTML = `<p>${data["directions"]}</p>`;

	form.reset();
	modal.style.display = 'none';	
  };

form.addEventListener('submit', handleFormSubmit);
updateRecipeButton.addEventListener('click', handleUpdateRecipe);

const isValidElement = element => {
	return element.name && element.value;
  };

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

	if (isValidElement(element)) {
		data[element.name] = element.value;
	}
	return data;
  
  }, {});


