import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

/**
 * Ensure the connection to db
 */
export default async function MongooseDBMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    await mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .catch((e) => {
        console.error(e)
      })
  }

  next()
}
