import Head from 'next/head'
import { Layout } from '@/templates/layout'
import { useSession } from 'next-auth/client'
import { SignInLink, Background } from '@/atoms'
import { Divider, Flex, Heading, Text } from '@chakra-ui/react'

const Page: React.FC = () => {
  const [session] = useSession()
  return (
    <Layout>
      <Head>
        <title>Home | NextJS Starter</title>
      </Head>
      <Flex flex={1} justify="center" alignItems="center">
        <Background borderRadius={24} padding={10} minW={350}>
          <Heading as="h2">Welcome!</Heading>
          <Divider my={2} />
          {session ? (
            <Text variant="h2">You&apos;re logged in</Text>
          ) : (
            <Text>
              <SignInLink>Sign in</SignInLink> to get started.
            </Text>
          )}
        </Background>
      </Flex>
    </Layout>
  )
}

export default Page
