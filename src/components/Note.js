import React, { Component } from 'react';
import '../static/css/App.scss';

// Icons
import { TiDocumentText, TiBackspace } from 'react-icons/ti'

class Note extends Component {
  
  state = {
    deleteAnimation: "",
    switchAnimation: "",
  }

  animate = (animationType) => {
    if(animationType === "deletion"){
      this.setState({ deleteAnimation: "deletion-animation" },() => {
        setTimeout(() => { this.setState({ deleteAnimation: null }) }, 1000)
      })
    } else if(animationType === "switch"){
      this.setState({ switchAnimation: "switch-animation" },() => {
        setTimeout(() => { this.setState({ switchAnimation: null }) }, 1000)
      })
    } 
  }

  deleteAndAnimate = () => {
    const deleteStatus = this.props.deleteNote(this.props.note);
    if(deleteStatus) this.animate("deletion")
  }

  switchAndAnimate = () => {
    const switchRemindStatus = this.props.switchRemind(this.props.note);
    if(switchRemindStatus) this.animate("switch")
  }

  render() {
    const { deleteAnimation, switchAnimation }  = this.state;
    const { note } = this.props;
    return (
      <div className={`note flex-between ${deleteAnimation}`}>
        <div className="flex-start">
          <button onClick={this.switchAndAnimate}>
            <TiDocumentText className={`icon-ti ${note.data().remind ? "text-primary" : null} ${switchAnimation}`} />
          </button>
          <p>{note.data().content}</p>
        </div>
        <button onClick={ this.deleteAndAnimate }>
          <TiBackspace className="icon-ti-small text-red" />
        </button>
      </div>
    );
  }
}

export default Note;
