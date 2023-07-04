/* import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_YGWRPlgbj8PJkdp9R68mzE5AJ1W7whcwqQBldfENQlehOrKyZKTx11u2KgAJW1oi';

const baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  const resp = (request = axios.get(`${baseURL}/breeds`).then(response => {
    //console.log('Data',response.data);
    return response.data;
  }));
  return resp;
}

export function fetchCatByBreed(breedId) {
  const resp = (request = axios
    .get(`${baseURL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    }));
  return resp;
} */

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
    /* .then(data => {
      console.log(data);
    })
    .catch(); */
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
