import { default as axios } from 'axios'
import { Todo } from './shared'

export const getTodos = (): Promise<Todo[]> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/todos`)
    .then(res => res.data)
}

export const createTodo = (todo: Todo) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/todos`, todo)
    .then(res => res.data)
}

export const updateTodo = (todo: Todo, updates: Todo) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}/todos/${todo._id}`, updates)
    .then(res => res.data)
}

export const deleteTodo = (todo: Todo) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/todos/${todo._id}`)
    .then(res => res.data)
}


