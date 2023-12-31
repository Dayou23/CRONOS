import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerRedux from "./registerRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  register: registerRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
//const persistedReducerUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  // reducer: {
  //   user: persistedReducerUser,
  //   cart: cartReducer,
  //   register: registerRedux,
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     cart: cartReducer,
//     register: registerRedux,
//   },
// });
