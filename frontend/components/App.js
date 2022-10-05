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
  displayCompleted: true,
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

toggleCompleted = id => event => {
  axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(task => {
        if(task.id !== id) return task
        return res.data.data
      })})
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

toggleVisibleCompleted = () => {
  this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
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
            this.state.todos.reduce((acc, task) => {
              if (this.state.displayCompleted || !task.completed) return acc.concat(
                <div onClick={this.toggleCompleted(task.id)} key={task.id}>{task.name} {task.completed ? ` Done!` : `` }</div>
              )
              return acc
            }, [])
          }
        </div>
        <form id='todoForm' onSubmit={this.postTask}>
          <input placeholder='Enter New Task' type='text' value={this.taskInput} onChange={this.changeHandlerForInput} />
          <button>Add Task</button>
        </form>
        <button onClick={this.toggleVisibleCompleted}>{this.state.displayCompleted ? `Hide` : `Show`} Completed</button>
      </div>
    )
  }
}
