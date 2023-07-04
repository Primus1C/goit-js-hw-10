
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_uPAbgvOj5WRxm08mP9aix5kJU4fWe1265ayGmXdj9j6ShUPbrmokXYHhIKbkxXGw';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
