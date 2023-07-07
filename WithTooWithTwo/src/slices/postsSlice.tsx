import {createSlice} from '@reduxjs/toolkit';

export type PostsType = {
  id?: string;
  category_id: string;
  writer_id: string;
  title: string;
  content: string;
  firstDay: string;
  lastDay: string;
  headCount: number;
  companions: Array<string>;
  preferGender: string;
  preferMinAge: number;
  preferMaxAge: number;
};

export type PostsTypeWithoutId = {
  category_id: string;
  writer_id: string;
  title: string;
  content: string;
  firstDay: string;
  lastDay: string;
  headCount: number;
  companions: Array<string>;
  preferGender: string;
  preferMinAge: number;
  preferMaxAge: number;
};

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: new Array<PostsType>(),
  },
  reducers: {
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    setPosts: (state, action) => {
      const inverted = action.payload.reverse();
      state.posts = inverted;
    },
  },
});

export const setPosts = postsSlice.actions.setPosts;
export const addPosts = postsSlice.actions.addPost;
export default postsSlice.reducer;
