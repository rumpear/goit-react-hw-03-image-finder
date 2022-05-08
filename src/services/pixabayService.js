import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '12565678-dacc4bb7fef27484506aaaffc',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (q, page) => {
  const { data } = await axios.get(`/`, { params: { q, page } });
  return data;
};
