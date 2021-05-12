import { useSession } from 'next-auth/client'
import { ColorModeSwitch, SignInLink, SignOutLink } from '@/atoms'
import { Button, Container, Flex, Heading } from '@chakra-ui/react'

export const Header: React.FC = () => {
  const [session] = useSession()

  return (
    <Container as="header" maxW="container.xl">
      <Flex justify="space-between" py={2}>
        <Heading variant="h1">LOGO</Heading>

        <Flex alignItems="center">
          <ColorModeSwitch mr={10} />
          {session ? (
            <SignOutLink />
          ) : (
            <SignInLink>
              <Button variant="solid">Sign In / Sign Up</Button>
            </SignInLink>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}
