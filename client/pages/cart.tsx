import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signOut, getSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { AxiosResponse, AxiosError } from 'axios'
import swal from 'sweetalert'

import { Alert, AlertIcon, Button, Container } from '@chakra-ui/react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card, { CheckoutCard } from '../components/Card'

import { addOrderAPI } from '../api'
import { loadCart, removeItemFromCart, cartEmpty } from '../helper'
import { SessionExtended, ProductCart } from '../types'
import { OrderPayload as OrderMutation } from '../api/types'

interface PageProps {
  session: SessionExtended
}

const Cart: NextPage<PageProps> = ({ session }) => {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const order_mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    OrderMutation,
    unknown
  >((formData) => addOrderAPI(session.user.id, session.token, formData))

  const [products, setProducts] = useState<Array<ProductCart>>([])

  // remove item from cart
  const handleRemoveItemFromCart = (id: string) => {
    removeItemFromCart(id)
    setProducts((products) => products.filter((prod) => prod._id !== id))
    swal('Congrats', 'Item removed from cart', 'success')
  }

  const handlePayment = async () => {
    if (!stripe || !elements) return

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) || { token: '' },
    })

    if (!error) {
      const amount = products.reduce((acc, prod) => acc + prod.price, 0)
      order_mutation.mutate({
        products,
        amount,
        transaction_id: paymentMethod.id,
      })
    } else {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const products = loadCart()
    setProducts(products)
  }, [])

  useEffect(() => {
    if (order_mutation.data?.status === 200) {
      cartEmpty()
      order_mutation.reset()
      swal('Congrats', 'Your order is placed', 'success').then(() => {
        router.push('/dashboard')
      })
    }
  }, [order_mutation])

  return (
    <>
      <Head>
        <title>Shopyle: Cart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />

        <Container maxW={'7xl'} mt="20" minH={'500px'}>
          {(!products || products.length === 0) && (
            <Alert status="info">
              <AlertIcon />
              Your cart is empty
            </Alert>
          )}
          {products &&
            products.map((product, idx) => (
              <CheckoutCard
                key={product._id + idx}
                data={product}
                removeItemFromCart={handleRemoveItemFromCart}
              />
            ))}

          {products && products.length !== 0 && (
            <Card>
              <CardElement />
              <Button
                colorScheme="green"
                mt="1"
                rounded="full"
                onClick={handlePayment}
              >
                Proceed Checkout
              </Button>
            </Card>
          )}
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
