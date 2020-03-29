import { Handler } from 'express'
import { Logger } from './logger'

export const withCatch = (handlerFn: Handler, logger: Logger): Handler => async (req, res, next) => {
  try {
    await handlerFn(req, res, next)

  } catch (e) {
    logger.warn(e)

    next(e)
  }
}
