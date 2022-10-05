import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {

  render() {
    return (
      <div id='todos'>
          <h2>Todos:</h2>
          {
            this.props.todos.reduce((acc, task) => {
              if (this.props.displayCompleted || !task.completed) 
              return acc.concat(
               <Todo
                toggleCompleted={this.props.toggleCompleted}
                todo={task}
                key={task.id}
               />
              )
              return acc
            }, [])
          }
      </div>
    )
  }
}
