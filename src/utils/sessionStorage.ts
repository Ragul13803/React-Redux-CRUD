// utils/sessionStorage.ts

import { RootState } from '../Store/index';

// Load state from sessionStorage and parse it into the RootState structure
export const loadState = (): RootState | undefined => {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState) {
      return JSON.parse(serializedState);  // Parse the state to RootState
    }
    return undefined;
  } catch (err) {
    console.error('Could not load state from sessionStorage', err);
    return undefined;
  }
};

// Save state to sessionStorage
export const saveState = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);  // Convert state to string
    sessionStorage.setItem('reduxState', serializedState); // Save the state
  } catch (err) {
    console.error('Could not save state to sessionStorage', err);
  }
};
