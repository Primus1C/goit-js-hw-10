import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  catInfo: document.querySelector('.cat-info'),
  selectArea: document.querySelector('.container-select'),
  loaderArea: document.querySelector('.container-loader'),
  errorText: document.querySelector('.error'),
};

const select = new SlimSelect({
  select: '.breed-select',
  settings: {
    placeholderText: 'Select a cat breed',
    hideSelected: true,
    allowDeselect: true,
  },
  events: {
    afterChange: onBreedSelected,
  },
});

let firstRun = true;

showElement(refs.catInfo, false);
showElement(refs.selectArea, false);
showElement(refs.loaderArea);
showElement(refs.errorText, false);

fetchBreeds()
  .then(data => {
    const dataSet = data.map(breed => {
      return { value: breed.id, text: breed.name };
    });
    select.setData(dataSet);
    showElement(refs.selectArea);
    showElement(refs.loaderArea, false);
  })
  .catch(error => {
    Notiflix.Notify.failure(error.message);
    showElement(refs.loaderArea, false);
  });

function onBreedSelected(evt) {
  if (firstRun === true) {
    firstRun = false;
    return;
  }
  showElement(refs.loaderArea);
  showElement(refs.catInfo, false);
  fetchCatByBreed(select.getSelected())
    .then(data => {
      const c = data[0];
      const b = c.breeds[0];
      
      refs.catInfo.innerHTML = `<h2>${b.name}</h2><h3>Origin: ${b.origin}</h3><img class="img" src="${c.url}" alt="${b.name}" width="400px"><h3>Temperament:  ${b.temperament}</h3><p>${b.description}</p><p>Life span: ${b.life_span}</p><a href="${b.wikipedia_url}">Wikipedia</a><p><a href="${b.vetstreet_url}">Vetstreet</a></p><p><a href="${b.vcahospitals_url}">Animal hospital</a></p>`;

      refs.img = document.querySelector('.img');
      refs.img.addEventListener('load', onLoadImg);
    
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      showElement(refs.loaderArea,false);
    });
}

function onLoadImg(evt) {
  console.log('loading img...');
  showElement(refs.loaderArea, false);
   showElement(refs.catInfo);
} 

function showElement(element, show = true) {
  //console.log('SHOW=', show, element);
  element.style ='';
  if (show === true) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}
