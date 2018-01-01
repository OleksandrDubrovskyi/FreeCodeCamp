//https://stackoverflow.com/questions/37664094/passing-search-input-to-javascript-without-input-button
const searchBar = document.getElementById('search');

function searchWiki(query) {
  const limitOfEntries = 20;

  fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&format=json&search=${query}&limit=${limitOfEntries}`)
    .then((resp) => resp.json())
    .then(function(data) {

      let outputString = "";
      for(var i = 0; i < limitOfEntries.length; i++) {
        
        outputString += `<a target="blank" href="${data[3][i]}">${data[1][i]}</a>
                         <p class="wikiresult">${data[2][i]}</p>`;
      }

      document.getElementById("results").innerHTML = outputString;
      searchBar.reset();
    })
    .catch(function(error) {
      console.log(error);
    });
}

searchBar.addEventListener('submit', function(e) {
    e.preventDefault();
    searchWiki(encodeURIComponent(this.query.value));
})

document.getElementById("randomArticle").onclick = function() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
}

/*
  +1 more way to try

  <form onsubmit="searchWiki(document.getElementById('query').value)">
    <input type="search" placeholder="Search Wikipedia" id="query" name="query" />
  </form>
*/
