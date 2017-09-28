import React, { Component } from 'react';
import Main from './Main.jsx';
// import './App.css';
import './toolbox/theme.css';
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.encryptMessage = this.encryptMessage.bind(this);
    this.decryptMessage = this.decryptMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleExpirationChange = this.handleExpirationChange.bind(this);
    this.generatePassphrase = this.generatePassphrase.bind(this);

    this.state = {
      name: '',
      message: '',
      active: false,
      expirationDate: null,
      passphrase: null
    };
  }

  componentDidMount(){
    this.generatePassphrase();
  }

  generatePassphrase() {
    axios.get('/newPassphrase')
    .then(response => {
      this.setState({passphrase: response.data})
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleToggle() {
    this.setState({active: !this.state.active});
  }
  // handleToggle = () => {
  //   this.setState({active: !this.state.active});
  // }

  handleChange(name, value) {
    // this.setState({...this.state, [name]: value});
  };
  // handleChange(e) {
  //   console.log('e', e.target.value)
  //   // console.log('value', value)
  //   // this.setState({...this.state, [name]: value});
  // };

  //  handleChange = (name, value) => {
  //     // this.setState({...this.state, [name]: value});
  //   };

    handleMessageChange(newValue, event) {
      console.log('newValue', newValue)
      this.setState({message: newValue});
    }

    handleNameChange(newValue, event) {
      console.log('newValue', newValue)
      this.setState({name: newValue});
    }

    handleExpirationChange(newValue, event) {
      console.log('newValue', newValue)
      this.setState({expirationDate: newValue});
    }

    encryptMessage() {
      console.log('check this', this.state.message)
      if(!this.state.message || !this.state.name || !this.state.expirationDate){ return; }
      axios.post('http://localhost:3000/encrypt', this.state)
      .then(response => {
        console.log('here is the response:', response);
        this.setState({active: true});
        this.setState({message: response.data});
      })
    }


    decryptMessage() {
      console.log('check this', this.state.message)
      axios.post('http://localhost:3000/decrypt', {encryptedMsg: this.state.message})
      .then(response => {
        console.log('here is the response for decrypt:', response.data);
        let splitResponse = response.data.split(' ');
        let date = splitResponse.slice(-1).join(' ');
        console.log('here da date', date)
        let name = splitResponse.slice(-2,-1).join(' ');
        console.log('here da name', name)
        let fixedMessage = splitResponse.slice(0, -3).join(' ');
      
        this.setState({name: name, message: fixedMessage, expirationDate: date})
      })
    }

  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <Main
          handleToggle={this.handleToggle}
          name={this.state.name}
          handleChange={this.handleChange}
          message={this.state.message}
          active={this.state.active}
          handleNameChange={this.handleNameChange}
          handleMessageChange={this.handleMessageChange}
          encryptMessage={this.encryptMessage}
          decryptMessage={this.decryptMessage}
          handleExpirationChange={this.handleExpirationChange}
          expirationDate={this.state.expirationDate}
          passphrase={this.state.passphrase}
          generatePassphrase={this.generatePassphrase}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
