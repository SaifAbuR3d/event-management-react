import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

//--------event Data--------------------------------
export function useGetEventData(eventId) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return data;
    },
  });
}

//--------Organizer Followers--------------------------------
export function useGetOrganizerFollowers(organizerId) {
  return useQuery({
    queryKey: ["organizer_followers", organizerId],
    queryFn: async () => {
      const { headers, data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/organizers/${organizerId}/followers`
      );
      return {
        totalCount: JSON.parse(headers["x-pagination"]).TotalCount,
        data: data,
      };
    },
    enabled: !!organizerId,
  });
}

//--------Follow event--------------------------------

export function useAddFollow(organizerId) {
  const { user, userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/Attendees/my/follows`,
        { organizerId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", organizerId, user?.id],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["organizer_followers", organizerId],
        exact: true,
      });
    },
  });
}

export function useRemoveFollow(organizerId) {
  const { userToken, user } = useContext(UserContext);
  return useMutation({
    mutationFn: () =>
      axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/Attendees/my/follows/${organizerId}`,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", organizerId, user?.id],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["organizer_followers", organizerId],
        exact: true,
      });
    },
  });
}

export function useCheckIsFollowingOrganizer(organizerId) {
  const { user, isAttendee } = useContext(UserContext);
  return useQuery({
    queryKey: ["isFollowing", organizerId, user?.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendees/${
          user?.id
        }/follows?organizerId=${organizerId}`
      );
      return !!data.length;
    },
    enabled: !!organizerId && isAttendee(),
  });
}

//--------Other Events May Like--------------------------------

export function GetOtherEventsMayLike(eventId) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["EventsMayLike", eventId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/may-like`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      return data;
    },
  });
}

//--------Report Event--------------------------------

export function useReportEvent() {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: (requestData) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/event-reports`,
        { ...requestData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
  });
}

export function useReportReview() {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: (requestData) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/review-reports`,
        { ...requestData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
  });
}

//--------Like event--------------------------------

export function useAddLike(eventId) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/attendees/my/likes`,
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event", eventId],
        exact: true,
      });
    },
  });
}

export function useRemoveLike(eventId) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: () =>
      axios.delete(
        `${import.meta.env.VITE_API_URL}/api/attendees/my/likes/${eventId}`,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event", eventId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["Favorites"],
        exact: true,
      });
    },
  });
}

export function useCheckIfAttendeeLikeEvent(eventId) {
  const { user, isAttendee } = useContext(UserContext);
  return useQuery({
    queryKey: ["LikedEvent", user?.id, eventId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events?likedBy=${
          user?.id
        }&eventId=${eventId}`
      );
      return !!data.length;
    },
    enabled: isAttendee(),
  });
}
//--------Reviews event--------------------------------
export function useGetReviews(eventId) {
  return useInfiniteQuery({
    queryKey: ["reviews", eventId],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/${eventId}/reviews?pageSize=3&pageIndex=${pageParam}&sortColumn=lastModified&sortOrder=desc`
      );
      const pagination = JSON.parse(response.headers["x-pagination"]);
      return {
        reviews: [...response.data],
        currentPage: pageParam,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function useAddReview(eventId) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: (requestData) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/reviews`,
        { ...requestData },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", eventId],
        exact: true,
      });
    },
  });
}

//--------booking --------------------------------

export function useCreateRegistrationRequest(eventId) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/reg-requests`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["regRequest", eventId],
        exact: true,
      });
    },
  });
}

export function useGetRegRequestForEvent(eventId, open) {
  const { user } = useContext(UserContext);

  return useQuery({
    queryKey: ["regRequest", eventId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/reg-requests`,
        {
          params: {
            AttendeeId: user?.id,
          },
        }
      );
      return data[0] || null;
    },
    enabled: !!open,
    staleTime: 20000,
  });
}

export function useSearch({
  pageIndex,
  categoryId,
  searchTermDebounce,
  eventFilter,
  mangedEvent,
  priceFilterDebounce,
  locationFilter,
}) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: [
      [
        "Search",
        pageIndex,
        categoryId,
        searchTermDebounce,
        eventFilter,
        mangedEvent,
        priceFilterDebounce,
        locationFilter,
      ],
    ],
    queryFn: async () => {
      const params = {
        pageSize: 5,
        pageIndex: pageIndex,
        categoryId: categoryId,
        searchTerm: searchTermDebounce,
        ...(eventFilter && { [eventFilter]: true }),
        ...(mangedEvent && { OnlyManagedEvents: true }),
        ...(locationFilter && { [locationFilter]: true }),
        ...(priceFilterDebounce[0] > 0 && { minPrice: priceFilterDebounce[0] }),
        ...(priceFilterDebounce[1] > 0 && { maxPrice: priceFilterDebounce[1] }),
      };

      const headers = {
        ...(!!userToken && { Authorization: `Bearer ${userToken}` }),
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events`,
        {
          params: params,
          headers: headers,
        }
      );
      const pagination = JSON.parse(response.headers["x-pagination"]);
      return {
        data: [...response.data],
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },
    placeholderData: keepPreviousData,
  });
}
