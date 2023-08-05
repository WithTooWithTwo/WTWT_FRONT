import axios from 'axios';

const API_KEY = 'http://3.39.87.78:8080';

export type OptionType = {
  id: number;
  name: string;
};

export async function fetchReviewOptions(api: string = '') {
  const response = await axios.get(API_KEY + api);
  const options = new Array<OptionType>();
  for (const key in response.data) {
    const obj = {
      id: response.data[key].id,
      name: response.data[key].name,
    };
    options.push(obj);
  }
  return options;
}
