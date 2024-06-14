import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetAttendeeData(userName) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["attendeeProfile", userName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/Attendees/${userName}`,
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

export function useChangeAttendeeImage(handleClose) {
  const { userToken } = useContext(UserContext);

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Attendees/my/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["attendeeProfile"]);
      handleClose();
    },
  });
}

export function useGetFavoritess(attendeeId) {
  const { userToken } = useContext(UserContext);
  return useInfiniteQuery({
    queryKey: ["Favorites", attendeeId],
    queryFn: async ({ pageParam }) => {
      const { data: Favorites, headers } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events?likedBy=${attendeeId}&pageSize=8&pageIndex=${pageParam}&sortColumn=creationDate&sortOrder=desc`
      );

      const pagination = JSON.parse(headers["x-pagination"]);

      return {
        data: [...Favorites],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!attendeeId,
  });
}

export function useGetFollowing(attendeeId) {
  return useInfiniteQuery({
    queryKey: ["Following", attendeeId],
    queryFn: async ({ pageParam }) => {
      const { data: Following, headers } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/attendees/${attendeeId}/follows?pageSize=6&pageIndex=${pageParam}&sortColumn=creationDate&sortOrder=desc`
      );

      const pagination = JSON.parse(headers["x-pagination"]);

      return {
        data: [...Following],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!attendeeId,
  });
}

export function useGetPreviousBookings(attendeeId) {
  const { userToken } = useContext(UserContext);

  return useInfiniteQuery({
    queryKey: ["PreviousBookings", attendeeId],
    queryFn: async ({ pageParam }) => {
      const { data: PreviousBookings, headers } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events?AttendeeId=${attendeeId}&PreviousEvents=true&pageSize=8&pageIndex=${pageParam}&sortColumn=creationDate&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const pagination = JSON.parse(headers["x-pagination"]);

      return {
        data: [...PreviousBookings],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!attendeeId,
  });
}

export function useGetUpcomingBookings(attendeeId) {
  const { userToken } = useContext(UserContext);

  return useInfiniteQuery({
    queryKey: ["UpcomingsBookings", attendeeId],
    queryFn: async ({ pageParam }) => {
      const { data: UpcomingsBookings, headers } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events?AttendeeId=${attendeeId}&UpcomingEvents=true&pageSize=8&pageIndex=${pageParam}&sortColumn=creationDate&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const pagination = JSON.parse(headers["x-pagination"]);

      return {
        data: [...UpcomingsBookings],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!attendeeId,
  });
}

export function useGetTickets(eventId) {
  const { userToken, user } = useContext(UserContext);

  return useQuery({
    queryKey: ["Tickets", eventId],
    queryFn: async () => {
      const { data: Tickets } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/${eventId}/bookings?AttendeeId=${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return Tickets;
    },
    enabled: !!eventId,
  });
}
