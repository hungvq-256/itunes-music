import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSongList } from "@/api/mainPage";

export const fetchSongList = createAsyncThunk(
  "mainSlice/fetchSongList",
  async (textSearch) => {
    const response = await getSongList(textSearch);
    return response;
  }
);

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    songList: [],
    loading: false,
    songInfo: {},
    filterValue: -1,
    searchText: "",
  },
  reducers: {
    setSongList: (state, action) => {
      state.songList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSongInfo: (state, action) => {
      state.songInfo = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSongList.pending, (state, action) => {
      state.songInfo = {};
      state.filterValue = -1;
      state.loading = true;
    });
    builder.addCase(fetchSongList.fulfilled, (state, action) => {
      state.songList = action.payload?.results;
      state.songInfo = action.payload?.results.length
        ? action.payload?.results[0]
        : {};
      state.loading = false;
    });
    builder.addCase(fetchSongList.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  setSongList,
  setLoading,
  setSongInfo,
  setFilterValue,
  setSearchText,
} = mainSlice.actions;

export default mainSlice.reducer;
