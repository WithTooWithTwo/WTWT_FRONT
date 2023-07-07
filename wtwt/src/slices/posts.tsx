import {createSlice} from '@reduxjs/toolkit';
import PostsType from '../slices/';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: new Array<PostsType>(),
  },
  reducers: {
    setPosts: (state, action) => {
      const inverted = action.payload.reverse();
      state.posts = inverted;
    },
  },
});

export const setPosts = postsSlice.actions.setPosts;
export default postsSlice.reducer;
