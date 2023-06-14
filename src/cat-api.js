const API_KEY = 'live_YOPeE8oR6yXBBidl9ezfqjVBhfvLe9dFm3bgtlkia9HHKqXbHwK15OYGkM2FvZjn'; 


export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds.');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed.');
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      console.error(error);
      throw error;
    });
}
