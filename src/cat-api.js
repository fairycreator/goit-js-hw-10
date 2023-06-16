const BASIC_URL = 'https://api.thecatapi.com/v1/breeds';
const uniqueKey = 'live_FxaIVKAMfRXqyk9ztFjPD04tU5KpKnI33GgpcHylTuk5cBOmIRU1sGQPy7NdrAja';

const fetchBreeds = () => {
  console.log('Fetching breeds from the API...');

    const params = new URLSearchParams({
    api_key: uniqueKey,
  });
  return fetch(`${BASIC_URL}?${params}`).then(response => {
    console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};

const fetchCatByBreed = breedId => {
  console.log('Fetching cat by breed...');

  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${uniqueKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Add this line to log the response data
      return data;
    });
};

export { fetchBreeds, fetchCatByBreed };
