import { extendTheme } from '@chakra-ui/react'

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: 'var(--chakra-colors-green-500)',
      boxShadow: '0 0 0 2px var(--chakra-colors-green-500)',
    },
  },
})

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: 'var(--chakra-colors-green-500)',
      boxShadow: '0 0 0 1px var(--chakra-colors-green-500)',
    },
  },
})

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: 'var(--chakra-colors-green-500)',
      boxShadow: '0 1px 0 0 var(--chakra-colors-green-500)',
    },
  },
})

export const theme = extendTheme({
  shadows: {
    outline: '0 0 0 3px var(--chakra-colors-green-500)',
  },
  components: {
    Input: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    Select: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    Textarea: {
      variants: {
        outline: () => variantOutlined().field,
        filled: () => variantFilled().field,
        flushed: () => variantFlushed().field,
      },
    },
  },
})
