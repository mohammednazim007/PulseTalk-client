// "use client";
// import { useEffect, useRef } from "react";
// import { useAppDispatch } from "@/app/hooks/hooks";
// import { refreshUser } from "@/app/redux/features/auth/refreshUser";

// export default function RefreshCurrentUser() {
//   const dispatch = useAppDispatch();
//   const dispatched = useRef(false);

//   useEffect(() => {
//     if (!dispatched.current) {
//       dispatch(refreshUser());
//       dispatched.current = true; // prevent multiple dispatches
//     }
//   }, [dispatch]);

//   return null;
// }
"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setUser } from "@/app/redux/features/auth/userSlice";
import { useRefreshUserQuery } from "@/app/redux/features/authApi/authApi";
import { useEffect } from "react";

export default function RefreshCurrentUser() {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isSuccess } = useRefreshUserQuery(undefined, {
    skip: !!user, // ✅ skip if user already persisted
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data, dispatch]);

  return null;
}
