import axios from 'axios';

const API_KEY = 'http://3.39.87.78:8080';

export type OptionType = {
  id: number;
  name: string;
};

export async function fetchReviewOptions(api: string = '') {
  const response = await axios.get(API_KEY + '/review-options' + api);
  let options = null;

  for (const key in response.data) {
    options = response.data[key];
  }
  return options;
}
