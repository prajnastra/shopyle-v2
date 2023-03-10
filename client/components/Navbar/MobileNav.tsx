import type { NextComponentType, NextPage, NextPageContext } from 'next'
import { NavItemProps } from './types'
import { UserTypes } from '../../types'

import {
  Flex,
  Text,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { NAV_ITEMS } from './config'

import ChakraNextLink from '../ChakraNextLink'

interface MobileNavProps {
  user_type: UserTypes
}

const MobileNavItem: NextPage<NavItemProps> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <ChakraNextLink key={child.label} py={2} href={child.href || '#'}>
                {child.label}
              </ChakraNextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const MobileNav: NextComponentType<NextPageContext, {}, MobileNavProps> = ({
  user_type,
}) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS[user_type].map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

export default MobileNav
