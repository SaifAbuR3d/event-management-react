import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetReports(pageNumber, sortType) {
  const { userToken } = useContext(UserContext);
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

      return { Reports, totalPages };
    },
  });
}

export function useSetStatusSeen() {
  const { userToken } = useContext(UserContext);

  return useMutation({
    mutationFn: async (eventId) => {
      const { data } = await axios.patch(
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

export function useGetAtendeeIVRs(
  onlyAttendee,
  onlyOrganizer,
  Type,
  Status,
  pageNumber,
  sortType
) {
  const { userToken } = useContext(UserContext);

  return useQuery({
    queryKey: [
      "IVR",
      onlyAttendee,
      onlyOrganizer,
      Type,
      Status,
      sortType,
      pageNumber,
    ],
    queryFn: async () => {
      // Adjust query string as necessary
      let queryString = `${import.meta.env.VITE_API_URL}/api/iv-requests?onlyAttendees=${onlyAttendee}&onlyOrganizers=${onlyOrganizer}&pageSize=6&pageIndex=${pageNumber}&sortColumn=creationDate&sortOrder=${sortType}`;

      if (Status !== "All") {
        queryString += `&status=${Status}`;
      }

      if (Type !== "All") {
        queryString += `&documentType=${Type}`;
      }

      const { data: IVRs, headers } = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const totalPages = JSON.parse(headers["x-pagination"]).TotalPages;
      return { IVRs, totalPages };
    },
  });
}

export function useSetApprove(handleClose) {
  const { userToken } = useContext(UserContext);

  return useMutation({
    mutationFn: async (ivrId, adminMessage) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/iv-requests/${ivrId}/approve`,
        {adminMessage: adminMessage},
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
      handleClose();
    },
  });
}

export function useSetReject(handleClose) {
  const { userToken } = useContext(UserContext);

  return useMutation({
    mutationFn: async (ivrId, adminMessage) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/iv-requests/${ivrId}/reject`,
        {adminMessage: adminMessage},
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
      handleClose();
    },
  });
}