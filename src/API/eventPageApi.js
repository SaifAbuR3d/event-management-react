import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";

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
      const { headers } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/organizers/${organizerId}/followers`
      );
      return JSON.parse(headers["x-pagination"]).TotalCount;
    },
    enabled: !!organizerId,
  });
}

export function useAddFollow(organizerId, token, setIsFollowing) {
  return useMutation({
    mutationFn: () =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/Attendees/my/follows`,
        { organizerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["organizer_followers", organizerId]);
      setIsFollowing(true);
    },
  });
}
