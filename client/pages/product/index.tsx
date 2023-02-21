import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { useEffect } from 'react'
import { signOut, getSession } from 'next-auth/react'
import { useQuery, useMutation } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'

import { Container, SimpleGrid } from '@chakra-ui/react'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Loader from '../../components/Loader'
import ProductCard from '../../components/Card/ProductCard'

import { SessionExtended } from '../../types'
import { getAllProductsAPI, deleteProductAPI } from '../../api'

interface PageProps {
  session: SessionExtended
}

const Product: NextPage<PageProps> = ({ session }) => {
  const { isLoading, data, isFetching, refetch } = useQuery('products', () =>
    getAllProductsAPI()
  )
  const mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    { id: string },
    unknown
  >((data) => deleteProductAPI(session.user.id, session.token, data.id))

  useEffect(() => {
    if (mutation.isSuccess) {
      refetch()
      mutation.reset()
    }
  }, [mutation])

  return (
    <>
      <Head>
        <title>Shopyle: Manage Product</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />

        <Container maxW={'7xl'} mt="20">
          {(isLoading || isFetching) && <Loader minH={'300px'} />}

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 5, lg: 15 }}
          >
            {data?.data &&
              data?.data.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
          </SimpleGrid>
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

  if (session.user.user_type !== 'CUSTOMER') {
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

export default Product
