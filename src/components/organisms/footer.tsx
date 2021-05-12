import { Box, Container, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => (
  <Box as="footer" bg="gray.900" color="gray.200">
    <Container maxW="container.lg" py={2}>
      <Text textAlign="center" fontSize="xs">
        MIT License (MIT)
      </Text>
    </Container>
  </Box>
)
