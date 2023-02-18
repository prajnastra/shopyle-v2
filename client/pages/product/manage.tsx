import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { signOut, getSession } from 'next-auth/react'

import {
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

interface PageProps {
  session: SessionExtended
}

const ManageProduct: NextPage<PageProps> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Shopyle: Manage Product</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />

        <Container maxW={'7xl'}>
          <Center py={10}>
            <Card>
              {/* <Loader minH={'300px'} /> */}
              <TableContainer>
                <Box overflowY="auto" maxHeight="550px" minH={'400px'}>
                  <Table variant="simple">
                    <Thead position="sticky" top={0}>
                      <Tr>
                        <Th>#</Th>
                        <Th>Name</Th>
                        <Th>Price</Th>
                        <Th>Sold</Th>
                        <Th>Stock</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* {data?.data.map(
                        ({ name, bank_name, created_at, country }, idx) => (
                          <Tr key={idx + 'dfd' + bank_name}>
                            <Td>{moment(created_at).calendar()}</Td>
                            <Td>{bank_name}</Td>
                            <Td>{name}</Td>
                            <Td>{country}</Td>
                          </Tr>
                        )
                      )} */}
                    </Tbody>
                  </Table>
                </Box>
              </TableContainer>
              {/* {(isLoading || isFetching) && <Loader minH={'300px'} />}
            {!isLoading && data?.data && (
            )} */}
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

export default ManageProduct
