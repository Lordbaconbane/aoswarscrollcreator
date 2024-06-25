import { configureStore } from "@reduxjs/toolkit";
import { factionSlice } from "../components/GrandAlliances/GrandAlliancsSlice";

// We created a Redux store
export const store = configureStore({
  reducer: {
    faction: factionSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
