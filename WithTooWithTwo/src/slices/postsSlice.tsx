import {createSlice} from '@reduxjs/toolkit';
import {PostListType} from '../util/post';
import {GroupMember} from '../util/group';

export type PostsType = {
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
  images: ImageType[] | string[] | null;
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
      const inverted = action.payload;
      state.posts = inverted;
    },
    setPopularPosts: (state, action) => {
      state.popularPosts = action.payload;
    },
    setLightningPosts: (state, action) => {
      const inverted = action.payload;
      state.lightningPosts = inverted;
    },
    setNormalPosts: (state, action) => {
      const inverted = action.payload;
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
