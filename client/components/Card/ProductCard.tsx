import swal from 'sweetalert'

import {
  Box,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

import { Products } from '../../api/types'
import { addItemToCart } from '../../helper'

interface CardProps {
  data: Products
}

const ProductCard = ({ data }: CardProps) => {
  const addCart = () => {
    addItemToCart(data)
    swal('Congrats', 'Item added in cart', 'success')
  }

  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      m="auto"
    >
      <Image
        rounded={'lg'}
        height={230}
        width={282}
        objectFit={'contain'}
        src={data.photo}
      />

      <Stack pt={10} align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          {data.name}
        </Text>

        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {data.description}
        </Heading>

        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={800} fontSize={'xl'}>
            ${data.price}
          </Text>

          <Text textDecoration={'line-through'} color={'gray.600'}>
            ${data.price + 10}
          </Text>
        </Stack>

        <Stack direction={'row'} align={'center'}>
          <Button
            colorScheme="green"
            rounded="full"
            type="button"
            onClick={() => addCart()}
          >
            Add to cart
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ProductCard
