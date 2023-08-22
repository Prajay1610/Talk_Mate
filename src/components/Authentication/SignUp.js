import React, { useState } from 'react'
import {
    VStack, Box, StackDivider, FormControl,
    FormLabel, Input, InputGroup, InputRightElement, Button
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import  axios  from 'axios';
import { useHistory } from 'react-router-dom';




const SignUp = () => {
    const [show, setShow] = useState(false);
   
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState(false);
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    
    const [loading, setLoading] = useState(false);
    const handleClick = () => setShow(!show);
 
    const toast = useToast();
    const history = useHistory();
    



    
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmpassword) {
            toast({
                title: 'Please Fill All The Fields',
                description: "The Mandatory fields are marked by *",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
                title: 'Passwords Do not Match',
                description: "Both Passwords Must be same!",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }
        //  console.log(name, email, password, pic);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    
                },
            };
            // console.log(name, email, password, pic);
            const  {data}  = await axios.post("/api/user", {name, email,password,confirmpassword,pic,}, config);
            console.log(data);
            

              toast({
                title: 'Registration Is Successfull',
                description: "You Can Proceed To Login Page!",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
              });
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);

            history.push('/');
            
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }

    };

    const postDetails = (pics) => { 
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Please Select An Image',
                description: "Format must be jpeg or png!",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Chat_app");
            data.append("cloud_name", "dtty6bpqw");
            fetch("https://api.cloudinary.com/v1_1/dtty6bpqw/image/upload", {
                method: 'post',
                body:data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
            
            
              toast({
                title: 'Image Uploaded Successfully',
                
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "bottom"
              });
        }
        else {
             toast({
                title: 'Please Select An Image',
                description: "We've created your account for you.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
             });
            setLoading(false);
            return;
        }
    };
    return (
    
        <VStack
          
        
            align='stretch'
            color='black'
        >
            <Box>
                <FormControl isRequired id='first-name'>
                    <FormLabel>First name</FormLabel>
                    <Input  placeholder='Enter Your Name' borderWidth={"1px"} borderColor="purple"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box>
                <FormControl isRequired id='email-1'>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder='Enter Your Email' borderWidth={"1px"} borderColor="purple"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box>
                <FormControl isRequired id='password-1'>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
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
                <FormControl isRequired id='password-2'>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size ="md">
                        <Input
                            type={password ? "text" : "password"}
                            placeholder='Re-Enter Your password' borderWidth={"1px"} borderColor="purple"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size='sm' onClick={handleClick}>{show ? "Hide" : "Show"}</Button>
                        </InputRightElement>
                    </InputGroup>
                  
                </FormControl>
            </Box>
            <Box>
                <FormControl isRequired id='pic'>
                    <FormLabel>Upload your Picture</FormLabel>
                  
                    <Input
                        type="file"
                        accept="image/*"
                        p={1.5}
                      
                        onChange={(e) => postDetails(e.target.files[0])}
                    />
                     
                  
                  
                </FormControl>
            </Box>
            <Box>
                <Button
                    colorScheme="purple"
                    width="100%"
                    style={{ marginTop: 2 }}
                    fontFamily={"Work sans"}
                    fontSize="19px"
                    borderRadius={"25px"}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Sign Up

                </Button>
            </Box>
        </VStack>
    
    );
}

export default SignUp;
