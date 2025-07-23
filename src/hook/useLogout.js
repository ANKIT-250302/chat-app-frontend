import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logout } from '../lib/api'

const useLogout = () => {
    const queryClient = useQueryClient()
    const {mutate,isSuccess,error} = useMutation({
        mutationFn:logout,
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["authUser"]})}
    })
    return {logoutMutation:mutate,isSuccess,error}
}

export default useLogout
