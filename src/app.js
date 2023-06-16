import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector(`#breedSelect`);
const divImageEl = document.querySelector(`.cat-image`);
const divDescEl = document.querySelector(`.cat-desc`);
const loaderEl = document.querySelector(`.loader`);

breedSelect.addEventListener(`change`, onChangeSelect);

const fetchAndRenderBreeds = () => {

  console.log('Fetching breeds...');
  
  loaderEl.classList.remove('is-hidden');
  fetchBreeds()
    .then(breeds => renderBreedsSelect(breeds))
    .catch(error =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      )
    )
    .finally(() => {
      loaderEl.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
    });
};

fetchAndRenderBreeds();

function onChangeSelect(e) {
  loaderEl.classList.remove('is-hidden');
  divDescEl.innerHTML = '';
  divImageEl.innerHTML = '';
  let breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(breed => renderBreedDesc(breed))
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => loaderEl.classList.add('is-hidden'));
}

const renderBreedsSelect = breeds => {
  console.log('Rendering breed description...');

  const markup = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  breedSelect.innerHTML = markup;

  new SlimSelect({
    select: '#breedSelect',
  });
};


const renderBreedDesc = breed => {
  const markupImg = `<img class="cat-picture" src="${breed[0].url}" alt="${breed[0].id}">`;
  const markupDesc = `
    <h2 class="cat-info-desc-title">${breed[0].breeds[0].name}</h2>
    <p class="cat-info-desc-desc">${breed[0].breeds[0].description}</p>
    <p class="cat-info-desc-temperament"><b>Temperament:</b> ${breed[0].breeds[0].temperament}</p>
  `;
  divImageEl.innerHTML = markupImg;
  divDescEl.innerHTML = markupDesc;
};
