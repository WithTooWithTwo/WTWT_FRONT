import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import postsSlice from '../slices/postsSlice';
import groupSlice from '../slices/groupSlice';
import userSlice from '../slices/userSlice';
import filteringSlice from '../slices/filteringSlice';
export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postsSlice,
    group: groupSlice,
    user: userSlice,
    filtering: filteringSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
