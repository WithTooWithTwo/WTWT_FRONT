import {createSlice} from '@reduxjs/toolkit';
import {GroupType} from '../util/group';

const groupSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: new Array<GroupType>(),
  },
  reducers: {
    addGroups: (state, action) => {
      state.groups = [action.payload, ...state.groups];
    },
    setGroups: (state, action) => {
      const inverted = action.payload.reverse();
      state.groups = inverted;
    },
  },
});

export const setGroups = groupSlice.actions.setGroups;
export default groupSlice.reducer;
