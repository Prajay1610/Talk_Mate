import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton, Image, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

import { Button } from '@chakra-ui/button';


const ProfileModal = ({user,children}) => {

 
  
    const { isOpen, onOpen, onClose } = useDisclosure();
   
  
        return (
        <>
          {children?(
            <span onClick={onOpen} >{children}</span> ):(
            <IconButton
            display={{base:"flex"}}
            icon ={<ViewIcon/>}
            onClick={onOpen}></IconButton>
          )}

          <Modal size ="lg" isOpen={isOpen} onClose={onClose} isCentered>
           
            <ModalContent height="360px">
              <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              display="flex"
              justifyContent="center"
              py="2px"
              >{user.name}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              > 
              <Image
              
              borderRadius="25px"
              boxSize="150px"
              src={user.pic}
              alt={user.name} 
              
              
              />
              <Text
              fontFamily="Work sans"
              fontSize="20px"
              textAlign="center"
              >Email:{user.email}</Text>
              </ModalBody>

              <ModalFooter
              display="flex"
              justifyContent="center"
              >
                <Button colorScheme='blue' mr={3} onClick={onClose} my="2px">
                  Close
                </Button>
              
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
        
};

export default ProfileModal
