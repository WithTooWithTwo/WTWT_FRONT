import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import postsSlice from '../slices/postsSlice';
import groupSlice from '../slices/groupSlice';
import filteringSlice from '../slices/filteringSlice';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postsSlice,
    group: groupSlice,
    filtering: filteringSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
