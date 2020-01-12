import { Request, Response } from 'express'
import { TodoAttributes, TodoModel, TodoStatus } from '../model'
import { createLogger } from '../shared'

const logger = createLogger({ name: 'handlers/categories' })

export const create = async (req: Request, res: Response, next) => {
  try {
    const todo: Partial<TodoAttributes> = { task: req.body.task, status: TodoStatus.new }

    await TodoModel.create(todo)

    res.send({})
  } catch (e) {
    logger.warn(e)

    next(e)
  }
}

export const update = async (req: Request, res: Response, next) => {
  try {
    const update = req.body

    const { id } = req.params

    await TodoModel.updateOne({ _id: id }, update).exec()

    res.send({})
  } catch (e) {
    logger.warn(e)

    next(e)
  }
}

export const remove = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params

    await TodoModel.deleteOne({ _id: id }).exec()

    res.send({})
  } catch (e) {
    logger.warn(e)

    next(e)
  }
}

export const get = async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params
    if (id) {
      res.send(await TodoModel.findById(id))

      return
    }

    res.send(await TodoModel.find({}))
  } catch (e) {
    logger.warn(e)

    next(e)
  }
}
