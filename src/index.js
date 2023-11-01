
import axios from "axios";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

const refs = {
    select: document.querySelector(".breed-select"),
};


console.dir(refs.select);

axios.defaults.headers.common["x-api-key"] = "live_uaHRHkKxQxGNH22vTJoGn29EtTqsN8pXxAlcznQ4tg2Wn80dVev2JEuNFxUDcsbx";

// new SlimSelect({
//   select: '#selectElement'
// })


fetchBreeds().then((data) => createCatList(data));
   
refs.select.addEventListener('change', onSelect);

function onSelect(evt) {
    const selectedBreed = evt.currentTarget.value;
    console.log(selectedBreed);
   console.log(fetchCatByBreed1(selectedBreed));  
//    .then(()) 
}

function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds").then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
   } )
}

function createCatList(arr) {
   refs.select.innerHTML = arr.map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`
    }).join('');
}

function fetchCatByBreed1(breedId) { 
return fetch(`https://api.thecatapi.com/v1/images/search?api_key=live_uaHRHkKxQxGNH22vTJoGn29EtTqsN8pXxAlcznQ4tg2Wn80dVev2JEuNFxUDcsbx&breed_ids=${breedId}`)
    .then((resp) =>{
        if (!resp.ok) {
          throw new Error(response.status);  
        }
        return resp.json();
    })
};
   
console.log(fetchCatByBreed1('amau'));


function fetchCatByBreed(breedId) {
   return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
  .then(response => {
    return response.data; 
  })
};


console.log(fetchCatByBreed('amau'));


