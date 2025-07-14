import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from './state';

type Mode = 'light' | 'dark';

type AppSettings = {
  mode: 'light' | 'dark';
};

const initialState: AppSettings = {
  mode: 'light',
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setColorMode } =
  appSettingsSlice.actions;

export default appSettingsSlice.reducer;

export const selectColorMode = (state: RootState) => state.appSettings.mode;
