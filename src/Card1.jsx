import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input/Input';
import Lens from 'material-ui/svg-icons/image/lens';
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Button from 'react-toolbox/lib/button/Button';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Dialog from 'react-toolbox/lib/dialog/Dialog';


  //  state = { name: '', multiline: '', label: '', active: false};
  
    // handleChange = (name, value) => {
    //   this.setState({...this.state, [name]: value});
    // };

    // handleToggle = () => {
    //   this.setState({active: !this.state.active});
    // }


const Card1 = (props) => {
  
  const actions = [
    { label: 'Cancel', onClick: props.handleToggle },
    { label: 'Decrypt', onClick: props.handleToggle },
  ];

  return (
    <Card className="all-card" style={{ width: '500px' }}>
      <CardTitle
        title="Tovia's Enigma"
      />
      <div className="senders-name-container">
        <span className="senders-first-letter">T</span>
        <Input required className="name-input" type="text" label="Name" name="name" value={props.name} onChange={props.handleNameChange} icon={<Lens className="lens" />} />
      </div>
      <div>
        <Input type="text" multiline label="Message" required maxLength={120} value={props.multiline} onChange={props.handleMessageChange} />
      </div>
      <div>
        <DatePicker
          label="Expiration date"
          sundayFirstDayOfWeek
          required
          onChange={props.handleExpirationChange}
          value={props.expirationDate}
        />
      </div>
      <CardActions>
        <Button label="Encrypt" onClick={props.encryptMessage} />
        <Button label="Decrypt" onClick={props.handleToggle} />
      </CardActions>
      <Dialog
        actions={actions}
        active={props.active}
        onEscKeyDown={props.handleToggle}
        onOverlayClick={props.handleToggle}
        title="Decrypt/Encrypt"
      >
        <Input type="text" multiline label="Message" required value={props.multiline} onChange={props.saveMessage} />
      </Dialog>
    </Card>
  );
};

export default Card1;