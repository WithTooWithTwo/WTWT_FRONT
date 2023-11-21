import {createSlice} from '@reduxjs/toolkit';
import {UserType} from '../util/user';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: new Array<UserType>(),
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const setUserInfo = userSlice.actions.setUserInfo;

export default userSlice.reducer;
