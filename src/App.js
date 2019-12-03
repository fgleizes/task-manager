import React, { Component } from 'react'

import './App.css'

export default class App extends Component {
  state = {
    title: 'Task Manager',
    task: "",
    tasks: []
  }
  
  handleTask = e => {
    let value = e.target.value
    this.setState({"task": value})
  }

  saveTask = () => {
    this.setState({
      "task": "",
      "tasks": [...this.state.tasks, [this.state.task, false]]
    })
  }
   
  createTask() {
    return this.state.tasks.map( (x, index)  => { 
      return (
        <li className="d-inline-flex w-100 mb-3" key={index}>
          {x[1] === true && <div className="list-group-item list-group-item-action list-group-item-success" onClick={this.validTask.bind(this, x)}>{x}</div>}
          {x[1] === false && <div className="list-group-item list-group-item-action list-group-item-light" onClick={this.validTask.bind(this, x)}>{x}</div>}
          <button className="btn btn-danger ml-2" onClick={this.deleteTask.bind(this, x)}> X </button>
        </li>
      )
    })
  }

  deleteTask(task){
    let array = this.state.tasks
    let index = array.indexOf(task)
    
    array.splice(index, 1)
    
    this.setState({"tasks": array})
  }

  validTask(task, e){
    let array = this.state.tasks
    let index = array.indexOf(task)

    if (array[index][1] === false) {
      e.target.textContent += " - Validé!"
      array[index] = [e.target.textContent, true]
    } else {
      e.target.textContent = e.target.textContent.replace(RegExp("- validé!", "i"), "")
      array[index] = [e.target.textContent, false]
    }
    
    this.setState({ "tasks": array })
  }

  handleKeyPress= e => {
    if (e.key === 'Enter') {
      this.saveTask()
    }
  }

  render() {
    return (
      <div className="task-manager container-fluid d-flex flex-column align-items-center bg-dark h-100">
        <h1 className="text-center my-5 text-light" >{ this.state.title }</h1>
        <div className="form-group d-flex flex-row w-75 my-5">
          <input type="text" placeholder="Saisissez une tâche à enregistrer..." className="form-control bg-light" value={this.state.task} onChange={(e) => this.handleTask(e)} onKeyPress={this.handleKeyPress} />
          <input type="submit" className="btn btn-outline-light ml-2" value="Enregistrer" onClick={this.saveTask}/>
        </div>
        {
          this.state.tasks.length !== 0 && <h5 className="my-5 text-light">Liste des tâches :</h5>
        }
        <ul className="list-group list-group w-75 p-0">
          {this.createTask()}
        </ul>
      </div>
    )
  }
}
