import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useGetEventReports(pageNumber, sortType, status) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["EventReports", pageNumber, sortType, status],
    queryFn: async () => {
      let queryString = `${
        import.meta.env.VITE_API_URL
      }/api/event-reports?pageSize=6&pageIndex=${pageNumber}&sortColumn=creationDate&sortOrder=${sortType}`;

      if (status !== "All") {
        queryString += `&status=${status}`;
      }

      const { data: Reports, headers } = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const totalPages = JSON.parse(headers["x-pagination"]).TotalPages;

      return { Reports, totalPages };
    },
  });
}

export function useGetReviewReports(pageNumber, sortType, status) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["ReviewReports", pageNumber, sortType, status],
    queryFn: async () => {
      let queryString = `${
        import.meta.env.VITE_API_URL
      }/api/review-reports?pageSize=6&pageIndex=${pageNumber}&sortColumn=creationDate&sortOrder=${sortType}`;

      if (status !== "All") {
        queryString += `&status=${status}`;
      }

      const { data: Reports, headers } = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const totalPages = JSON.parse(headers["x-pagination"]).TotalPages;
      return { Reports, totalPages };
    },
  });
}

export function useDeleteReview() {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationKey: ["DeleteReview"],
    mutationFn: async (eventId, reviewId) => {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      queryClient.invalidateQueries("ReviewReports");
    },
  });
}

export function useGetAllAttendees(pageNumber, sortType, status, eventId) {
  let queryString = `${
    import.meta.env.VITE_API_URL
  }/api/Attendees?PageIndex=${pageNumber}&PageSize=6&sortColumn=creationDate&sortOrder=${sortType}`;

  if (status !== "All") {
    queryString += `&OnlyVerified=${status}`;
  }

  if (eventId != 0) {
    queryString += `&EventId=${eventId}`;
  }

  return useQuery({
    queryKey: ["Attendees", pageNumber, status, sortType, eventId],
    queryFn: async () => {
      const { data: Attendees, headers } = await axios.get(queryString);

      const totalPages = JSON.parse(headers["x-pagination"]).TotalPages;

      return { Attendees, totalPages };
    },
  });
}

export function useGetAllOrganizers(pageNumber, sortType, status) {
  const { userToken } = useContext(UserContext);

  let queryString = `${
    import.meta.env.VITE_API_URL
  }/api/Organizers?PageIndex=${pageNumber}&PageSize=6&sortColumn=creationDate&sortOrder=${sortType}`;

  if (status !== "All") {
    queryString += `&OnlyVerified=${status}`;
  }
  return useQuery({
    queryKey: ["Organizers", pageNumber, sortType, status],
    queryFn: async () => {
      const { data: Organizers, headers } = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const totalPages = JSON.parse(headers["x-pagination"]).TotalPages;

      return { Organizers, totalPages };
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
      let queryString = `${
        import.meta.env.VITE_API_URL
      }/api/iv-requests?onlyAttendees=${onlyAttendee}&onlyOrganizers=${onlyOrganizer}&pageSize=6&pageIndex=${pageNumber}&sortColumn=creationDate&sortOrder=${sortType}`;

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
        { adminMessage: adminMessage },
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
        { adminMessage: adminMessage },
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

export function useGetSpecificAttendee(userName) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["attendeeFromAdmin", userName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendees/ad/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!userName,
  });
}

export function useGetSpecificOrganizer(userName) {
  const { userToken } = useContext(UserContext);
  return useQuery({
    queryKey: ["organizerFromAdmin", userName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/organizers/ad/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!userName,
  });
}
export function useChangeAttendeeData(userName) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: async (attendeeData) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/attendees/${userName}`,
        attendeeData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["attendeeFromAdmin", userName]);
    },
  });
}

export function useChangeOrganizersData(userName) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: async (attendeeData) => {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/organizers/${userName}`,
        attendeeData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["organizerFromAdmin", userName]);
    },
  });
}

export function useSetNewPassword(userName) {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: async (newPassword) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/ad/set-password/${userName}`,
        {
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["attendeeFromAdmin", userName]);
    },
  });
}
