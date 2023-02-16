import type { NextComponentType, NextPageContext } from 'next'
import { ReactElement } from 'react'
import { Text, Stack, Flex } from '@chakra-ui/react'

interface PageProps {
  title: string
  text: string
  icon: ReactElement
}

const Feature: NextComponentType<NextPageContext, {}, PageProps> = ({
  title,
  text,
  icon,
}) => {
  return (
    <>
      <Stack>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={'gray.100'}
          mb={1}
        >
          {icon}
        </Flex>
        <Text fontWeight={600}>{title}</Text>
        <Text color={'gray.600'}>{text}</Text>
      </Stack>
    </>
  )
}

export default Feature
