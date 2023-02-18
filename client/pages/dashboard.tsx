import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { signOut, getSession } from 'next-auth/react'

import {
  Container,
  SimpleGrid,
  Alert,
  AlertIcon,
  Text,
  IconButton,
} from '@chakra-ui/react'
import {
  SettingsIcon,
  InfoIcon,
  CalendarIcon,
  CopyIcon,
} from '@chakra-ui/icons'

import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProfileCard from '../components/ProfileCard'

import { SessionExtended } from '../types'

interface DashboardProps {
  session: SessionExtended
}

const Dashboard: NextPage<DashboardProps> = ({ session }) => {
  return (
    <>
      <Head>
        <title>Shopyle: Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />
        <Container maxW={'7xl'} py={10} px={8}>
          <ProfileCard
            name={session.user.name || ''}
            user_type={session.user.user_type}
          />

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <Card title="Settings" Icon={SettingsIcon}>
              <Alert status="info">
                <AlertIcon />
                This feature will be added soon...
              </Alert>
            </Card>

            <Card title="Profile details" Icon={InfoIcon}>
              <Text fontWeight={600} color={'gray.500'}>
                Id: {session.user.id}
                <IconButton
                  aria-label="Copy id"
                  icon={<CopyIcon />}
                  size="xs"
                  ml={2}
                  onClick={() => {
                    navigator.clipboard.writeText(session.user.email)
                  }}
                />
              </Text>

              <Text fontWeight={600} color={'gray.500'}>
                Email: {session.user.email}
                <IconButton
                  aria-label="Copy email"
                  icon={<CopyIcon />}
                  size="xs"
                  ml={2}
                  onClick={() => {
                    navigator.clipboard.writeText(session.user.email)
                  }}
                />
              </Text>
            </Card>

            <Card title="Activities" Icon={CalendarIcon}>
              <Alert status="info">
                <AlertIcon />
                This feature will be added soon...
              </Alert>
            </Card>
          </SimpleGrid>
        </Container>
      </main>

      <Footer />
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
