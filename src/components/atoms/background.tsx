import { Box, BoxProps, useColorMode } from '@chakra-ui/react'

export interface BackgroundProps extends BoxProps {
  light?: string
  dark?: string
  lightColor?: string
  darkColor?: string
}

export const Background: React.FC<BackgroundProps> = (props) => {
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const {
    light = 'rgba(0, 0, 0, 0.1)',
    dark = 'rgba(255, 255, 255, 0.1)',
    lightColor = 'currentColor',
    darkColor = 'currentColor',
  } = props

  return (
    <Box
      bg={isLight ? light : dark}
      color={isLight ? lightColor : darkColor}
      {...props}
    />
  )
}
