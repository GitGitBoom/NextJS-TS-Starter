import type { NextHandler } from 'next-connect'
import type Joi from 'joi'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface ValidatorOptions {
  body?: Joi.ObjectSchema
  query?: Joi.ObjectSchema
  headers?: Joi.ObjectSchema
  onFail?: (
    req: NextApiRequest,
    res: NextApiResponse,
    error: Joi.ValidationError
  ) => any
}

export interface ValidatorsByMethod {
  get?: ValidatorOptions
  post?: ValidatorOptions
  put?: ValidatorOptions
  patch?: ValidatorOptions
  delete?: ValidatorOptions
}

/**
 * Return a message to the user when
 * input validation fails
 */
const defaultErrorHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  error: Joi.ValidationError
) => {
  res.status(400)
  res.json({ message: error.message })
}

/**
 * Iterate over Joi validators passed to this middleware
 * return an error message to the user when one fails
 */
export default function (optionsByMethod: ValidatorsByMethod): any {
  return (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ): void => {
    const options: ValidatorOptions | void =
      optionsByMethod[req.method.toLocaleLowerCase()]
    if (options) {
      const { onFail, ...validators } = options

      // Process each of the joi validators passed for each input type
      for (const [paramType, validator] of Object.entries(validators)) {
        const { error, value } = validator.validate(req[paramType])

        // If there's an error, stop loop and return a message to the user
        if (error) {
          ;(onFail || defaultErrorHandler)(req, res, error)
          return
        }

        // Otherwise replace original value with the new validated/formatted one
        req[paramType] = value
      }
    }

    next()
  }
}
