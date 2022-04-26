import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Post } from "../../interface/Post";

interface InitialState {
  postList: Post[];
  myPostList: Post[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string | unknown;
}

const initialState: InitialState = {
  postList: [],
  myPostList: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const API_URL = "/api/post/";

export const getAllPost = createAsyncThunk(
  "post/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getMyPost = createAsyncThunk(
  "post/getMyPost",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjNiOTJiZDhlY2Y3MmNlYTlkOTk4MyIsImlhdCI6MTY1MDg1OTE3NywiZXhwIjoxNjUzNDUxMTc3fQ.s648cVBQu2IMcnt7gsNnW3YZMDH1rww9_jG5r1-nUNQ";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URL + "mypost", config);

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (post: Post, { getState, rejectWithValue }) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjNiOTJiZDhlY2Y3MmNlYTlkOTk4MyIsImlhdCI6MTY1MDg1OTE3NywiZXhwIjoxNjUzNDUxMTc3fQ.s648cVBQu2IMcnt7gsNnW3YZMDH1rww9_jG5r1-nUNQ";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, post, config);

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postList = action.payload;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.myPostList = action.payload;
      })
      .addCase(getMyPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.myPostList.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

/* export const selectAllPost = (state: RootState) => state.; */

export default postSlice.reducer;
