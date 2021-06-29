import { Response, Request, NextFunction } from 'express'
import Ajv, { Schema } from 'ajv'
import addFormats from 'ajv-formats'

export function validation (schema: Schema) {
  const ajv = new Ajv()

  addFormats(ajv)

  const validate = ajv.compile(schema)

  return (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate(req.body)

    if (!isValid && validate.errors) {
      return res.status(422).json({
        message: 'Validation failed',
        errors: validate.errors
      })
    }

    return next()
  }
}
