import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { useEffect } from 'react'
import { signOut, getSession } from 'next-auth/react'
import { useQuery, useMutation } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'

import {
  Button,
  Container,
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
} from '@chakra-ui/react'

import Card from '../../components/Card'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Loader from '../../components/Loader'

import { SessionExtended } from '../../types'
import { getAllCategoriesAPI, deleteCategoryAPI } from '../../api'

interface PageProps {
  session: SessionExtended
}

const ManageCategory: NextPage<PageProps> = ({ session }) => {
  const { isLoading, data, isFetching, refetch } = useQuery('categories', () =>
    getAllCategoriesAPI()
  )
  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    { id: string },
    unknown
  >((data) => deleteCategoryAPI(session.user.id, session.token, data.id))

  useEffect(() => {
    if (mutation.isSuccess) {
      refetch()
      mutation.reset()
    }
  }, [mutation])

  return (
    <>
      <Head>
        <title>Shopyle: Manage Category</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />

        <Container maxW={'7xl'}>
          <Center py={10}>
            <Card>
              {(isLoading || isFetching) && <Loader minH={'300px'} />}
              {!isLoading && data?.data && (
                <TableContainer>
                  <Box overflowY="auto" maxHeight="550px" minH={'400px'}>
                    <Table variant="simple">
                      <Thead position="sticky" top={0}>
                        <Tr>
                          <Th>#</Th>
                          <Th>Name</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {data?.data.map(({ _id, name }) => (
                          <Tr key={_id}>
                            <Td>{_id}</Td>
                            <Td>{name}</Td>
                            <Td>
                              <Button
                                colorScheme="red"
                                size="xs"
                                isLoading={mutation.isLoading}
                                onClick={() => {
                                  mutation.mutate({ id: _id })
                                }}
                              >
                                Delete
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>
                </TableContainer>
              )}
            </Card>
          </Center>
        </Container>
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

export default ManageCategory
