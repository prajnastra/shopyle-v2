import type { NextComponentType, NextPageContext } from 'next'
import { SessionExtended } from '../../types'

import { ReactNode } from 'react'
import { signOut } from 'next-auth/react'
import { Container } from '@chakra-ui/react'

import Navbar from '../Navbar'
import Footer from '../Footer'

interface LoggedProps {
  children: ReactNode
  session: SessionExtended
}

const Logged: NextComponentType<NextPageContext, {}, LoggedProps> = ({
  children,
  session,
}) => {
  return (
    <>
      <Navbar signOut={signOut} session={session} />
      <Container maxW={'7xl'}>{children}</Container>
      <Footer />
    </>
  )
}

export default Logged
