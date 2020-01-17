export interface Todo {
  _id?: string
  task?: string
  status?: string
  createdAt?: string
}

export interface TodoUI extends Todo {
  editing?: boolean
  createForm?: boolean
  onUpdate: (result: Todo) => void
  onDelete?: () => void
  onUpdateRequest?: () => void
}

export const statuses = ['new', 'progress', 'failed', 'done', 'stopped']