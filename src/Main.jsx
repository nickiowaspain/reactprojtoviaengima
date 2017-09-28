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
          <div className="your-passphrase">Your Passphrase - <a href="">{props.passphrase}</a></div>
          <div className="generate-passphrase" onClick={props.generatePassphrase} >Generate new Passphrase {} </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Main;
