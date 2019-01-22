import firebase from 'firebase';
let config = {
  // config codes here
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true})
export default firebase;
