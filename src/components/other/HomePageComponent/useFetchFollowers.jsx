import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useGetNumberOfFollowers = async (organizerId) => {
  const { headers } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/Organizers/${organizerId}/followers`
  );
  const NumberOfFollowers = JSON.parse(headers["x-pagination"]).TotalCount;
  return NumberOfFollowers;
};

const useFetchFollowers = (events) => {
  const [followers, setFollowers] = useState({});
  const followersRef = useRef({});

  useEffect(() => {
    const fetchFollowers = async () => {
      if (events.length === 0) return;
      const newFollowers = {};
      const promises = events.map(async (event) => {
        if (!followersRef.current[event.organizer.id]) {
          const numberOfFollowers = await useGetNumberOfFollowers(event.organizer.id);
          newFollowers[event.organizer.id] = numberOfFollowers;
          followersRef.current[event.organizer.id] = numberOfFollowers;
        } else {
          newFollowers[event.organizer.id] = followersRef.current[event.organizer.id];
        }
      });

      await Promise.all(promises);

      setFollowers((prevFollowers) => ({
        ...prevFollowers,
        ...newFollowers,
      }));
    };

    fetchFollowers();
  }, [events]);

  return followers;
};

export default useFetchFollowers;
