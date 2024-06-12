import { useState, useEffect } from "react";
import axios from "axios";

const useGetRate = async (eventId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/events/${eventId}/avg`
  );
  return data;
};

const useFetchRatings = (events) => {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      const newRatings = {};
      const promises = events.map(async (event) => {
        if (!ratings[event.id]) {
          const rating = await useGetRate(event.id);
          newRatings[event.id] = rating;
        }
      });
      await Promise.all(promises);
      setRatings((prevRatings) => ({
        ...prevRatings,
        ...newRatings,
      }));
    };

    if (events.length > 0) {
      fetchRatings();
    }
  }, [events]);

  return ratings;
};

export default useFetchRatings;
