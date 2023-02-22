import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { signOut, getSession } from 'next-auth/react'

import { Container, SimpleGrid } from '@chakra-ui/react'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductCard from '../components/Card/ProductCard'

import { SessionExtended, ProductCart } from '../types'
import { loadCart } from '../helper'

interface PageProps {
  session: SessionExtended
}

const Cart: NextPage<PageProps> = ({ session }) => {
  const [products, setProducts] = useState<Array<ProductCart>>([])

  useEffect(() => {
    const products = loadCart()
    setProducts(products)
  }, [])

  return (
    <>
      <Head>
        <title>Shopyle: Cart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />

        <Container maxW={'7xl'} mt="20">
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 5, lg: 15 }}
          >
            {products &&
              products.map((product, idx) => (
                <ProductCard key={product._id + idx} data={product} />
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

export default Cart
