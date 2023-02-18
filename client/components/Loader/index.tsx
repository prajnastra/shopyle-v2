import type { NextComponentType, NextPageContext } from 'next'

import { Spinner, HStack, LayoutProps } from '@chakra-ui/react'

interface LoaderProps {
  minH?: LayoutProps['minH']
}

const Loader: NextComponentType<NextPageContext, {}, LoaderProps> = ({
  minH,
}) => {
  return (
    <HStack align={'center'} justify={'center'} minH={minH}>
      <Spinner
        color="green.500"
        thickness="4px"
        emptyColor="gray.200"
        size="xl"
      />
    </HStack>
  )
}

export default Loader
