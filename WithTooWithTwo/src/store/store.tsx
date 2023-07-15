import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import postsSlice from '../slices/postsSlice';
import groupSlice from '../slices/groupSlice';
export const store = configureStore({
  reducer: {auth: authSlice, post: postsSlice, group: groupSlice},
});

export type RootState = ReturnType<typeof store.getState>;
