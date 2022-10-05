import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  // constructor(){
  //   super();
  //   this.state = {

  //   }
  // }
state = {
  todos: [],
}

fetchAllTodos = () => {
  axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err =>
      console.error(`NOOOO`, err)
    )
}

componentDidMount() {
  this.fetchAllTodos();
}

  render() {
    return (
      <div>
        <div id='error'>No Errors</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(task => {
              return <div key={task.id}>{task.name} </div>
            })
          }
        </div>
        <form id='todoForm'>
          <input placeholder='Enter New Task' type='text' />
          <button>Add Task</button>
        </form>
        <button>Hide Completed</button>
      </div>
    )
  }
}
