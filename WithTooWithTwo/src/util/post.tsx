import axios from 'axios';
import {PostsType} from '../slices/postsSlice';

const URL = 'http://3.39.87.78:8080';
export async function storePosts(posts: any, contentType: string) {
  const response = await axios.post(URL + '/posts', posts, {
    headers: {'content-type': contentType || ''},
  });
  const id = response.data.id;
  return response;
}

export type PostListType = {
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
    images: response.data.images,
    tags: response.data.tags,
    hits: response.data.hits,
  };

  return posts;
}

export async function fetchPopularPostList() {
  const response = await axios.get(URL + '/posts?order=POPULAR');
  const posts = new Array<PostListType>();

  for (const key in response.data) {
    const postObj = {
      id: response.data[key].id,
      writer: response.data[key].writer,
      createdAt: response.data[key].createdAt,
      title: response.data[key].title,
      content: response.data[key].content,
      isLightning: response.data[key].isLightning,
      status: response.data[key].status,
      preferHeadCount: response.data[key].preferHeadCount,
      headCount: response.data[key].headCount,
      hits: response.data[key].hits,
    };
    posts.push(postObj);
    if (posts.length >= 5) break;
  }
  return posts;
}

export async function fetchPostList(api: string = '') {
  const response = await axios.get(URL + '/posts' + api);
  const posts = new Array<PostListType>();

  for (const key in response.data) {
    const postObj = {
      id: response.data[key].id,
      writer: response.data[key].writer,
      createdAt: response.data[key].createdAt,
      title: response.data[key].title,
      content: response.data[key].content,
      isLightning: response.data[key].isLightning,
      status: response.data[key].status,
      preferHeadCount: response.data[key].preferHeadCount,
      headCount: response.data[key].headCount,
      hits: response.data[key].hits,
    };
    posts.push(postObj);
  }
  return posts;
}
