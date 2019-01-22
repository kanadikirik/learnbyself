import React, { Component } from 'react';
import '../static/css/App.scss';

//Components
import CreateNote from './CreateNote';
import Note       from './Note';
// Services
import { createNote, getNotesOfUser, deleteNote, switchRemindOfNote } from '../services/NoteServices';
// Icons
import { TiDocumentAdd, TiDelete } from 'react-icons/ti'

class Notes extends Component {

  state = {
    isLoaded: false,
    notes: [],
    isCreateNoteOpen: false,
  }

  componentDidMount = async () => {
    const notes = await getNotesOfUser(this.props.user.uid);
    notes ? await this.setState({ notes, isLoaded: true }) : alert("Error while page loading!");
  }
  
  // function for add new note to notes state
  addNote = (note) => {
    this.setState({ notes: [note, ...this.state.notes] });
  }
  // function for remove note from notes state
  removeNote = (note) => {
    const notes = [...this.state.notes];
    const index = notes.findIndex(tempNote => tempNote.id === note.id);
    notes.splice(index, 1);
    this.setState({ notes });
  }
  // function for update notes state
  updateNote = (note) => {
    let notes = [...this.state.notes];
    const index = notes.findIndex(tempNote => tempNote.id === note.id);
    notes[index] = note;
    this.setState({ notes });
  }

  handleCreateNoteOpen = () => {
    this.setState({ isCreateNoteOpen: !this.state.isCreateNoteOpen })
  }

  handleCreateNote = async (content) => {
    const newNote = {
      author  : this.props.user.uid,
      createdAt: new Date(Date.now()),
      remind: true,
      content
    }
    const createdNote = await createNote(newNote);
    this.handleCreateNoteOpen();
    createdNote ? this.addNote(createdNote) : alert("Error while creating note!");
  }

  handleDeleteNote = async (note) => {
    const deleteStatus = await deleteNote(note);
    deleteStatus ? this.removeNote(note) : alert("Error while deleting note!");
    return deleteStatus;
  }

  handleRemindOfNote = async (note) => {
    const updatedNote = await switchRemindOfNote(note);
    updatedNote ? this.updateNote(updatedNote) : alert("Error while updating note!");
    return updatedNote;
  }

  render() {
    const { isLoaded, isCreateNoteOpen, notes } = this.state;
    return (
      <section className="notes">
        <div className="notes-header">
          <div>
            <h2 className="m-0">All notes</h2>
            <p className="mt-0">If you don't want remind any note yourself, click that note's icon.</p>
          </div>
          <button onClick={this.handleCreateNoteOpen}>
            { isCreateNoteOpen 
              ? <TiDelete className="icon-ti"/>
              : <TiDocumentAdd className="icon-ti text-primary" />
            }
          </button>
        </div>
        { isCreateNoteOpen && <CreateNote createNote={this.handleCreateNote} /> }
        { isLoaded && 
            notes.map((note, index) => { return <Note key={index} note={note} deleteNote={this.handleDeleteNote} switchRemind={this.handleRemindOfNote} /> })
        }
      </section>
    );
  }
}

export default Notes;
