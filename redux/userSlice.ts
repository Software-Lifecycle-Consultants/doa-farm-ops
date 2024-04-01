import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, User } from './types';

const initialState: { user: User | null } = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { register } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
