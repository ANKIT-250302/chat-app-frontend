import { login } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const useLogin = () => {

    
const queryClient = useQueryClient();

const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error(error.response.data.message);
    },
  });
  return {loginMutation:mutate,isPending,error}
  

}

export default useLogin
