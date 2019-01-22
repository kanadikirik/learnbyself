import React, { Component } from 'react';
import '../static/css/App.scss';

class CreateNote extends Component {

  state = {
    content: 'Note..'
  }

  onChangeContent = (event) => {
    this.setState({ content: event.target.value })
  }
  
  render() {
    const { content } = this.state;
    return (
      <div className="new-note">
        <input type="text" placeholder={content} onChange={this.onChangeContent}/>
        <button onClick={() => this.props.createNote(content)} className="button-primary">Create</button>
      </div>
    );
  }
}

export default CreateNote;
