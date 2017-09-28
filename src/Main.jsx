import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from './Card.jsx';

const Main = (props) => {
  return (
    <MuiThemeProvider>
      <div>
        <Card
          handleToggle={props.handleToggle}
          name={props.name}
          message={props.message}
          active={props.active}
          handleNameChange={props.handleNameChange}
          handleMessageChange={props.handleMessageChange}
          encryptMessage={props.encryptMessage}
          handleExpirationChange={props.handleExpirationChange}
          expirationDate={props.expirationDate}
          decryptMessage={props.decryptMessage}
        />
        <div className="passphrase-container">
          <div className="your-passphrase">Your Passphrase - <a>{props.passphrase}</a></div>
          <a className="generate-passphrase" onClick={props.generatePassphrase} href="">Generate new Passphrase</a>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Main;
