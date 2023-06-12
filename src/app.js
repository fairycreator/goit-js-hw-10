import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breed-select');
const catInfo = document.getElementById('cat-info');
const catImage = document.querySelector('.cat-image');
const catName = document.querySelector('.cat-name');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');
const breedLoader = document.querySelector('.breed-loader');
const errorMessage = document.getElementById('error-message');

let selectedBreedId = '';

function populateBreeds() {
  breedLoader.style.display = 'block';

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedLoader.style.display = 'none';
      breedSelect.disabled = false;
    })
    .catch(error => console.error(error));
}

function fetchAndDisplayCatInfo(breedId) {
  catInfo.style.display = 'none';
  errorMessage.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(cats => {
      const cat = cats[0];
      catImage.style.backgroundImage = `url(${cat.url})`;
      catName.textContent = cat.breeds[0].name;
      catDescription.textContent = cat.breeds[0].description;
      catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      catInfo.style.display = 'block';
    })
    .catch(error => console.error(error));
}

breedSelect.addEventListener('change', event => {
  selectedBreedId = event.target.value;
  fetchAndDisplayCatInfo(selectedBreedId);
});

populateBreeds();
