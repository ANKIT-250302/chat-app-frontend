import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import useAuthUser from '../hook/useAuthUser'
import { useQuery } from '@tanstack/react-query'
import ChatLoader from "../components/ChatLoader"
import { getStreamToken } from '../lib/api'
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
const STREAM_API_sk = import.meta.env.VITE_STREAM_API_sk

console.log("APIII",STREAM_API_KEY)
const ChatPage = () => {
  const {id:targetUserId} = useParams()
  const [chatClient,setChanelClient] = useState(null)
  const [channel,setChanel] = useState(null)
  const [loading,setLoading] = useState(null)
  const {authUser} = useAuthUser();

  const {data:tokenData} = useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled: !!authUser
  })

useEffect(()=>{
  const initChat = async () => {
    if(!tokenData?.token || !authUser) return;
    try {
      console.log("Initializing the Stream chat client...")
      
      const client = StreamChat.getInstance(STREAM_API_KEY)
      
      await client.connectUser({
        id:authUser._id,
        name:authUser.fullName,
        image:authUser.profilePic,
      },tokenData.token)
      
      const channelId = [authUser._id,targetUserId].sort().join("-");

      const currentChannel = client.channel("messaging",channelId,{
        members:[authUser._id, targetUserId],
      });
      
      await currentChannel.watch();

      setChanelClient(client);
      setChanel(currentChannel);

    } catch (error) {
      console.error("Error initializing chat:",error);
      
    } finally {
      setLoading(false);
    }
  };
  initChat()
},[tokenData,authUser,targetUserId])

console.log("loading",loading,"chatClient",chatClient,"channel",channel)

if(loading || !chatClient || !channel) return <ChatLoader/>

  return (
    <div className='h-[91.5vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handelVideoCall = {handelVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
