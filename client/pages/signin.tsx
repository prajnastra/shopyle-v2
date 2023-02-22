import type { NextPage, GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  FormErrorMessage,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import Base from '../components/Base'
import ChakraNextLink from '../components/ChakraNextLink'
import swal from 'sweetalert'

interface Inputs {
  email: string
  password: string
}

const Signin: NextPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (res?.ok) {
      router.push('/dashboard')
    }
    if (res?.error) {
      swal('Oops', "Email & Password didn't match", 'error')
    }
    return
  }

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
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
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
                <FormControl id="email" isInvalid={errors.email ? true : false}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    isDisabled={isSubmitting}
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
                  <Input
                    type="password"
                    isDisabled={isSubmitting}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be 8 character long',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox colorScheme="green" isDisabled={isSubmitting}>
                      Remember me
                    </Checkbox>
                    <ChakraNextLink href="/reset-password">
                      Forgot password?
                    </ChakraNextLink>
                  </Stack>
                  <Button
                    type="submit"
                    colorScheme="green"
                    size="lg"
                    isLoading={isSubmitting}
                  >
                    Sign in
                  </Button>
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

export default Signin
