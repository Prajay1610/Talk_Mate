import React from 'react';
import { Box, Container,Text,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Authentication/login'
import SignUp from '../components/Authentication/SignUp'
import { useHistory } from 'react-router';
import {useEffect} from 'react';

const HomePage = () => {
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
   


  },[history]);
  return ( 
    <Container maxW='xl' centerContent>
      <Box
        d="flex"
        textAlign={'center'}
        p={1}
        bg={"white"}
        w="100%"
        m="5px 0 5px 0"
        borderRadius='xl'
        borderWidth="3px"
         borderColor={"purple.300"}
      >
        <Text
          fontSize={'3xl'}
          fontWeight={'bold'}
          fontFamily={'Work sans'}
        
        
        >Talk-Mates</Text>
      </Box>
      <Box
        
        p={2}
        bg={"white"}
        w="100%"
        borderRadius={'xl'}
       borderWidth="3px"
         borderColor={"purple.300"}

      >
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab
              w="50%"
              fontFamily={'Work sans'}
              color={"black"}
              _selected={{ color: 'white', bg: 'purple.500' }}
              fontSize={'19px'}
            >Login</Tab>
            <Tab
               w="50%"
              fontFamily={'Work sans'}
              color={"black"}
              _selected={{ color: 'white', bg: 'purple.500' }}
               fontSize={'19px'}
            >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
             <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage
