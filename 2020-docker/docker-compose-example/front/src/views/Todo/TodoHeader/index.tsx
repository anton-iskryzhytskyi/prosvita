import React from 'react'
import {AppBar, Typography} from '@material-ui/core'

const TodoHeader = () => {
  return (
    <AppBar position="static">
      <Typography variant="h4" component="h3" style={{ margin: 20 }}>
        Docker and TODOs
      </Typography>
    </AppBar>
  )
}

export default TodoHeader