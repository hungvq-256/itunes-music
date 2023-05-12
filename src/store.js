import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./reduxSlice/mainSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const reducers = combineReducers({
  mainSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
  });
};
