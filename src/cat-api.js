export { fetchBreeds };
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
