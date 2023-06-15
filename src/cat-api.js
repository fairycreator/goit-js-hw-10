const BASIC_URL = 'https://api.thecatapi.com/v1/breeds/';
const IMAGE_URL = 'https://api.thecatapi.com/v1/images';
const uniqueKey = 'live_FxaIVKAMfRXqyk9ztFjPD04tU5KpKnI33GgpcHylTuk5cBOmIRU1sGQPy7NdrAja';

const fetchBreeds = () => {

  console.log('Fetching breeds from the API...');

  return fetch(`${BASIC_URL}?api_key=${uniqueKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};

const fetchCatByBreed = breedId => {

  console.log('Fetching cat by breed...');

  return fetch(`${IMAGE_URL}/${breedId}?api_key=${uniqueKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};

export { fetchBreeds, fetchCatByBreed };
