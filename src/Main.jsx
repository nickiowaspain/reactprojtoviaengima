import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from './Card1.jsx';

const Main = (props) => {
  return (
    <MuiThemeProvider>
      <div>
        <Card
          handleToggle={props.handleToggle}
          name={props.name}
          handleChange={props.handleChange}
          multiline={props.multiline}
          active={props.active}
          handleNameChange={props.handleNameChange}
          handleMessageChange={props.handleMessageChange}
          encryptMessage={props.encryptMessage}
          handleExpirationChange={props.handleExpirationChange}
          expirationDate={props.expirationDate}
        />
        <div className="passphrase-container">
          <div className="your-passphrase">Your Passphrase - <a href="">{}</a></div>
          <a className="generate-passphrase" href="">Generate new Passphrase {} </a>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Main;