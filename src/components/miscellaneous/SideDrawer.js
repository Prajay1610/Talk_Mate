import React,{useContext, useState} from 'react';
import { useHistory } from "react-router-dom";
import  axios  from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../User Avatar/UserListItem';
// import ChatProvider from "../../Context/ChatProvider";
import { ChatState } from '../../Context/ChatProvider';
import { Box, Button,Tooltip,Text} from '@chakra-ui/react';

import { Spinner } from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input
} from '@chakra-ui/react'



import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'; 
import ProfileModal from './ProfileModal';
import { useToast } from '@chakra-ui/react';



function SideDrawer(){
  const [search,setSearch]=useState("")
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading]=useState(false)
  const [loadingChat,setLoadingChat] = useState(false);

  
  const {user,setSelectedChat,chats,setChats} = ChatState();
  const toast = useToast();
  
  // logout functionality--------
  const history =useHistory();



  


  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
 

  const handleSearch= async() =>{
    if(!search){
      toast({
        title: 'Please Enter Something in search',
        
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: "top-left"
    });
    return;
    }
    try {
      setLoading(true)
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        }
      };

      const {data} = await axios.get(`/api/user?search=${search}`,config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occured',
        description:'Failed To Find User!',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: "bottom-left"
    });
    }
  };

  const accessChat = async(userId)=>{
    console.log(userId);
    try {
      setLoadingChat(true);


      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`,
        },
      };

     const {data} = await axios.post("/api/chat",{userId},config);
     

     if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats]);

     setSelectedChat(data);
     setLoading(false);
     onClose();

    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description:error.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
    });
    }
  }

  return (
    <>
    <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    fontWeight="900"
    bg="#8F63B0"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    
    
    >
    <Tooltip label ='Search User To Chat'
     hasArrow
     placement='bottom-end'
     >
     <Button variant='ghost'  onClick={onOpen}><i className="fa fa-search" aria-hidden="true"></i>
     <Text display={{ base:"none", md:"flex"}} px ='4'>Search User</Text>
     
     </Button>
     
     </Tooltip>
     <Text fontSize='3xl' fontFamily="Work sans" fontWeight="600">Talk-Mates</Text>
     <div>
     <Menu>
          <MenuButton p={1}>
            <BellIcon boxSize={6}/>
          </MenuButton>
          { /*<MenuList></MenuList>*/}
          
    </Menu>
   
    <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon boxSize={6}/>}>
        <Avatar size = "sm" cursor="pointer" name={user.name} src={user.pic}/>
        </MenuButton>
        <MenuList mt='2'>
          <ProfileModal user ={user}>
          <MenuItem>My Profile</MenuItem>
          </ProfileModal>
         
          <MenuDivider/>
          <MenuItem
          onClick={logoutHandler}
          
          >Logout</MenuItem>
        </MenuList>
        
    </Menu>

     </div>    
     </Box>

     <Drawer
     isOpen={isOpen}
     placement='left'
     onClose={onClose}
     
     
     
   >
     <DrawerOverlay />
     <DrawerContent
     borderRadius="1%"
     >
       <DrawerCloseButton />
       <DrawerHeader
       textAlign="center"
       bg="rgb(13,235,227)"
       fontFamily="Work Sans"
       fontSize="25px"
       >Search Users</DrawerHeader>

       <DrawerBody
       
       border="2px solid white"
       
       >
       <Box
       display="flex"
       pb={2}
       
       >
         <Input 
         placeholder='Search by name or email'
         mr={2}
         fontSize="15px"
         color="rgb(13,235,227)"
         
         value={search}
         onChange={(e=>setSearch(e.target.value))}
         
         />
         <Button variant='outline' mr={3}
          onClick={handleSearch}
          >
         Go
       </Button>
       </Box>
       {loading ?(
        <ChatLoading/>
       ):(
        searchResult?.map((user)=>(
          <UserListItem
          key={user._id}
          user={user}
          handleFunction={()=>accessChat(user._id)}
          
          />
       ))
      
  )}

  {loadingChat && <Spinner ml ="auto" display="flex"/>}

       </DrawerBody>

       
     </DrawerContent>
   </Drawer>

     </>
     
  )
}

export default SideDrawer
