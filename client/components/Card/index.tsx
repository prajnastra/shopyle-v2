import { ReactNode } from 'react'
import {
  Box,
  Text,
  Stack,
  HStack,
  Heading,
  useColorModeValue,
  LayoutProps,
  ComponentWithAs,
} from '@chakra-ui/react'

interface CardProps {
  children: ReactNode
  maxW?: LayoutProps['maxW']
  minH?: LayoutProps['minH']
  title?: string
  subTitle?: string
  Icon?: ComponentWithAs<'svg'>
}

const Card = ({
  children,
  maxW,
  minH = '400px',
  title,
  subTitle,
  Icon,
}: CardProps) => {
  return (
    <Box
      w={'full'}
      maxW={maxW}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
      p={6}
      minH={minH}
    >
      <Stack mb={title ? 5 : 0}>
        {title && (
          <HStack alignItems={'center'}>
            {Icon && <Icon fontSize={'1.2rem'} />}
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              textTransform={'capitalize'}
            >
              {title}
            </Heading>
          </HStack>
        )}
        {subTitle && (
          <Text fontWeight={600} color={'gray.500'} fontSize="md">
            {subTitle}
          </Text>
        )}
      </Stack>
      {children}
    </Box>
  )
}

export default Card
export { default as CheckoutCard } from './CheckoutCard'
