import type { NextPage } from 'next'
import Head from 'next/head'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shopyle: Home</title>
        <meta name="description" content="Shopyle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Hero />
      </main>
    </>
  )
}

export default Home
