import axios from 'axios';
import {PostsType, PostsTypeWithoutId} from '../slices/postsSlice';
//const URL = 'https://wtwt-test-c77ec-default-rtdb.firebaseio.com';
const URL = 'http://10.50.45.55:8080';

export async function storePosts(posts: any) {
  const response = await axios.post(URL + '/posts', posts);
  const id = response.data.id;
  return response;
}

export type TotalPostType = {
  id: number;
  writer: {
    id: number;
    nickname: string;
    profile: null;
  };
  title: string;
  content: string;

  headCount: number;

  createdAt: string;
  hits: number;
  isLightning: boolean;
  preferHeadCount: number;
  status: string;
};

export async function fetchOnePost(api: string = '') {
  const response = await axios.get(URL + '/posts/' + api);
  const posts: PostsType = {
    post_id: response.data.post_id,
    category: response.data.category,
    writer: response.data.writer,
    title: response.data.title,
    content: response.data.content,
    postDate: response.data.postDate,
    lightning: response.data.lightning,
    firstDay: response.data.firstDay,
    lastDay: response.data.lastDay,
    headCount: response.data.headCount,
    members: response.data.members,
    preference: response.data.preference,
    images: response.data.image,
    tags: response.data.tags,
    hits: response.data.hits,
  };

  return posts;
}

export async function fetchPost(api: string = '') {
  const response = await axios.get(URL + '/posts' + api);
  const posts = new Array<TotalPostType>();

  for (const key in response.data) {
    const postObj = {
      id: response.data[key].id,
      // category_id: response.data[key].category_id,
      writer: response.data[key].writer,
      title: response.data[key].title,
      content: response.data[key].content,
      headCount: response.data[key].headCount,
      createdAt: response.data[key].createdAt,
      hits: response.data[key].hits,
      isLightning: response.data[key].isLightning,
      preferHeadCount: response.data[key].preferHeadCount,
      status: response.data[key].status,
    };
    posts.push(postObj);
  }
  return posts;
}
