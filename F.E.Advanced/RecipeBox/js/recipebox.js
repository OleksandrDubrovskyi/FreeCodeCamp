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