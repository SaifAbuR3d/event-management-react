import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetReports(pageNumber, sortType){
  const {userToken} = useContext(UserContext);
    return useQuery({
        queryKey: ["Reports", pageNumber, sortType],
        queryFn: async () => {
          const { data: Reports, headers } = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/reports?pageSize=6&pageIndex=${pageNumber}&sortColumn=creationDate&sortOrder=${sortType}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          const totalPages = JSON.parse(headers["x-pagination"]).TotalPages;

          return {Reports, totalPages};
        },
    });
}

export function useSetStatusSeen() {
  const { userToken } = useContext(UserContext);

  return useMutation({
    mutationFn: async (eventId) => {
      const {data} = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/reports/${eventId}/seen`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Reports"]);
    },
});
}