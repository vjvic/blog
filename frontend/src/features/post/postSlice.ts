import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { Post } from "../../interface/Post";

interface InitialState {
  postList: Post[];
  myPostList: Post[];
  details: Post;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isLikeSuccess: boolean;
  message: string | unknown;
}

const initialState: InitialState = {
  postList: [],
  myPostList: [],
  details: {
    title: "",
    photo: "",
    username: "",
    desc: "",
    createdAt: "",
    like: [""],
  },
  isError: false,
  isLoading: false,
  isSuccess: false,
  isLikeSuccess: false,
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

export const getMyPost = createAsyncThunk<
  Post[],
  undefined,
  { state: RootState }
>("post/getMyPost", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.user!.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API_URL + "mypost", config);

    return response.data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return rejectWithValue(message);
  }
});

export const createPost = createAsyncThunk<Post, Post, { state: RootState }>(
  "post/createPost",
  async (post: Post, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
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

export const getPostDetails = createAsyncThunk(
  "post/getPostDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL + id);

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

export const likePost = createAsyncThunk<string, string, { state: RootState }>(
  "post/likePost",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user!.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL + "like", { id: id }, config);

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
  reducers: {
    reset: (state) => initialState,
  },

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
        state.isSuccess = true;
        state.myPostList.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPostDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.details = action.payload;
      })
      .addCase(getPostDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
        state.isLikeSuccess = false;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLikeSuccess = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isLikeSuccess = false;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
