import { useEffect, useState } from "react";
import api from "../lib/axios";
import { User } from "../types/auth";
import { IFriend } from "../types/friend.types";

const useFriendListUser = (userId: string) => {
  const [activeFriendUsers, setActiveFriendUsers] = useState<IFriend[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/related-friends/${userId}`);

        if (res.status === 200) {
          setActiveFriendUsers(res?.data?.relatedFriend);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { activeFriendUsers, loading };
};

export default useFriendListUser;
