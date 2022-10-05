import React from 'react'

export default class Form extends React.Component {


  render() {
    return (
      <>
        <form
          id='todoForm'
          onSubmit={this.props.postTask}
        >
          <input 
            placeholder='Enter New Task'
            type='text'
            value={this.props.taskInput}
            onChange={this.props.changeHandlerForInput} />
          <button>Add Task</button>
        </form>
        <button
          onClick={this.props.toggleVisibleCompleted}
        >
            {this.props.displayCompleted ? `Hide` : `Show`}
            Completed
        </button>
      </>
    )
  }
}
