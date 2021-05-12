import { Flex, Switch, FlexProps, Text, useColorMode } from '@chakra-ui/react'

export const ColorModeSwitch: React.FC<FlexProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === 'light'

  return (
    <Flex {...props} direction="row">
      <Text variant="body1">{isLight ? 'Light' : 'Dark'} Mode</Text>
      <Switch
        ml={4}
        colorScheme="gray"
        isChecked={isLight}
        onChange={toggleColorMode}
      />
    </Flex>
  )
}
