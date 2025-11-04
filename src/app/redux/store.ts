import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { authApi } from "@/app/redux/features/authApi/authApi";
import { friendApi } from "@/app/redux/features/friends/friendApi";
import onlineReducer from "@/app/redux/features/user-slice/message-user-slice";
import friendsReducer from "@/app/redux/features/friend-slice/friend-slice";

export const store = configureStore({
  reducer: {
    user: onlineReducer,
    friends: friendsReducer,

    [friendApi.reducerPath]: friendApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(friendApi.middleware)
      .concat(authApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
