import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { translations } from '../../i18n';

export interface State {
  locale: string;
  locales: string[];
  messages: Record<string, string>;
}

const localLanguage = navigator.language;
const locales = Object.keys(translations);

const initialState: State = {
  locale: localLanguage,
  locales,
  messages: translations[localLanguage],
};

export const slice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    changeLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
      state.messages = translations[action.payload];
    },
    setLanguageToDefault: (state) => {
      state.locale = localLanguage;
      state.messages = translations[localLanguage];
    },
  },
});

// Action creators are generated for each case reducer function
export const actions = slice.actions;

export default slice.reducer;
