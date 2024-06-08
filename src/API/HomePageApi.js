import { useMutation, useQuery } from "@tanstack/react-query";
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