import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { queryClient } from "../main";

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

const useGetRate = async (eventId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/events/${eventId}/avg`
  );
  return data;
};

export function useGetTopRatedEvents(numberOfDays, numberOfEvents) {
  return useQuery({
    queryKey: ["topRatedEvents"],
    queryFn: async () => {
      const { data: TopRatedEvents } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/most-rated?days=${numberOfDays}&numberOfEvents=${numberOfEvents}`
      );

      const eventsWithRate = await Promise.all(
        TopRatedEvents.map(async (event) => {
          const rateAvg = await useGetRate(event.id);
          return {
            ...event,
            rateAvg,
          };
        })
      );

      return eventsWithRate;
    },
  });
}

export function useGetEventMayLike() {
  const { userToken, user } = useContext(UserContext);
  return useQuery({
    queryKey: ["eventMayLike", user?.id],
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
    queryKey: ["eventNearYou", lat, lon],
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

const useGetNumberOfFollowers = async (organizerId) => {
  const { headers } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/Organizers/${organizerId}/followers`
  );
  const NumberOfFollowers = JSON.parse(headers["x-pagination"]).TotalCount;
  return NumberOfFollowers;
};

export function userGetAllFollowingEvents() {
  const { userToken } = useContext(UserContext);

  const fetchEventsWithFollowers = async ({ pageParam = 1 }) => {
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

    const eventsWithFollowers = await Promise.all(
      FollowingEvents.map(async (event) => {
        const followersCount = await useGetNumberOfFollowers(
          event.organizer.id
        );
        return { ...event, organizer: { ...event.organizer, followersCount } };
      })
    );

    return {
      data: eventsWithFollowers,
      currentPage: pageParam,
      TotalCount: pagination.TotalCount,
      nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
    };
  };

  return useInfiniteQuery({
    queryKey: ["followingEvents"],
    queryFn: fetchEventsWithFollowers,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function useSetInterests() {
  const { userToken, user } = useContext(UserContext);
  return useMutation({
    mutationFn: (requestData) =>
      axios.put(
        `${import.meta.env.VITE_API_URL}/api/Attendees/my/interests`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eventMayLike", user?.id],
        exact: true,
      });
    },
  });
}
