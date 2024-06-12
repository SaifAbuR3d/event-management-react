import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: Categories } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/categories`
      );
      return Categories;
    },
  });
}

export function useGetTopRatedEvents(numberOfDays, numberOfEvents) {
  return useQuery({
    queryKey: ["topRatedEvents"],
    queryFn: async () => {
      const { data: TopRatedEvents } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/most-rated?days=${numberOfDays}&numberOfEvents=${numberOfEvents}`
      );
      return TopRatedEvents;
    },
  });
}

export function useGetEventMayLike() {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["eventMayLike"],
    queryFn: async () => {
      const { data: EventMayLike } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/i-may-like`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return EventMayLike;
    },
  });
}

export function useGetEventNearYou(lat, lon, distance, numberOfEvent) {
  return useQuery({
    queryKey: ["eventNearYou"],
    queryFn: async () => {
      const { data: EventNearYou } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/near?Latitude=${lat}&Longitude=${lon}&MaximumDistanceInKM=${distance}&NumberOfEvents=${numberOfEvent}`
      );
      return EventNearYou;
    },
  });
}

export function userGetAllFollowingEvents() {
  const { userToken } = useContext(UserContext);
  return useInfiniteQuery({
    queryKey: ["followingEvents"],
    queryFn: async ({ pageParam }) => {
      const { data: FollowingEvents, headers } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/home-feedback?PageIndex=${pageParam}&PageSize=8&sortColumn=creationDate&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const pagination = JSON.parse(headers["x-pagination"]);

      return {
        data: [...FollowingEvents],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
