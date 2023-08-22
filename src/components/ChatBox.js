import React from 'react'
import {Box} from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';
const ChatBox = () => {
  const {selectedChat} = ChatState();
  return (
    <Box
    display={{base:selectedChat?"flex":"none",md:"flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="linear-gradient(90deg, rgba(236,95,223,0.5691526610644257) 0%, rgba(187,76,221,0.9136904761904762) 40%, rgba(0,255,235,0.8856792717086834) 89%)"
    border="2px solid white"
    w={{base:"100%" , md:"68%"}}
    borderRadius="1%"
    
    
    > 
      Single Chat

    </Box>
    
  )
}

export default ChatBox
