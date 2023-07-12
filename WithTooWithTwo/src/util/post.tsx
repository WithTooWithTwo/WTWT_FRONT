import axios from 'axios';
import {PostsType, PostsTypeWithoutId} from '../slices/postsSlice';
const URL = 'https://wtwt-test-c77ec-default-rtdb.firebaseio.com';

export async function storePosts(posts: PostsTypeWithoutId) {
  const response = await axios.post(URL + '/posts.json', posts);
  const id = response.data.id;
  return response;
}

export async function fetchPost() {
  const response = await axios.get(URL + '/posts.json');
  const posts = new Array<PostsType>();

  for (const key in response.data) {
    const postObj = {
      id: key,
      category_id: response.data[key].category_id,
      writer_id: response.data[key].writer_id,
      title: response.data[key].title,
      content: response.data[key].content,
      firstDay: response.data[key].firstDay,
      lastDay: response.data[key].lastDay,
      headCount: response.data[key].headCount,
      companions: response.data[key].companions,
      preferGender: response.data[key].preferGender,
      preferMinAge: response.data[key].preferMinAge,
      preferMaxAge: response.data[key].preferMaxAge,
    };
    posts.push(postObj);
  }
  return posts;
}
