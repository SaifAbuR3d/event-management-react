import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


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
        enabled: !!id,
    })
};

export function followRequest (fakeAttendee) {
  const { userToken } = useContext(UserContext);

    return useMutation({
        mutationFn: async () => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/Attendees/my/follows`,
            fakeAttendee,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          return data;
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["profileOwnerData"]);
        },
  });
}

export function unFollowRequest() {
  const { userToken } = useContext(UserContext);

  return useMutation({
    mutationFn: async (organizerId) => {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/Attendees/my/follows/${organizerId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profileOwnerData"]);
    },
  });
  
}

export function changeImageRequest(handleClose) {
  const { userToken } = useContext(UserContext);

    return useMutation({
        mutationFn: async (formData) => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/Organizers/my/profile-picture`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
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
  const { userToken } = useContext(UserContext);

    return useMutation({
        mutationFn: async (requestData) => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/Organizers/my/profile`,
            requestData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
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
  const { userToken } = useContext(UserContext);

    return useMutation({
        mutationFn: async (requestData) => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/Organizers/my/profile`,
            requestData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
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