import Head from 'next/head'
import { Provider as AuthProvider } from 'next-auth/client'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from '@/config/theme'
import '@/styles/styles.scss'

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
interface Props {
  Component: React.ComponentType<any>
  pageProps: React.ComponentProps<any>
}
const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        options={{
          // Client Max Age controls how often the useSession in the client should
          // contact the server to sync the session state. Value in seconds.
          // e.g.
          // * 0  - Disabled (always use cache value)
          // * 60 - Sync session state with server if it's older than 60 seconds
          clientMaxAge: 0,
          // Keep Alive tells windows / tabs that are signed in to keep sending
          // a keep alive request (which extends the current session expiry) to
          // prevent sessions in open windows from expiring. Value in seconds.
          //
          // Note: If a session has expired when keep alive is triggered, all open
          // windows / tabs will be updated to reflect the user is signed out.
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <ChakraProvider theme={Theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  )
}

export default App
