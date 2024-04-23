import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetEventData(eventId) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`
      );

      return data;
    },
  });
}

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

export function useAddFollow(organizerId, setFollowing) {
  const { userToken } = useContext(UserContext);
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
      queryClient.invalidateQueries(["organizer_followers", organizerId]);
      setFollowing(true);
    },
  });
}

export function useRemoveFollow(organizerId, setFollowing) {
  const { userToken } = useContext(UserContext);
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
      queryClient.invalidateQueries(["organizer_followers", organizerId]);
      setFollowing(false);
    },
  });
}
