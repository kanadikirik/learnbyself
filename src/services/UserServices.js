import firebase from './Firebase';
const users = firebase.firestore().collection('users');

const checkCurrentUser = (callback) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      updateLastSeen(user.uid);
      callback(user);
    } else callback(false)
  });
}

const getAllUsers = async () => {
  let returnValue = false;
  await users.get()
  .then(users => returnValue = users.docs)
  .catch(err => console.error(err))
  return returnValue;
}

const saveUserToDB = async (user, userID) => {
  let returnValue = false;
  await users.doc(userID).set(user)
  .then(() => returnValue = true)
  .catch(err => console.error(err))
  return returnValue;
}

const signIn = async () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  let returnValue = false;
  await firebase.auth().signInWithPopup(provider)
  .then(async (result) => {
    let user = result.user;
    // If user is new, we will save user to database.
    if(result.additionalUserInfo.isNewUser){
      let newUser = {
        name     : user.displayName,
        email    : user.email,
        photoURL : user.photoURL,
        userType : 1,
        uid      : user.uid,
        lastSeen : new Date(Date.now())
      }
      let saveDBStatus = await saveUserToDB(newUser, user.uid)
      returnValue = saveDBStatus ? user : false
    } else {
      let updateStatus = updateLastSeen(user.uid);
      if(updateStatus) returnValue = user;
    }
  })
  .catch(err => console.error(err));
  return returnValue;
}

const updateLastSeen = async (userID) => {
  let returnValue = true;
  await users.doc(userID).update({ lastSeen: new Date(Date.now()) })
  .catch(err => { console.error(err); returnValue = false; })
  return returnValue;
}

const signOut = async () => {
  let returnValue = false;
  await firebase.auth().signOut()
  .then(() => returnValue = true)
  .catch(err => console.error(err));
  return returnValue;
}

export { checkCurrentUser, getAllUsers, signIn, signOut }