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
  setPreviousList,
  userToken,
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
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
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
      },
    }
  );

  const Events1 = response1.data;

  const headers1 = response1.headers;
  const headers2 = response2.headers;

  const currentEventCount = JSON.parse(headers1["x-pagination"]).TotalCount;

  const totalEventCount = JSON.parse(headers2["x-pagination"]).TotalCount;

  const currentList = isUpcoming ? upcomingList : previousList;
  const setList = isUpcoming ? setUpcomingList : setPreviousList;

  // Filter out duplicate events
  const newEvents = Events1.filter(
    (event) => !currentList.find((e) => e.id === event.id)
  );

  if (newEvents.length > 0) {
    setList([...currentList, ...newEvents]);
  }

  return { Events1, currentEventCount, totalEventCount };
};

export function useGetProfileOwnerData(userName) {
  return useQuery({
    queryKey: ["profileOwnerData", userName],
    queryFn: () => getProfileOwnersData(userName),
  });
}

export function useGetOwnerEvents(
  alignment,
  page,
  id,
  previousList,
  setPreviousList,
  upcomingList,
  setUpcomingList
) {
  const { userToken } = useContext(UserContext);

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
        setPreviousList,
        userToken
      ),
    enabled: !!id,
  });
}

export function useFollowRequest(fakeAttendee) {
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

export function useUnFollowRequest() {
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
      queryClient.invalidateQueries(["Following"]);
    },
  });
}

export function useChangeImageRequest(handleClose) {
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

export function useChangeBio(handleClose) {
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

export function useChangeLinks(handleClose) {
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

export function useIsFollowing(organizerId) {
  const { user, isAttendee } = useContext(UserContext);
  return useQuery({
    queryKey: ["isFollowing", organizerId, user?.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendees/${
          user?.id
        }/follows?organizerId=${organizerId}`
      );
      return !!data.length;
    },
    enabled: !!organizerId && isAttendee(),
  });
}
