import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { useState } from "react";
import { useEffect } from "react";

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

const useGetNumberOfFollowers = async (organizerId) => {
  const { headers } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/Organizers/${organizerId}/followers`
  );
  const NumberOfFollowers = JSON.parse(headers["x-pagination"]).TotalCount;
  return NumberOfFollowers;
};

export const useFetchFollowers = (events) => {
  const [followers, setFollowers] = useState({});
  const followersRef = useRef({});

  useEffect(() => {
    const fetchFollowers = async () => {
      if (events.length === 0) return;
      const newFollowers = {};
      const promises = events.map(async (event) => {
        if (!followersRef.current[event.organizer.id]) {
          const numberOfFollowers = await useGetNumberOfFollowers(
            event.organizer.id
          );
          newFollowers[event.organizer.id] = numberOfFollowers;
          followersRef.current[event.organizer.id] = numberOfFollowers;
        } else {
          newFollowers[event.organizer.id] =
            followersRef.current[event.organizer.id];
        }
      });

      await Promise.all(promises);

      setFollowers((prevFollowers) => ({
        ...prevFollowers,
        ...newFollowers,
      }));
    };

    fetchFollowers();
  }, [events]);

  return followers;
};

const useGetRate = async (eventId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/events/${eventId}/avg`
  );
  return data;
};

export const useFetchRatings = (events) => {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings = {};
      const promises = events.map(async (event) => {
        if (!ratings[event.id]) {
          const rating = await useGetRate(event.id);
          newRatings[event.id] = rating;
        }
      });
      await Promise.all(promises);
      setRatings((prevRatings) => ({
        ...prevRatings,
        ...newRatings,
      }));
    };

    if (events.length > 0) {
      fetchRatings();
    }
  }, [events]);

  return ratings;
};
