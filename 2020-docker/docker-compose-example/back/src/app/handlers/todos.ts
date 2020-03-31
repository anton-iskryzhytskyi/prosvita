import { Request, Response } from 'express'
import { TodoAttributes, TodoModel, TodoStatus } from '../model'
import { createLogger, withCatch } from '../shared'

const logger = createLogger({ name: 'handlers/categories' })

export const create = withCatch(async (req: Request, res: Response) => {
    const todo: Partial<TodoAttributes> = { task: req.body.task, status: TodoStatus.new }

    await TodoModel.create(todo)

    res.send({})
}, logger)

export const update = withCatch(async (req: Request, res: Response) => {
    const update = req.body

    const { id } = req.params

    await TodoModel.updateOne({ _id: id }, update).exec()

    res.send({})
}, logger)

export const remove = withCatch(async (req: Request, res: Response) => {
    const { id } = req.params

    await TodoModel.deleteOne({ _id: id }).exec()

    res.send({})
}, logger)

export const get = withCatch(async (req: Request, res: Response) => {
    const limit = req.query.limit ? Number(req.query.limit) : 10
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const query: any = { }

    if (req.query.name) { query.name = new RegExp(req.query.name) }

    const data = await TodoModel.find(query)
      .skip(skip)
      .limit(limit)
      .exec()

    res.send(data)
}, logger)
