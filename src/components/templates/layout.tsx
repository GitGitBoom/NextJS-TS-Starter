import { Header, Footer } from '@/organisms'
import { Flex } from '@chakra-ui/react'

export const Layout: React.FC = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Flex as="main" direction="column" flex={1}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}
