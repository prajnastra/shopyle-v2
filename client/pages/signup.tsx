import type { NextPage, GetServerSideProps } from 'next'

import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import { AxiosResponse, AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import swal from 'sweetalert'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import Base from '../components/Base'
import ChakraNextLink from '../components/ChakraNextLink'

import { signupAPI } from '../api'

type Inputs = {
  email: string
  name: string
  password: string
}

const Signup: NextPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    Inputs,
    unknown
  >((formData) => signupAPI(formData))

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data)
  }

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.status === 200) {
      swal(
        'Congratulations!',
        'Account created. Please click ok to signin!',
        'success'
      ).then((value) => {
        if (value) {
          Router.push('/signin')
        }
      })
    }
    if (mutation.isError) {
      swal('Oops', mutation.error.message, 'error')
      mutation.reset()
    }
  }, [mutation])

  return (
    <Base>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={10} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="name" isInvalid={errors.name ? true : false}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    isDisabled={mutation.isLoading}
                    {...register('name', {
                      required: 'Name is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={errors.email ? true : false}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    isDisabled={mutation.isLoading}
                    {...register('email', { required: 'Email is required' })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="password"
                  isInvalid={errors.password ? true : false}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      isDisabled={mutation.isLoading}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be 6 character long',
                        },
                      })}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    type="submit"
                    isLoading={mutation.isLoading}
                    colorScheme="green"
                    size="lg"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user?
                    <ChakraNextLink
                      href="/signin"
                      color="green.500"
                      marginLeft="1"
                    >
                      Sign in
                    </ChakraNextLink>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Base>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Signup
