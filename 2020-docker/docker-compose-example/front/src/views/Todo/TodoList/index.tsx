import React, { useState, useEffect } from 'react'
import { groupBy, map } from 'lodash'
import {
  Container,
  Divider,
  List,
  ListSubheader,
} from '@material-ui/core'
import * as api from '../api'
import { Todo, TodoUI, statuses } from '../shared'
import TodoItem from '../TodoItem'

const createForm = {
  _id: 'createForm',
  editing: true,
  createForm: true,
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const [editingTodoId, setEditingTodoId] = useState<string>()

  const fetchTodos = async () => {
    const result = await api.getTodos()
    setTodos(result)
  }

  const handleTodoCreating = async (todo: Todo) => {
    await api.createTodo(todo)
    fetchTodos()
  }

  const handleTodoDeleting =  (todo: Todo) => async () => {
    await api.deleteTodo(todo)
    fetchTodos()
  }

  const handleTodoUpdating = (todo: Todo) => async (updates: Todo) => {
    await api.updateTodo(todo, updates)
    setEditingTodoId('')
    fetchTodos()
  }

  const handleUpdateRequest = (todo: Todo) => () => {
    setEditingTodoId(todo._id)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const todoUIs: TodoUI[] = todos.map(todo => ({
    ...todo,
    editing: todo._id === editingTodoId,
    onUpdate: handleTodoUpdating(todo),
    onDelete: handleTodoDeleting(todo),
    onUpdateRequest: handleUpdateRequest(todo)
  }))

  const grouped: { [key: string]: TodoUI[] } = {
    createForm: [{ ...createForm, onUpdate: handleTodoCreating }],
    ...groupBy(todoUIs, 'status')
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: 25 }}>
      <List>
        {map(['createForm', ...statuses], (status: string, i) => (
          grouped[status] &&
          <li key={`${i}`}>
            <ul style={{ listStyleType: 'none' }}>
              {i > 0 && <Divider variant="middle" component="li" />}
              {i > 0 && <ListSubheader color="primary">{status.toUpperCase()}</ListSubheader> }
              {map(grouped[status], (todo, j) => <TodoItem key={`${i}-${j}`} {...todo}/>)}
            </ul>
          </li>
        ))}
      </List>
    </Container>
  )
}

export default TodoList