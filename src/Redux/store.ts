// #region Global Imports
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { useMemo } from 'react';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// #endregion Global Imports

// #region Local Imports
import Reducers from "./Reducers";
// #endregion Local Imports

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['persistState'], 
    blacklist: ['signUp', 'loginError'] // place to select which state you want to persist
}
  
const persistedReducer = persistReducer(persistConfig, Reducers)

export const makeStore = (initialState: {}) => {
    return createStore(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
};

// let store: any = {};

// const initialState: any = {};

// function initStore(preloadedState = initialState) {
//     return createStore(
//         Reducers,
//         preloadedState,
//         composeWithDevTools(applyMiddleware())
//     )
//   }
  
//   export const initializeStore = (preloadedState: any) => {
//     let _store = store ? initStore(preloadedState) : null;
  
//     // After navigating to a page with an initial Redux state, merge that state
//     // with the current state in the store, and create a new store
//     if (preloadedState && store) {
//       _store = initStore({
//         ...store.getState(),
//         ...preloadedState,
//       })
//       // Reset the current store
//       store = undefined
//     }
  
//     // For SSG and SSR always create a new store
//     if (typeof window === 'undefined') return _store
//     // Create the store once in the client
//     if (!store) store = _store
  
//     return _store
//   }
  
//   export function useStore(initialState: any) {
//     const store = useMemo(() => initializeStore(initialState), [initialState])
//     return store
//   }