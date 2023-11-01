

import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';



const refs = {
    select: document.querySelector(".breed-select"),
    catCard: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    noteError: document.querySelector(".error"),
};

// new SlimSelect({
//   select: '#selectElement'
// })

console.dir(refs.loader);

refs.loader.hidden = false;
refs.select.hidden = true;

fetchBreeds().then((data) => {
    createCatList(data)
    refs.loader.hidden = true;
    refs.select.hidden = false;
})
    .catch((error) => { Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!') });
   
refs.select.addEventListener('change', onSelect);

function onSelect(evt) {

    refs.loader.hidden = false;
    refs.catCard.hidden = true;
    const selectedBreed = evt.currentTarget.value;
    
    fetchCatByBreed(selectedBreed)
        .then(createCard)
        .catch((error) => { Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!') });
};

function createCard(data) { 
    const { url, breeds } = data[0];
    const { description, temperament, name } = breeds[0];

    createCardMarcup(url, description, temperament, name);

    refs.loader.hidden = true;
    refs.catCard.hidden = false;
};

function createCardMarcup(url, description, temperament, name) {
    return refs.catCard.innerHTML = `
    <div class="card-img">
       <img src="${url}" alt="${name}" class="cat-img">
    </div>
    <div class="card-text">
      <h1>${name}</h1>
      <h3>${description}</h3>
      <h3>Temperament: ${temperament}</h3>
    </div>`
}



function createCatList(arr) {
   refs.select.innerHTML = arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`
    }).join('');
}









