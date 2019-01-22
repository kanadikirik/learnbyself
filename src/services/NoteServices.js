import firebase from './Firebase';
const notes = firebase.firestore().collection('notes');

const getNote = async (noteID) => {
  let returnValue = false;
  await notes.doc(noteID).get()
  .then(note => returnValue = note)
  .catch(err => console.error(err));
  return returnValue;
}

const getNotesOfUser = async (userID) => {
  let returnValue = false;
  await notes.where("author","==",userID).get()
  .then(notes => returnValue = notes.docs)
  .catch(err => console.error(err))
  return returnValue;
}

const switchRemindOfNote = async (note) => {
  let returnValue = false;
  await notes.doc(note.id).update({remind: !note.data().remind})
  .then(async () => {
    let updatedNote = await getNote(note.id);
    if(updatedNote) returnValue = updatedNote;
  })
  .catch(err => console.error(err));
  return returnValue;
}

const createNote = async (note) => {
  let returnValue = false;
  await notes.add(note)
  .then(async (newNoteRef) => {
    await newNoteRef.get()
    .then(newNote => returnValue = newNote)
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
  return returnValue;
}

const deleteNote = async (note) => {
  let returnValue = true;
  await notes.doc(note.id).delete()
  .catch(err => { console.error(err); returnValue = false; })
  return returnValue;
}

export { createNote, getNotesOfUser, deleteNote, switchRemindOfNote }