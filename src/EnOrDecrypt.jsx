class DialogTest extends React.Component {
    // state = {
    //   active: false
    // };
  
    // handleToggle = () => {
    //   this.setState({active: !this.state.active});
    // }
  
    actions = [
      { label: "Cancel", onClick: this.handleToggle },
      { label: "Save", onClick: this.handleToggle }
    ];
  
    render () {
      return (
        <div>
          <Button label='Show my dialog' onClick={this.handleToggle} />
          <Dialog
            actions={this.actions}
            active={props.active}
            onEscKeyDown={props.handleToggle}
            onOverlayClick={props.handleToggle}
            title='My awesome dialog'
          >
            <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
          </Dialog>
        </div>
      );
    }
  }
  
  return <DialogTest />;