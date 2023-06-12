const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'YOUR_API_KEY';

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;
  const headers = { 'x-api-key': API_KEY };

  return axios.get(url, { headers })
    .then(response => response.data)
    .catch(error => {
      displayErrorMessage();
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search`;
  const headers = { 'x-api-key': API_KEY };
  const params = { breed_ids: breedId };

  return axios.get(url, { headers, params })
    .then(response => response.data)
    .catch(error => {
      displayErrorMessage();
      throw error;
    });
}

function displayErrorMessage() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'block';
}

