import axios from 'axios';
//import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_YGWRPlgbj8PJkdp9R68mzE5AJ1W7whcwqQBldfENQlehOrKyZKTx11u2KgAJW1oi';

const baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {

  const request =  axios
    .get(`${baseURL}/breeds`)
    .then(response => {
      //console.log('Data',response.data);
      return response.data;
    })
    /* .catch(error => {
      //console.log(error);
      Notiflix.Notify.failure(error.message);
    }); */
  return request;
}

export function fetchCatByBreed(breedId) {
  const request = axios
    .get(`${baseURL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    /* .catch(error => {
      //console.log('error',error);
      Notiflix.Notify.failure(error.message);
    }); */
  return request;
}
