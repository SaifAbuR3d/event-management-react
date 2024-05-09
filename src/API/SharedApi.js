import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useSendVerificationRequest() {
  const { userToken } = useContext(UserContext);
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/iv-requests`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
  });
}
