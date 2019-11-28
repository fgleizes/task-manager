import React, { Component, Fragment } from 'react'


export default class App extends Component {
  state = {
    title: 'Task Manager',
    color: '#000',
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
      "tasks": [...this.state.tasks, this.state.task]
    })
  }
   
  createTask() {
    return this.state.tasks.map( (x, index)  => { 
      return (
      <Fragment key={index}>
        <li className="d-inline-flex w-100 mb-3">
            <div className="list-group-item list-group-item-action list-group-item-light" onClick={this.validTask.bind(this, x)}>{x}</div>
            <button className="btn btn-danger ml-2" onClick={this.deleteTask.bind(this, x)}> X </button>
        </li>
      </Fragment>)
    })
  }

  deleteTask(task){
    let array = this.state.tasks
    let index = array.indexOf(task)
    array.splice(index, 1)
    this.setState({"tasks": array})
  }

  validTask(task, e){
    // let array = this.state.tasks
    // let index = array.indexOf(task)
    // console.log(this.state.tasks)
    // console.log(index)
    // console.log(e.target)
    // console.log(array[index] + " - Validé!")
    // console.log(task)
    // // e.target.className = "list-group-item list-group-item-action list-group-item-success"
    // array[index] += " - Validé!"
    // task += " - Validé"
    // this.setState({ "tasks": array })
    
    e.target.classList.toggle('list-group-item-light')
    e.target.classList.toggle('list-group-item-success')
    RegExp("validé!", "i").test(e.target.textContent) ? e.target.textContent = e.target.textContent.replace(RegExp("- validé!", "i"), "") : e.target.textContent += " - Validé!"
  }

  handleKeyPress= e => {
    if (e.key === 'Enter') {
      this.saveTask()
    }
  }

  render() {
    return (
      <div className="container-fluid d-flex flex-column my-5 align-items-center">
        <h1 className="text-center my-5" >{ this.state.title }</h1>
        <div className="form-group d-flex flex-row w-75 my-5 ">
          <input type="text" placeholder="Saisissez une tâche à enregistrer..." className="form-control" value={this.state.task} onChange={(e) => this.handleTask(e)} onKeyPress={this.handleKeyPress} />
          <input type="submit" className="btn btn-outline-secondary ml-2" value="Enregistrer" onClick={this.saveTask}/>
        </div>
        <h5 className="my-5">Liste des tâches :</h5>
        <ul className="list-group list-group w-75 p-0">
          {this.createTask()}
        </ul>
      </div>
    )
  }
}
