import React, { Component } from 'react';
import Main from './Main.jsx';
import './toolbox/theme.css';
import theme from './toolbox/theme';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import axios from 'axios';
// import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.encryptMessage = this.encryptMessage.bind(this);
    this.decryptMessage = this.decryptMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleExpirationChange = this.handleExpirationChange.bind(this);
    this.generatePassphrase = this.generatePassphrase.bind(this);
    this.setPassphrase = this.setPassphrase.bind(this);

    this.state = {
      name: '',
      message: '',
      active: false,
      expirationDate: null,
      passphrase: null
    };
  }

  componentDidMount() {
    let myHash= location.hash;
    if(location.hash.length > 1) {
      this.setState({passphrase: myHash.slice(1)});
      this.setPassphrase();
    } else {
      location.hash = '#' + this.generatePassphrase();
    }

    // attempt at removing readonly attribute on datePicker input in order to change value like the rest of the inputs 
    // i've been able to change. 
    // let element = document.getElementById("mine")
    // element.removeAttribute("readonly");
    // console.log(element)
  }

  setPassphrase() {
    axios.post('http://localhost:3000/setPassphrase', {passphrase: location.hash.slice(1)})
    .then(response => {
      console.log('response for setPassphrase:', response);
    })
  }

  generatePassphrase() {
    axios.get('/newPassphrase')
      .then(response => {
        location.href = '#' + response.data;
        this.setState({passphrase: response.data})
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  handleToggle() {
    this.setState({active: !this.state.active});
  }

  handleMessageChange(newValue, event) {
    this.setState({message: newValue});
  }

  handleNameChange(newValue, event) {
    this.setState({name: newValue});
  }

  handleExpirationChange(newValue, event) {
    this.setState({expirationDate: newValue});
  }

  encryptMessage() {
    if(!this.state.message || !this.state.name || !this.state.expirationDate){ return; }
    axios.post('http://localhost:3000/encrypt', this.state)
      .then(response => {
        console.log('Response for encryptMessage:', response);
        this.setState({active: true, message: response.data});
      })
  }

  decryptMessage() {
    axios.post('http://localhost:3000/decrypt', {encryptedMsg: this.state.message})
      .then(response => {
        console.log('Response for decryptMessage:', response.data);
        let splitResponse = response.data.split(',');
        let date = splitResponse[2];
        // let formattedDate = moment(date).format("DD MMM YY").toString();
        let formattedDate = moment(date).format("ddd MMM YYYY hh:mm:ss [GMT]ZZ [PDT]");  
        let name = splitResponse[1];
        let fixedMessage = splitResponse[0];
        this.setState({name: name, message: fixedMessage, expirationDate: date});
        this.handleToggle();
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
