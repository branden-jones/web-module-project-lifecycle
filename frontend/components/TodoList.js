import React from 'react'

export default class TodoList extends React.Component {

  render() {
    return (
      <div id='todos'>
          <h2>Todos:</h2>
          {
            this.props.todos.reduce((acc, task) => {
              if (this.props.displayCompleted || !task.completed) 
              return acc.concat(
                <div 
                  onClick={this.props.toggleCompleted(task.id)}
                  key={task.id}
                >
                  {task.name}
                  {task.completed ? ` Done!` : `` }
                </div>
              )
              return acc
            }, [])
          }
      </div>
    )
  }
}
