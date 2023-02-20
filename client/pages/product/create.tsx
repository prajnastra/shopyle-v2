import type { NextPage, GetServerSideProps } from 'next'

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { signOut, getSession } from 'next-auth/react'
import { useQuery, useMutation } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AxiosResponse, AxiosError } from 'axios'
import swal from 'sweetalert'

import {
  Box,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  Flex,
  Heading,
  Input,
  InputRightElement,
  InputGroup,
  Stack,
  Textarea,
  Select,
  useColorModeValue,
} from '@chakra-ui/react'

import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ChakraNextLink from '../../components/ChakraNextLink'

import { SessionExtended } from '../../types'
import { addProductAPI, getAllCategoriesAPI, uploadFileAPI } from '../../api'

interface PageProps {
  session: SessionExtended
}

interface Inputs {
  name: string
  description: string
  price: number
  category: string
  stock: number
  photo: string
}

const CreateProduct: NextPage<PageProps> = ({ session }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const { isLoading, data } = useQuery('categories', () =>
    getAllCategoriesAPI()
  )

  const mutation = useMutation<
    AxiosResponse<{ message: string; url: string }>,
    AxiosError,
    Inputs,
    unknown
  >((formData) => addProductAPI(session.user.id, session.token, formData))

  const file_upload_mutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    FormData,
    unknown
  >((formData) => uploadFileAPI(formData))

  // handle file drop
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg'],
      },
    })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!fileUrl) {
      swal('Oops', 'No file url found...', 'info')
      return
    }

    const payload = {
      ...data,
      photo: fileUrl,
    }

    mutation.mutate(payload)
    reset()
    return
  }

  const handleFileUpload = () => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    file_upload_mutation.mutate(formData)
  }

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.status === 200) {
      swal('Congratulations!', 'Product added...', 'success')
      mutation.reset()
    }
    if (mutation.isError) {
      swal('Oops', mutation.error.message, 'error')
      mutation.reset()
    }
  }, [mutation])

  useEffect(() => {
    if (
      file_upload_mutation.isSuccess &&
      file_upload_mutation.data.status === 200
    ) {
      swal('Congratulations!', 'File uploaded...', 'success')
      setFileUrl(file_upload_mutation.data.data.url)
      file_upload_mutation.reset()
    }
    if (file_upload_mutation.isError) {
      swal('Oops', file_upload_mutation.error.message, 'error')
      file_upload_mutation.reset()
    }
  }, [file_upload_mutation])

  return (
    <>
      <Head>
        <title>Shopyle: Create Product</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar session={session} signOut={signOut} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex minH={'80vh'} align={'center'} justify={'center'}>
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              bg={useColorModeValue('white', 'gray.700')}
              rounded={'xl'}
              boxShadow={'lg'}
              p={6}
              my={12}
            >
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                Create product
              </Heading>

              <Text
                fontSize={{ base: 'sm', sm: 'md' }}
                color={useColorModeValue('gray.800', 'gray.400')}
              >
                Create products for listing
              </Text>

              <FormControl
                id="product-name"
                isInvalid={errors.name ? true : false}
                isDisabled={
                  isLoading ||
                  mutation.isLoading ||
                  file_upload_mutation.isLoading
                }
              >
                <Input
                  type="text"
                  placeholder="Product name"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('name', { required: 'Name is required' })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="product-description"
                isInvalid={errors.description ? true : false}
                isDisabled={
                  isLoading ||
                  mutation.isLoading ||
                  file_upload_mutation.isLoading
                }
              >
                <Textarea
                  placeholder="Product description"
                  _placeholder={{ color: 'gray.500' }}
                  {...register('description', {
                    required: 'Description is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={2} direction={['column', 'row']}>
                <FormControl
                  id="product-price"
                  isInvalid={errors.price ? true : false}
                  isDisabled={
                    isLoading ||
                    mutation.isLoading ||
                    file_upload_mutation.isLoading
                  }
                >
                  <Input
                    type="number"
                    placeholder="Product price"
                    _placeholder={{ color: 'gray.500' }}
                    {...register('price', {
                      required: 'Price is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.price && errors.price.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="product-stock"
                  isInvalid={errors.stock ? true : false}
                  isDisabled={
                    isLoading ||
                    mutation.isLoading ||
                    file_upload_mutation.isLoading
                  }
                >
                  <Input
                    type="number"
                    placeholder="Product stock"
                    _placeholder={{ color: 'gray.500' }}
                    {...register('stock', {
                      required: 'Stock is required',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.stock && errors.stock.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>

              <FormControl
                id="product-category-select"
                isInvalid={errors.category ? true : false}
                isDisabled={
                  isLoading ||
                  mutation.isLoading ||
                  file_upload_mutation.isLoading
                }
              >
                <Select
                  placeholder="Select category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                >
                  {data &&
                    data.data.map(({ _id, name }) => (
                      <option value={_id} key={_id}>
                        {name}
                      </option>
                    ))}
                </Select>
              </FormControl>

              {!acceptedFiles[0]?.name && (
                <FormControl
                  id="product-image"
                  isDisabled={
                    isLoading ||
                    mutation.isLoading ||
                    file_upload_mutation.isLoading
                  }
                >
                  <Box
                    {...getRootProps()}
                    border="1px solid"
                    borderRadius="md"
                    borderColor={useColorModeValue(
                      'gray.200',
                      'whiteAlpha.300'
                    )}
                    p="2"
                    minH="100px"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Text color="gray.500">Drop the files here ...</Text>
                    ) : (
                      <Text color="gray.500">
                        Drag file here, or click to select files
                      </Text>
                    )}
                  </Box>
                </FormControl>
              )}

              {acceptedFiles[0]?.name && (
                <FormControl
                  id="product-image-uploader"
                  isDisabled={
                    isLoading ||
                    mutation.isLoading ||
                    file_upload_mutation.isLoading
                  }
                >
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type="text"
                      value={acceptedFiles[0].name}
                      readOnly
                    />
                    <InputRightElement width="4.5rem" pr="2">
                      <Button
                        h="1.75rem"
                        size="sm"
                        isLoading={file_upload_mutation.isLoading}
                        onClick={handleFileUpload}
                      >
                        Upload
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              )}

              <Stack spacing={2} direction={['column', 'row']}>
                <Button
                  colorScheme="green"
                  type="submit"
                  size="lg"
                  w="full"
                  isLoading={mutation.isLoading}
                  isDisabled={isLoading || file_upload_mutation.isLoading}
                >
                  Save
                </Button>

                <ChakraNextLink href="/dashboard" w="full">
                  <Button
                    colorScheme="gray"
                    type="button"
                    size="lg"
                    w="full"
                    isDisabled={isLoading || file_upload_mutation.isLoading}
                  >
                    Go Back
                  </Button>
                </ChakraNextLink>
              </Stack>
            </Stack>
          </Flex>
        </form>
      </main>

      <Footer />
    </>
  )
}

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

  if (session.user.user_type !== 'ADMIN') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default CreateProduct
