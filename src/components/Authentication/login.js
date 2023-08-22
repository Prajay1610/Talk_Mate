import React,{useState} from 'react'

import {
    VStack, Box, StackDivider, FormControl,
    FormLabel, Input, InputGroup, InputRightElement, Button
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import  axios  from 'axios';
import { useHistory } from 'react-router-dom';


const Login = () => {
 
    const [show, setShow] = useState(false); 
    const [email, setEmail] = useState('');
    const toast = useToast();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    

        


    const history = useHistory();

    const handleClick = () => setShow(!show);
 
    
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: 'Please Fill All The Fields',
                
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }


         try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    
                },
            };
             const { data } = await axios.post("/api/user/login", {email, password }, config);
            
            
            

              toast({        
                title: 'Login  Successfull',
                  description: `Welcome ${email}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            setLoading(false);

            history.push('/chats');
            
        } catch(e) {
            toast({
                title: 'Error Occured',
                description: "Wrong Credentials! Please Try Again",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    };
    return (
    
        <VStack
          
        
            align='stretch'
            color='black'
        >
            
            <Box>
                <FormControl isRequired id='email'>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Enter Your Email' value={email} type="email" borderWidth={"1px"} defaultValue="Initial evalue" borderColor="purple"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box>
                <FormControl isRequired id='password'>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            value={password}
                            type={show ? "text" : "password"}
                            placeholder='Enter Your password' borderWidth={"1px"} borderColor="purple"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size='sm' onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
                        </InputRightElement>
                    </InputGroup>
                  
                </FormControl>
            </Box>
            
            <Box>
                <Button
                    colorScheme="green"
                    width="100%"
                    style={{ marginTop: 10 }}
                    fontFamily={"Work sans"}
                    fontSize="19px"
                    borderRadius={"25px"}
                    onClick={submitHandler}
                    isLoading={loading}
                    
                >
                    Login

                </Button>
            </Box>
            <Box>
                <Button
                    variant="solid"
                    colorScheme='red'
                    width="100%"
                    style={{ marginTop: 2}}
                    fontFamily={"Work sans"}
                    fontSize="19px"
                    borderRadius={"25px"}
                    onClick={() => {
                        setEmail("guest@example.com")
                        setPassword("123456")

                    }}
                >Get Guest User Credentials</Button>
            </Box>
                
            
        </VStack>
    
    );
}

export default Login;
