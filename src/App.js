import { Component } from 'react';
import Todo from './components/todo'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Todo />
      </div>
    )
  }
}
export default App;
