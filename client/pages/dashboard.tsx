import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { signOut, getSession } from 'next-auth/react'

import Navbar from '../components/Navbar'

import { SessionExtended } from '../types'

interface DashboardProps {
  session: SessionExtended
}

const Dashboard: NextPage<DashboardProps> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />
        <h1>Dashboard</h1>
      </main>
    </>
  )
}

export default Dashboard

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

  return {
    props: { session },
  }
}
