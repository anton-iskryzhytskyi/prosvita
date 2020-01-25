import React from 'react'
import TodoHeader from '../Todo/TodoHeader'
import TodoList from '../Todo/TodoList'



const App: React.FC = () => {
  return (
    <div>
      <TodoHeader/>
      <TodoList/>
    </div>
  )
}

export default App
