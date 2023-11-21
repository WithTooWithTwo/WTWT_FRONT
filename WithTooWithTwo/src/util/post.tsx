import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {GroupMember} from './group';

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

export const defaultPostList: PostListType = {
  id: 0,
  writer: {
    id: 0,
    nickname: '',
    profile: null,
  },
  title: '',
  content: '',
  headCount: 0,
  createdAt: '',
  hits: 0,
  isLightning: false,
  preferHeadCount: 0,
  status: '',
};

export async function fetchOnePost(api: string = '') {
  const response = await axios.get(URL + '/posts/' + api);
  const posts: OnePostType = {
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

export type FilteringType = {
  order?: string;
  category?: string;
  gender?: string;
  minAge?: number;
  maxAge?: number;
  lightning?: boolean;
  date?: string;
  minHeadCount?: number;
  maxHeadCount?: number;
  keyword?: string;
};

const filteringList = (filtering: FilteringType) => {
  let filteringText = '/posts?';
  for (const key in filtering) {
    if (filtering[key as keyof FilteringType] === undefined) continue;
    filteringText += `${key}=${filtering[key as keyof FilteringType]}&`;
  }
  return filteringText.slice(0, filteringText.length - 1);
};

export async function fetchFilteredPosts(filtering: FilteringType) {
  const filteringText = filteringList(filtering);
  const response = await axios.get(URL + filteringText);
  let posts: PostListType[] = response.data;

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

export type OnePostType = {
  post_id: string;
  category: {id: number; name: string};
  writer: GroupMember;
  title: string;
  content: string;
  postDate: string;
  lightning: boolean;
  firstDay: string;
  lastDay: string;
  headCount: number;
  members: GroupMember[];
  preference: {
    gender: string | null;
    minAge: number;
    maxAge: number;
    preferHeadCount: number;
  };
  images: string[] | null; // 받아오는 이미지는 string 맞음!
  tags: string[] | null;
  hits: number;
};

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

export const fetchImage = async (uri: string) => {
  const response = await RNFetchBlob.fetch('GET', URL + '/images/' + uri);
  const imagePath = RNFetchBlob.fs.dirs.CacheDir + '/' + uri; // 로컬 경로 설정
  await RNFetchBlob.fs.writeFile(imagePath, response.data, 'base64'); // 이미지를 로컬 파일로 저장
  return imagePath;
};

export type CategoryType = {
  value: number;
  label: string;
};

export const fetchCategoryList = async () => {
  const response = await axios.get(URL + '/categories');
  const categories = [];
  for (const key in response.data.categories) {
    const categoryObj: CategoryType = {
      value: response.data.categories[key].id,
      label: response.data.categories[key].name,
    };
    categories.push(categoryObj);
  }
  return categories;
};
