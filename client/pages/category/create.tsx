import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { signOut, getSession } from 'next-auth/react'

import {
  Text,
  Button,
  FormControl,
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

interface PageProps {
  session: SessionExtended
}

const CreateCategory: NextPage<PageProps> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Shopyle: Create Category</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />
        <form>
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

              <FormControl id="category-name">
                <Input
                  placeholder="Category name"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                />
              </FormControl>

              <Stack spacing={2} direction={['column', 'row']}>
                <Button colorScheme="green" type="submit" size="lg" w="full">
                  Save
                </Button>

                <ChakraNextLink href="/dashboard" w="full">
                  <Button colorScheme="gray" type="submit" size="lg" w="full">
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
