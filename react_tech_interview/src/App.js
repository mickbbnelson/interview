import React, { useState } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Column = styled.div`
  width: 300px;
  margin: 20px;
  justify-content: center;
`

const Card = styled.div`
  width: 200px;
  outline: 5px solid purple;
`

class App extends React.Component {
  state = {
    title: '',
    description: '',
    tasks: [{id: uuid(), title: "shya", description: "right"}],
    inProgress: [],
    done: []
  }

  newTask = (e) => {
    e.preventDefault();
    this.addReadyTasks(uuid(), this.state.title, this.state.description)
  }

   showTask = (item) => {
    return (
    <Card key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <br></br>
        <button onClick={(e) => this.statusRevert(item, e)}>{'<'}</button>
        <button onClick={(e) => this.statusChange(item, e)}> {'>'}</button>
        <br></br>
        <button onClick={(e) => this.deleteTask(item, e)}>Delete</button>
      </Card>
    )
  }

  addReadyTasks = (id, title, description) => {
    this.setState({
      tasks: [...this.state.tasks, {id: id, title: title, description: description}] 
    })
  }

  deleteTask = (item) => {
    if (this.state.tasks.includes(item)) {
      this.setState({
        tasks: this.state.tasks.filter((task) => task.id !== item.id)
      })
    } else if (this.state.inProgress.includes(item)) {
      this.setState({
        inProgress: this.state.inProgress.filter((task) => task.id !== item.id)
      })
    } else {
      this.setState({
        done: this.state.done.filter((task) => task.id !== item.id)
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  statusChange = (item) => {
    if (this.state.tasks.includes(item)) {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== item.id),
      inProgress: [...this.state.inProgress, item]
    })} else {
      this.setState({
        inProgress: this.state.inProgress.filter((task) => task.id !== item.id),
        done: [...this.state.done, item]
      })
    }
  }

  statusRevert = (item) => {
    if (this.state.done.includes(item)) {
    this.setState({
      done: this.state.done.filter((task) => task.id !== item.id),
      inProgress: [...this.state.inProgress, item]
    })} else {
      this.setState({
        inProgress: this.state.inProgress.filter((task) => task.id !== item.id),
        tasks: [...this.state.tasks, item]
      })
    }
  }
  
  render() {
  return (
    <Container>
      <Column>
      <h1>KANBAN BOARD</h1>
        <form onSubmit={this.newTask}>
        <label for="title">Title:</label>
        <br></br>
        <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange}/>
        <br></br>
        <label for="description">Description:</label>
        <br></br>
        <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange}/>
        <br></br>
        <input type="submit" value="Submit" />
        </form>
      </Column>
      <Column>
        <h2>Ready</h2>
        <div>
        {this.state.tasks.map((task) => {
          return this.showTask(task)
        })}
        </div>
      </Column>
      <Column>
        <h2>In Progress</h2>
        <div>
        {this.state.inProgress.map((task) => {
          return this.showTask(task)
        })}
        </div>
      </Column>
      <Column>
      <h2>Done</h2>
        {this.state.done.map((task) => {
          return this.showTask(task)
        })}
      </Column>
    </Container>
  );
  }
}

export default App
