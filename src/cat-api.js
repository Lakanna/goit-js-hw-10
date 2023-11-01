import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_uaHRHkKxQxGNH22vTJoGn29EtTqsN8pXxAlcznQ4tg2Wn80dVev2JEuNFxUDcsbx";


function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds").then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
   } )
}


function fetchCatByBreed(breedId) {
   return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
  .then(response => {
    return response.data; 
  })
};

export { fetchBreeds, fetchCatByBreed}