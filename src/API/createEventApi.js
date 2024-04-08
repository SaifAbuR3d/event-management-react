import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/categories`
      );
      return data;
    },
  });
}

export function useCreateEvent(token) {
  return useMutation({
    mutationFn: (eventData) =>
      axios.post(`${import.meta.env.VITE_API_URL}/api/events`, eventData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["event"]);
    },
  });
}
