import React from 'react';
import './App.css';
import Websocket from 'react-websocket';

export class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  // Form Code
  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    this.refWebSocket.sendMessage(this.state.message);
    this.setState({message: ''})
    event.preventDefault();
  }

  // Handle Websocket data
  handleData(data) {
    console.log(data);

    this.setState(state => {
      const messages = [...state.messages, data];
      console.log(messages)
      return {
        messages
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <Websocket url='ws://127.0.0.1:3012'
              onMessage={this.handleData.bind(this)}
              ref={Websocket => {
                this.refWebSocket = Websocket;
              }}
          />


          <ul style={{listStyleType: "none"}}>
            {
              this.state.messages.map((msg) =>
                <li key={msg}>{msg}</li>
              )
            }
          </ul>

          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Message:
              <input type="text" value={this.state.message} onChange={this.handleChange.bind(this)}/>
            </label>
            <input type="submit" value="Send!" />
          </form>
        </header>
      </div>
    )
  }
}

export default App;
