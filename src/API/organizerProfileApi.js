import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";

const getProfileOwnersData = async (userName) => {
    const { data: ownerData } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/Organizers/${userName}`
    );
    const { data: followers, headers: totalFollowers } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/Organizers/${ownerData.id}/followers`
    );
  
    let totalFollowersCount = JSON.parse(
      totalFollowers["x-pagination"]
    ).TotalCount;
  
    const data = { ...ownerData, followers, totalFollowersCount };
  
    return data;
};

const getOwnersEvents = async (
    alignment,
    page,
    id,
    upcomingList,
    setUpcomingList,
    previousList,
    setPreviousList
  ) => {
    const isUpcoming = alignment === "upcoming";
  
    const response1 = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/events`,
      {
        params: {
          pageIndex: page,
          pageSize: 6,
          sortColumn: "startDate",
          sortOrder: "asc",
          organizerId: id,
          upcomingEvents: isUpcoming,
          previousEvents: !isUpcoming,
        },
      }
    );
  
    const response2 = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/events`,
      {
        params: {
          pageIndex: page,
          pageSize: 6,
          sortColumn: "startDate",
          sortOrder: "asc",
          organizerId: id,
          upcomingEvents: !isUpcoming,
          previousEvents: isUpcoming,
        },
      }
    );
  
    const Events1 = response1.data;
  
    const headers1 = response1.headers;
    const headers2 = response2.headers;
  
    const currentEventCount = JSON.parse(headers1["x-pagination"]).TotalCount;
  
    const totalEventCount =
      currentEventCount + JSON.parse(headers2["x-pagination"]).TotalCount;
  
    const currentList = isUpcoming ? upcomingList : previousList;
    const setList = isUpcoming ? setUpcomingList : setPreviousList;
  
    // Filter out duplicate events
    const newEvents = Events1.filter(
      (event) => !currentList.find((e) => e.id === event.id)
    );
  
    if (newEvents.length > 0) {
      setList([...currentList, ...newEvents]);
    }
  
    return { currentEventCount, totalEventCount };
};

export function getProfileOwnerData(userName) {
  return useQuery({
    queryKey: ["profileOwnerData", userName],
    queryFn: () => getProfileOwnersData(userName),
  });
}

export function getOwnerEvents(alignment, page, id, previousList, setPreviousList, upcomingList, setUpcomingList) {
    return useQuery({
        queryKey: ["OnwerEvents", alignment, page, id],
        queryFn: () =>
          getOwnersEvents(
            alignment,
            page,
            id,
            upcomingList,
            setUpcomingList,
            previousList,
            setPreviousList
          ),
        enabled: id !== null,
    })
};

export function followRequest (fakeAttendee, setIsFollowing) {
    return useMutation({
        mutationFn: async () => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/Attendees/my/follows`,
            fakeAttendee,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InlhemVlZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InlhemVlZEBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBdHRlbmRlZSIsImV4cCI6MTcxMTQ0MTEwMCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.nK_MZlfOTw4Fyic7K414WBg02Pk5sJh4BSwzqbUl4OE`,
              },
            }
          );
          return data;
        },
        onSuccess: (data) => {
          //queryClient.invalidateQueries(["profileOwnerData"]);
          setIsFollowing(true);
        },
    });
}

export function changeImageRequest(handleClose) {
    return useMutation({
        mutationFn: async (formData) => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/Organizers/my/profile-picture`,
            formData,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW5pbmk4NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFobWFkYW5pbmk4NkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJPcmdhbml6ZXIiLCJleHAiOjE3MTE2MTQzNTQsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJ9.aTkq0A3S9X-aEziWYmNLY1TZX-MmBGbXTxSWmTeED1w`,
              },
            }
          );
          return data;
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["profileOwnerData"]);
          handleClose();
        },
    });
}

export function changeBio(handleClose) {
    return useMutation({
        mutationFn: async (requestData) => {
          const { data } = await axios.post(
            `https://localhost:8080/api/Organizers/my/profile`,
            requestData,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU2FtZWVoLUh1c3NlaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzYW1lZWhodXNzZWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik9yZ2FuaXplciIsImV4cCI6MTcxMTI0NjcyNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.W2I4dieGI87mB4q0Ep2VRrVWStiGGJU6iNybBNhavMQ`,
              },
            }
          );
          return data;
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["profileOwnerData"]);
          handleClose();
        },
    });
}

export function changeLinks(handleClose) {
    return useMutation({
        mutationFn: async (requestData) => {
          const { data } = await axios.post(
            `https://localhost:8080/api/Organizers/my/profile`,
            requestData,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU2FtZWVoLUh1c3NlaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzYW1lZWhodXNzZWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6Ik9yZ2FuaXplciIsImV4cCI6MTcxMTI0NjcyNCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0.W2I4dieGI87mB4q0Ep2VRrVWStiGGJU6iNybBNhavMQ`,
              },
            }
          );
          return data;
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["profileOwnerData"]);
          handleClose();
        },
    });
}