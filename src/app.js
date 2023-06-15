import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catImageEl = document.querySelector('.cat-image');
const catNameEl = document.querySelector('.cat-name');
const catDetailsEl = document.querySelector('.cat-details');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

function renderBreedsSelect(breeds) {
  breeds.map(breed => {
    const optionEl = document.createElement('option');
    optionEl.value = breed.id;
    optionEl.textContent = breed.name;
    breedSelect.appendChild(optionEl);
  });
}

function renderCatInfo(cat) {
  catImageEl.src = cat.url;
  catImageEl.alt = 'Cat Image';
  catNameEl.textContent = cat.breeds[0].name;
  catDetailsEl.textContent = `${cat.breeds[0].description} Temperament: ${cat.breeds[0].temperament}`;
}

function showLoader() {
  loaderEl.style.display = 'block';
}

function hideLoader() {
  loaderEl.style.display = 'none';
}

function showError() {
  errorEl.style.display = 'block';
}

function hideError() {
  errorEl.style.display = 'none';
}

function handleBreedSelectChange(event) {
  const breedId = event.target.value;

  if (breedId) {
    showLoader();
    hideError();

    fetchCatByBreed(breedId)
      .then(renderCatInfo)
      .catch(showError)
      .finally(hideLoader);
  }
}

breedSelect.addEventListener('change', handleBreedSelectChange);

fetchBreeds()
  .then(renderBreedsSelect)
  .catch(showError)
  .finally(hideLoader);
