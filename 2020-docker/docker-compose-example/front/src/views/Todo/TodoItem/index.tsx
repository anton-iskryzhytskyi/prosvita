import React, { useState, useEffect } from 'react'
import { Edit as EditIcon } from '@material-ui/icons'
import {
  Button,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  TextField,
  Select,
} from '@material-ui/core'
import { TodoUI, statuses } from '../shared'


const EditableTodoItem = (props: TodoUI) => {
  const [currentStatus, setNextStatus] = useState(props.status || 'new')
  const [currentTask, setNextTask] = useState(props.createForm ? 'Enter todo here' : props.task)

  const handleStatusChange: any = (event: React.ChangeEvent<{ value: string }>) => {
    setNextStatus(event.target.value);
  }

  const handleTaskChange: any = (event: React.ChangeEvent<{ value: string }>) => {
    setNextTask(event.target.value)
  }

  useEffect(() => {
    if (!props.createForm) { return }

    const keydownHandler = (event: any) => {
      if(event.keyCode===13 && event.ctrlKey) {
        props.onUpdate({ task: currentTask })
      }
    }

    document.addEventListener('keydown', keydownHandler)

    return () => {
      document.removeEventListener('keydown', keydownHandler)
    }
  })

  return (
    <ListItem>
      <div style={{ width: '100%' }}>
        <TextField
          required
          id="filled-required"
          label={props.createForm ? 'Create new todo' : 'Update todo'}
          value={currentTask}
          onChange={handleTaskChange}
          variant="outlined"
          size="small"
          fullWidth
          multiline
          helperText={'Press ctrl+Enter'}
        />
        {!props.createForm &&
        <div style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
          <Select
            value={currentStatus}
            onChange={handleStatusChange}
            style={{ width: '30%' }}
          >
            {statuses.map((status, i) => <MenuItem key={i} value={status}>{status}</MenuItem>)}
          </Select>
          <Button
            onClick={() => props.onUpdate({ task: currentTask, status: currentStatus })}
            color="primary"
            style={{ width: '30%', marginLeft: '5%' }}
          >
            Update
          </Button>
          <Button
            onClick={props.onDelete}
            color="secondary"
            style={{ width: '30%', marginLeft: '5%' }}
          >
            Delete
          </Button>
        </ div>
        }
      </ div>
    </ ListItem>
  )
}

const InformativeTodoItem = (props: TodoUI) => {
  return (
    <ListItem>
      <ListItemText
        primary={props.task}
        secondary={props.createdAt}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={props.onUpdateRequest}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const TodoItem = (props: TodoUI) => {

  if (props.editing) { return <EditableTodoItem {...props}/> }

  return <InformativeTodoItem {...props} />
}

export default TodoItem
