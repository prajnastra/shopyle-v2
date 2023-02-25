import {
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react'

import { ProductCart } from '../../types'

interface CardProps {
  data: ProductCart
  removeItemFromCart: (id: string) => void
}

const CheckoutCard = ({ data, removeItemFromCart }: CardProps) => {
  return (
    <Stack
      p={3}
      mb={4}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      direction={['column', 'row']}
      justify="space-between"
      spacing="5"
    >
      <Stack justify={'center'} align={'center'} direction={['column', 'row']}>
        <Image
          height={100}
          width={100}
          objectFit={'contain'}
          src={data.photo}
        />

        <Stack justify={'center'} align={'center'}>
          <Text color={'gray.500'} fontSize={'lg'} textTransform={'uppercase'}>
            {data.name}
          </Text>

          <Heading fontSize={'sm'} fontFamily={'body'} fontWeight={500}>
            {data.description}
          </Heading>
        </Stack>
      </Stack>

      <Stack justify={'center'} align={'center'}>
        <Text fontWeight={800} fontSize={'xl'}>
          ${data.price}
        </Text>

        <Text textDecoration={'line-through'} color={'gray.600'}>
          ${data.price + 10}
        </Text>
      </Stack>

      <Stack justify={'center'} align={'center'}>
        <Button
          colorScheme="red"
          size="sm"
          rounded="full"
          onClick={() => {
            removeItemFromCart(data._id)
          }}
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  )
}

export default CheckoutCard
