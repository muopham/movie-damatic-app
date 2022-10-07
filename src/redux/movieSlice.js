import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      const item = action.payload;
      const temp = state.movies.filter((e) => e.id === item.id);

      if (temp.length > 0) {
        // eslint-disable-next-line array-callback-return
        state.movies.map((i) => {
          if (item.id === i.id) {
            return void state.movies;
          }
        });
      } else {
        return void state.movies.push(action.payload);
      }
    },
  },
});

export const { addMovie } = movieSlice.actions;

export default movieSlice.reducer;
