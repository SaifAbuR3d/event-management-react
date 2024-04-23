import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

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

export function useCreateEvent() {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: async (eventData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["event"]);
    },
  });
}
