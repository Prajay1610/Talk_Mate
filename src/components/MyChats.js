import React, { useState } from 'react'
import {Box, Button, Stack, useToast,Text, Avatar} from '@chakra-ui/react';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider'
import { useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './miscellaneous/GroupChatModal';

// import { useHistory } from "react-router-dom";



const MyChats = ({ fetchAgain }) =>{
  const [loggedUser, setLoggedUser] = useState();
  

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  

  const fetchChats = async () => {
   
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(user.token);

      const { data } = await axios.get("/api/chat",config);
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
    <Box
    display={{base:selectedChat ? "none":"flex",md:"flex"}}
    flexDirection="column"
    alignItems="center"
    p={3}
    bg="linear-gradient(90deg, rgba(236,95,223,0.5691526610644257) 0%, rgba(187,76,221,0.9136904761904762) 40%, rgba(0,255,235,0.8856792717086834) 89%)"
    w={{base:"100%" , md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
    <Box
    pb={3}
    px={3}
    fontSize={{base:"28px",md:"30px"}}
    fontFamily="Work sans"
    fontWeight={600}
    display="flex"
    width="100%"
    justifyContent="space-between"
    alignItems="center"
    > 
    My Chats

    <GroupChatModal>
    <Button
    display="flex"
    fontSize={{base:"17px",md:"10px",lg:"17px"}}
   
    rightIcon={<AddIcon/>}
    >New Group Chat</Button>
    </GroupChatModal>
    </Box>

    <Box
    display="flex"
    flexDirection="column"
    p={3}
    bg="#F8F8F8"
    w="100%"
    h="100%"
    borderRadius="lg"
    overflowY="hidden"
    >
    
  
    {chats?(
      <Stack overflowY="scroll">
      {chats.map((chat)=>(
        <Box
        onClick={()=>setSelectedChat(chat)}
        cursor="pointer"
        bg={selectedChat=== chat?"#38B2AC":"#E8E8E8"}
        color={selectedChat===chat?"white":"black"}
        px={3}
        py={2}
        borderRadius="lg"
        key={chat._id}

        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="3"
        >
        
        
        <Avatar name={chat.chatName} />

        <Text>
        {!chat.isGroupChat
        ?getSender(loggedUser,chat.users)
        :chat.chatName}
        </Text>
        </Box>
    ))}
      
      </Stack>
    ):(
      <ChatLoading/>
    )}
    </Box>

    </Box>

  );
};

export default MyChats;
