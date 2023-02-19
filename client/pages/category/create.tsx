import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { useEffect } from 'react'
import { signOut, getSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AxiosResponse, AxiosError } from 'axios'
import swal from 'sweetalert'

import {
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ChakraNextLink from '../../components/ChakraNextLink'

import { SessionExtended } from '../../types'
import { addCategoryAPI } from '../../api'

interface PageProps {
  session: SessionExtended
}

interface Inputs {
  name: string
}

const CreateCategory: NextPage<PageProps> = ({ session }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    Inputs,
    unknown
  >((formData) => addCategoryAPI(session.user.id, session.token, formData))

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data)
    reset()
    return
  }

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.status === 200) {
      swal('Congratulations!', 'Category added...', 'success')
      mutation.reset()
    }
    if (mutation.isError) {
      swal('Oops', mutation.error.message, 'error')
      mutation.reset()
    }
  }, [mutation])

  return (
    <>
      <Head>
        <title>Shopyle: Create Category</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex minH={'80vh'} align={'center'} justify={'center'}>
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              bg={useColorModeValue('white', 'gray.700')}
              rounded={'xl'}
              boxShadow={'lg'}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Create category
              </Heading>

              <Text
                fontSize={{ base: 'sm', sm: 'md' }}
                color={useColorModeValue('gray.800', 'gray.400')}
              >
                Create categories for your products
              </Text>

              <FormControl
                id="category-name"
                isInvalid={errors.name ? true : false}
              >
                <Input
                  type="text"
                  placeholder="Category name"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('name', { required: 'Name is required' })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={2} direction={['column', 'row']}>
                <Button
                  colorScheme="green"
                  type="submit"
                  size="lg"
                  w="full"
                  isLoading={mutation.isLoading}
                >
                  Save
                </Button>

                <ChakraNextLink href="/dashboard" w="full">
                  <Button
                    colorScheme="gray"
                    type="submit"
                    size="lg"
                    w="full"
                    isDisabled={mutation.isLoading}
                  >
                    Go Back
                  </Button>
                </ChakraNextLink>
              </Stack>
            </Stack>
          </Flex>
        </form>
      </main>

      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  if (session.user.user_type !== 'ADMIN') {
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

export default CreateCategory
