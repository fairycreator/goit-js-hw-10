import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const divImageEl = document.querySelector('.cat-image');
const divDescEl = document.querySelector('.cat-details');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

breedSelect.addEventListener('change', onChangeSelect);

const fetchAndRenderBreeds = () => {
  loaderEl.classList.remove('is-hidden');
  errorEl.classList.add('is-hidden');
  
  fetchBreeds()
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error => {
      showError();
      console.error(error);
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
    });
};

fetchAndRenderBreeds();

function onChangeSelect(e) {
  loaderEl.classList.remove('is-hidden');
  errorEl.classList.add('is-hidden');
  const breedId = e.target.value;

  fetchCatByBreed(breedId)
    .then(cat => renderCatInfo(cat))
    .catch(error => {
      showError();
      console.error(error);
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
      divImageEl.classList.remove('is-hidden');
      divDescEl.classList.remove('is-hidden');
    });
}

function renderBreedsSelect(breeds) {
  breeds.forEach(breed => {
    const optionEl = document.createElement('option');
    optionEl.value = breed.id;
    optionEl.textContent = breed.name;
    breedSelect.appendChild(optionEl);
  });

  // Initialize SlimSelect on the breed select element
  new SlimSelect({
    select: breedSelect
  });
}

function renderCatInfo(cat) {
  divImageEl.innerHTML = `<img src="${cat.url}" alt="Cat Image">`;
  divDescEl.querySelector('.cat-desc-title').textContent = cat.breeds[0].name;
  divDescEl.querySelector('.cat-desc-desc').textContent = cat.breeds[0].description;
  divDescEl.querySelector('.cat-desc-temperament').textContent = `Temperament: ${cat.breeds[0].temperament}`;
}

function showError() {
  errorEl.classList.remove('is-hidden');
}
