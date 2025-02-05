import { configureStore } from "@reduxjs/toolkit";
import customerReducer from './Customers/customerSlice'
// import { loadState, saveState } from '../utils/sessionStorage'; // Import utility functions

// Load the state from sessionStorage when the app starts
// const persistedState = loadState();


const store = configureStore({
  devTools:true,
  reducer:{
    customers: customerReducer,
    // preloadedState: persistedState, // Pass persisted state to Redux store
  }
})

// store.subscribe(() => {
//   saveState(store.getState()); // Save the current Redux state to sessionStorage
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store