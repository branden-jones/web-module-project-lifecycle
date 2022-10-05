import React from 'react';
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList';

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

resetForm = () => this.setState({ ...this.props.state, taskInput: '' })

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
          <TodoList 
            todos={this.state.todos}
            displayCompleted={this.state.displayCompleted}
            toggleCompleted={this.toggleCompleted}
            
          /> 
        
          <Form 
            taskInput={this.state.taskInput}
            displayCompleted={this.state.displayCompleted}
            toggleVisibleCompleted={this.toggleVisibleCompleted}
            changeHandlerForInput={this.changeHandlerForInput}
            postTask={this.postTask}
          />
        
        
      </div>
    )
  }
}
