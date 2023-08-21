import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  card: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

// loader.style.display = 'none';
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
refs.error.classList.add('is-hidden');
function onChange(e) {
  // slim();
  refs.loader.classList.add('is-hidden');
  const id = e.target.value;
  return fetchBreeds(id).then(data => {
    console.log(data);
    return createCards(data);
  });
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
  // return markupCard;
}

const API_KEY =
  'live_sBjoY9QPKzp29SS9zbWcKJbnSa7jxZi3iyIq2P3jfmWvc6bgOQa2PkZjuFivagNN';

fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then(data => createMarkup(data))
  .catch(err => console.log(err));

function createMarkup(arr) {
  const options = arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.select.insertAdjacentHTML('beforeend', options);
}

function fetchBreeds(id) {
  const API_URL = 'https://api.thecatapi.com/v1/images/search';
  const API_KEY =
    'live_sBjoY9QPKzp29SS9zbWcKJbnSa7jxZi3iyIq2P3jfmWvc6bgOQa2PkZjuFivagNN';

  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: id,
  });

  return fetch(`${API_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
