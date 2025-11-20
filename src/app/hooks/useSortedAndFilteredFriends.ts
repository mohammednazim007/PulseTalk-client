// app/hooks/useSortedAndFilteredFriends.ts

import { User } from "@/app/types/auth";
import { useMemo } from "react";

/**
 * Filters the friend list by search term and then sorts it
 * to put online users first, followed by an alphabetical sort.
 * * @param friends - The list of all accepted friends.
 * @param searchTerm - The debounced string used for filtering.
 * @param onlineUserIds - An array of IDs for users currently online.
 */
export const useSortedAndFilteredFriends = (
  friends: User[] | undefined,
  searchTerm: string,
  onlineUserIds: string[]
) => {
  return useMemo(() => {
    if (!friends) return [];

    const normalizedSearch = searchTerm.trim().toLowerCase();

    // 1. FILTERING (Logic from your original useFilteredFriends)
    const filtered = friends.filter((friend) => {
      // If no search term, return all friends
      if (!normalizedSearch) {
        return true;
      }

      const nameMatch = friend.name?.toLowerCase().includes(normalizedSearch);
      const emailMatch = friend.email?.toLowerCase().includes(normalizedSearch);
      return nameMatch || emailMatch;
    });

    // 2. SORTING
    // Sort logic runs only on the filtered list
    return filtered.sort((a, b) => {
      const aIsOnline = onlineUserIds.includes(a._id);
      const bIsOnline = onlineUserIds.includes(b._id);

      // Primary Sort: Online Status
      // Put online users (aIsOnline = true) before offline users
      if (aIsOnline && !bIsOnline) return -1; // 'a' comes first
      if (!aIsOnline && bIsOnline) return 1; // 'b' comes first

      // Secondary Sort: Alphabetical (for users with the same online status)
      // Use localeCompare for robust alphabetical sorting
      return a.name.localeCompare(b.name);
    });
  }, [friends, searchTerm, onlineUserIds]); // Dependencies include the new onlineUserIds
};
