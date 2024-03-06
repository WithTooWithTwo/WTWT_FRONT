import axios from 'axios';
import {ReviewType} from '../screens/Group/GroupReviewScreen';

export type OptionType = {
  id: number;
  name: string;
};

export async function fetchReviewOptions(api: string = '') {
  const response = await axios.get(
    process.env.API_KEY + '/review-options' + api,
  );
  let options = null;

  for (const key in response.data) {
    options = response.data[key];
  }
  return options;
}

export const sendReview = async (id: string, reviews: ReviewType[]) => {
  const response = await axios.post(
    process.env.API_KEY + '/reviews/' + id,
    reviews,
  );
  const result = response.data.result;
  return response;
};

export async function storePosts(posts: any, contentType: string) {
  const response = await axios.post(process.env.API_KEY + '/posts', posts, {
    headers: {'content-type': contentType || ''},
  });
  const id = response.data.id;
  return response;
}
