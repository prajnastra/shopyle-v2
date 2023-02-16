import type { NextComponentType, NextPageContext } from 'next'

import { ReactNode } from 'react'
import { Container } from '@chakra-ui/react'

import Navbar from '../Navbar'
import Footer from '../Footer'

interface BaseProps {
  children: ReactNode
}

const Base: NextComponentType<NextPageContext, {}, BaseProps> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>{children}</Container>
      <Footer />
    </>
  )
}

export default Base
