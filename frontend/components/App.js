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
  error: '',
  taskInput: '',
}

changeHandlerForInput = event => {
  event.preventDefault();
  const { value } = event.target
  this.setState({ ...this.state, taskInput: value})
}
resetForm = () => this.setState({ ...this.state, taskInput: '' })

setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })

postTask = () => {
  axios.post(URL, { name: this.state.taskInput })
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
}

addTaskSubmit = event => {
  event.preventDefault();
  this.postTask()
}

fetchAllTodos = () => {
  axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
}

componentDidMount() {
  this.fetchAllTodos();
}

  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(task => {
              return <div key={task.id}>{task.name} </div>
            })
          }
        </div>
        <form id='todoForm' onSubmit={this.postTask}>
          <input placeholder='Enter New Task' type='text' value={this.taskInput} onChange={this.changeHandlerForInput} />
          <button>Add Task</button>
        </form>
        <button>Hide Completed</button>
      </div>
    )
  }
}
