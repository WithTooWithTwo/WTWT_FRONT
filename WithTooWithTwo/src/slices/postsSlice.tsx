import {createSlice} from '@reduxjs/toolkit';
import {PostListType} from '../util/post';

export type PostsType = {
  post_id: string;
  category: {id: number; name: string};
  writer: {
    id: number;
    nickname: string;
    profile: null;
  };
  title: string;
  content: string;
  postDate: string;
  lightning: boolean;
  firstDay: string;
  lastDay: string;
  headCount: number;
  members: {
    id: number;
    nickname: string;
    profile: string | null;
  };
  preference: {
    gender: string | null;
    minAge: number;
    maxAge: number;
    preferHeadCount: number;
  };
  images: ImageType[] | null;
  tags: string[] | null;
  hits: number;
};

export type ImageType = {
  uri: string;
  type: string;
  name: string;
};

// export type PostsTypeWithoutId = {
//   category_id: string;
//   writer_id: string;
//   title: string;
//   content: string;
//   firstDay: string;
//   lastDay: string;
//   headCount: number;
//   companions: Array<string>;
//   preferGender: string;
//   preferMinAge: number;
//   preferMaxAge: number;
// };

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: new Array<PostListType>(),
    popularPosts: new Array<PostListType>(),
    lightningPosts: new Array<PostListType>(),
    normalPosts: new Array<PostListType>(),
  },
  reducers: {
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    setPosts: (state, action) => {
      const inverted = action.payload.reverse();
      state.posts = inverted;
    },
    setPopularPosts: (state, action) => {
      state.popularPosts = action.payload;
    },
    setLightningPosts: (state, action) => {
      const inverted = action.payload.reverse();
      state.lightningPosts = inverted;
    },
    setNormalPosts: (state, action) => {
      const inverted = action.payload.reverse();
      state.normalPosts = inverted;
    },
  },
});

export const setPopularPosts = postsSlice.actions.setPopularPosts;
export const setNormalPosts = postsSlice.actions.setNormalPosts;
export const setLightningPosts = postsSlice.actions.setLightningPosts;
export const setPosts = postsSlice.actions.setPosts;
export const addPosts = postsSlice.actions.addPost;
export default postsSlice.reducer;
