import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetRegRequests(eventId, pageSize, statusFilter, sortModel) {
  const defaultSortConfig = { field: "creationDate", sort: "desc" };
  const sortConfig = sortModel.length > 0 ? sortModel[0] : defaultSortConfig;
  const { userToken } = useContext(UserContext);
  return useInfiniteQuery({
    queryKey: [
      "reg-requests",
      eventId,
      pageSize,
      statusFilter,
      sortConfig.field,
      sortConfig.sort,
    ],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/reg-requests`,
        {
          params: {
            pageSize: pageSize,
            pageIndex: pageParam,
            sortColumn: sortConfig.field,
            sortOrder: sortConfig.sort,
            status: statusFilter,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const pagination = JSON.parse(response.headers["x-pagination"]);
      return {
        data: [...response.data],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
        previousPage: pagination.HasPreviousPage
          ? pagination.PageIndex - 1
          : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (lastPage) => lastPage.previousPage,
  });
}

export function useAttendeeList(eventId, pageSize, verifiedFilter, sortModel) {
  const defaultSortConfig = { field: "id", sort: "asc" };
  const sortConfig = sortModel.length > 0 ? sortModel[0] : defaultSortConfig;
  const { userToken } = useContext(UserContext);
  return useInfiniteQuery({
    queryKey: [
      "AttendeeList",
      eventId,
      pageSize,
      verifiedFilter,
      sortConfig.field,
      sortConfig.sort,
    ],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendees`,
        {
          params: {
            eventId: eventId,
            pageSize: pageSize,
            pageIndex: pageParam,
            onlyVerified: verifiedFilter,
            sortColumn: sortConfig.field,
            sortOrder: sortConfig.sort,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const pagination = JSON.parse(response.headers["x-pagination"]);
      return {
        data: [...response.data],
        currentPage: pageParam,
        TotalCount: pagination.TotalCount,
        nextPage: pagination.HasNextPage ? pagination.PageIndex + 1 : null,
        previousPage: pagination.HasPreviousPage
          ? pagination.PageIndex - 1
          : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (lastPage) => lastPage.previousPage,
  });
}

export function useApproveRegReq(eventId) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: (regRequestId) =>
      axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/${eventId}/reg-requests/${regRequestId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reg-requests", eventId],
      });
    },
  });
}

export function useRejectRegReq(eventId) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: (regRequestId) =>
      axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/events/${eventId}/reg-requests/${regRequestId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reg-requests", eventId],
      });
    },
  });
}
