import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import type NextAuth from 'next-auth/client'
import { NextHandler } from 'next-connect'

/**
 * The _id is added to the session user via [...nextauth] callbacks
 * Unfortunatly, [...nextauth].js cannot be changed to typescript
 * Thus the session is extended here instead of [...nextauth].js
 */
interface ExtendedSession extends NextAuth.Session {
  user: {
    _id?: string
    name?: string
    email?: string
    image?: string
  }
}

/**
 * Add the 'Session' interface to the 'Request' type
 */
declare module 'next' {
  export interface NextApiRequest {
    session?: ExtendedSession
  }
}

/**
 * - Handle authorization for a route
 * - Handle unauthorized error response
 * - Add the session to the request object
 */
export default async function UserSession(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): Promise<void> {
  const session = await getSession({ req })

  if (!session) {
    res.status(401)
    res.json({ message: 'Unauthorized' })
    return
  }

  req.session = session
  next()
}
