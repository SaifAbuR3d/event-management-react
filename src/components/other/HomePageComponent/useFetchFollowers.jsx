import { useState, useEffect } from "react";
import { useGetNumberOfFollowers } from "../../../API/HomePageApi";

const useFetchFollowers = (events) => {
  const [followers, setFollowers] = useState({});

  useEffect(() => {
    const fetchFollowers = async () => {
      const newFollowers = {};
      for (const event of events) {
        if (!newFollowers[event.organizer.id]) {
          const numberOfFollowers = await useGetNumberOfFollowers(
            event.organizer.id
          );
          newFollowers[event.organizer.id] = numberOfFollowers;
        }
      }
      setFollowers(newFollowers);
    };

    if (events.length > 0) {
      fetchFollowers();
    }
  }, [events]);

  return followers;
};

export default useFetchFollowers;
