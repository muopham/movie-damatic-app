import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
});

export default store;
