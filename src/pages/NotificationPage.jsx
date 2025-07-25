import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/api'

const NotificationPage = () => {
  const queryClient = useQueryClient()
  const {data:friendRequests, isLoading} = useQuery({
    queryKey:["friendRequests"],
    queryFn:getFriendRequests,
    
  })

  const {mutate:acceptRequestsMutation ,isPending} = useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['friendRequests']});
      queryClient.invalidateQueries({queryKey:["friends"]})
    }
      
  })
  const incomingReqs = friendRequests?.incomingReqs
  const acceptedReqs = friendRequests?.acceptedReqs
  return (
    <div>
      Notifications Page
    </div>
  )
}

export default NotificationPage
