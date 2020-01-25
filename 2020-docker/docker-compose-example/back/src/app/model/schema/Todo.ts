import * as mongoose from 'mongoose'

export enum TodoStatus {
  new = 'new',
  progress = 'progress',
  failed = 'failed',
  done = 'done',
  stopped = 'stopped',
}

export interface TodoAttributes {
  _id: any
  task: string
  status: TodoStatus
  updatedAt: string
  createdAt: string
}

export interface Todo extends TodoAttributes, mongoose.Document {}

const schema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true, enum: ['new', 'progress', 'failed', 'done', 'stopped'] },
}, {
  collection: 'Todo',
  autoIndex: true,
  timestamps: true,
})

export const TodoModel = mongoose.model<Todo>('TodoModel', schema)
