import { fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
  select: document.querySelector('.breed-select'),
  card: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.error.classList.add('is-hidden');
refs.card.classList.add('is-hidden');
refs.select.classList.add('is-hidden');

function slim() {
  new SlimSelect({
    select: refs.select,
    settings: {
      showSearch: false,
      searchText: 'Sorry nothing to see here',
      searchPlaceholder: 'Search for the good stuff!',
      searchHighlight: true,
    },
  });
}

refs.select.addEventListener('change', onChange);
function onChange(e) {
  refs.loader.classList.replace('is-hidden', 'loader');
  refs.select.classList.add('is-hidden');
  refs.card.classList.add('is-hidden');
  const id = e.target.value;

  return fetchBreeds(id)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.select.classList.remove('is-hidden');
      createCards(data);

      refs.card.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function createCards(data) {
  const markupCard = data
    .map(el => {
      return `<img src="${el.url}" alt="${el.breeds[0].name} width="300px" height="300px" >

<h1 class="title">${el.breeds[0].name}</h1>
<p class="text">${el.breeds[0].description}</p>
<p class="text">${el.breeds[0].temperament}</p>`;
    })
    .join('');

  refs.card.innerHTML = markupCard;
}

function f() {
  const API_KEY =
    'live_sBjoY9QPKzp29SS9zbWcKJbnSa7jxZi3iyIq2P3jfmWvc6bgOQa2PkZjuFivagNN';

  fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      createMarkup(data);
      slim();

      // refs.card.classList.remove('is-hidden');
      refs.select.classList.remove('is-hidden');
      refs.loader.classList.replace('loader', 'is-hidden');
    })
    .catch(onFetchError);
}
f();
function createMarkup(arr) {
  const options = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.select.insertAdjacentHTML('beforeend', options);
}
function onFetchError(error) {
  refs.select.classList.remove('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');
  console.log(error);
  refs.catInfo.innerHTML = '';

  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
