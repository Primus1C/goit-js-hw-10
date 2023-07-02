import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const refs = {
  catInfo: document.querySelector('.cat-info'),
  selectArea: document.querySelector('.container-select'),
  loaderArea: document.querySelector('.container-loader'),
  errorText: document.querySelector('.error'),
};
//console.log(refs);

const select = new SlimSelect({
  select: '.breed-select',
  /*data: [{ text: 'Value 1', value: 'value1' }],*/
  settings: {
    placeholderText: 'Select a cat breed',
    hideSelected: true,
    allowDeselect: true,
  },
  events: {
    afterChange: onBreedSelected,
  },
});

//console.log(select);

showLoader(false);
fetchBreeds().then(data => {
  const dataSet = data.map(breed => {
    return { value: breed.id, text: breed.name };
  });
  select.setData(dataSet);
});
hideLoader();

function onBreedSelected(evt) {
  showLoader(true);
  fetchCatByBreed(select.getSelected()).then(data => {
    const c = data[0];
    const b = c.breeds[0];
    refs.catInfo.innerHTML = `<h2>${b.name}</h2><h3>Origin: ${b.origin}</h3><img src="${c.url}" alt="${b.name}" width="400px"><h3>Temperament:  ${b.temperament}</h3><p>${b.description}</p><p>Life span: ${b.life_span}</p><a href="${b.wikipedia_url}">Wikipedia</a><p><a href="${b.vetstreet_url}">Vetstreet</a></p><p><a href="${b.vcahospitals_url}">Animal hospital</a></p>`;
  });
  hideLoader();
}

function showLoader(queryCatInfo) {
  console.log('show');
  if (queryCatInfo) {
    refs.catInfo.classList.add('hidden');
  } else {
    refs.selectArea.classList.add('hidden');
  }
  refs.loaderArea.classList.remove('hidden');
}

function hideLoader() {
  console.log('hide');
  refs.selectArea.classList.remove('hidden');
  refs.catInfo.classList.remove('hidden');
  //refs.loaderArea.classList.add('hidden');
}
