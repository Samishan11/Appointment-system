import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// declaring initial state here
const initialState = {
  loading: false,
  user: [],
  error: "",
};

// fetcing user data here
export const fetchuser = createAsyncThunk("user/fetchuser", async () => {
  var res = await axios.get(`${import.meta.env.VITE_PROXY_URI}/get-user`);
  return res.data.data;
});

// user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // data from api assign into the initial state
  extraReducers: (builder) => {
    // check weather the loading false here
    builder.addCase(fetchuser.pending, (state) => {
      state.loading = false;
    });
    // check weather the loading true here
    builder.addCase(fetchuser.fulfilled, (state, action) => {
      state.loading = true;
      state.user = action.payload;
    });
    // if error occors
    builder.addCase(fetchuser.rejected, (state, action) => {
      state.loading = true;
      state.user = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    // add user
    adduser: (state, action) => {
      const user = {
        _id: action.payload._id,
        username: action.payload.username,
        isDoctor: action.payload.isDoctor,
        isAdmin: action.payload.isAdmin,
        email: action.payload.email,
        password: action.payload.password,
        createdOn: new Date().toDateString(),
      };
      toast.success("User Created.");
      state.user.push(user);
    },
    // update user
    updateUser: (state, action) => {
      state.user.map((val) => {
        if (val._id === action.payload._id) {
          (val.username = action.payload.username),
            (val.email = action.payload.email),
            (val.image = action.payload.image),
            (val.password = action.payload.password);
        }
      });
      toast.success("user Updated");
    },
    // delete user
    deleteuser: (state, action) => {
      state.user = state.user.filter((val) => val._id !== action.payload);
    },
  },
});

export const { user, updateUser, deleteuser, adduser } = userSlice.actions;

export default userSlice.reducer;
