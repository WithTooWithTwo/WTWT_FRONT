import {createSlice} from '@reduxjs/toolkit';
import {FilteringType} from '../util/post';

const filteringSlice = createSlice({
  name: 'filtering',
  initialState: {
    category: '전체',
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const setCategory = filteringSlice.actions.setCategory;
export default filteringSlice.reducer;
