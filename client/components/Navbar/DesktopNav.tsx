import type { NextComponentType, NextPageContext } from 'next'
import { UserTypes } from '../../types'

import {
  Box,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from '@chakra-ui/react'

import ChakraNextLink from '../ChakraNextLink'
import DesktopSubNav from './DesktopSubNav'

import { NAV_ITEMS } from './config'

interface DesktopNavProps {
  user_type: UserTypes
}

const DesktopNav: NextComponentType<NextPageContext, {}, DesktopNavProps> = ({
  user_type,
}) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS[user_type].map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            {navItem.children ? (
              <PopoverTrigger>
                <ChakraNextLink
                  href={navItem.href ?? '#'}
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </ChakraNextLink>
              </PopoverTrigger>
            ) : (
              <ChakraNextLink
                href={navItem.href ?? '#'}
                p={2}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </ChakraNextLink>
            )}

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(
                    (child) =>
                      child && <DesktopSubNav key={child.label} {...child} />
                  )}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

export default DesktopNav
