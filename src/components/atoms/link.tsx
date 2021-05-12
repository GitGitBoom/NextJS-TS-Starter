import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

/**
 * Combine NextJS Link with Chakra-UI Styling Props
 */
export type LinkProps = NextLinkProps & ChakraLinkProps
export const Link: React.FC<LinkProps> = (props) => {
  const {
    href,
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    locale,
    ...ChakraProps
  } = props

  return (
    <NextLink
      href={href}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
    >
      <ChakraLink {...ChakraProps} />
    </NextLink>
  )
}
