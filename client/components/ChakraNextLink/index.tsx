import React from 'react'
import NextLink from 'next/link'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

interface ChakraNextLinkProps extends LinkProps {
  href: string
  children: React.ReactNode
}

const ChakraNextLink = React.forwardRef<HTMLAnchorElement, ChakraNextLinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <ChakraLink ref={ref} {...props}>
          {children}
        </ChakraLink>
      </NextLink>
    )
  }
)

ChakraNextLink.displayName = 'ChakraNextLink'

export default ChakraNextLink
