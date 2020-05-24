import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCcgPbAEwgwn9IaxmdtsM8ZpY1AXijPZLA",
  authDomain: "cvsh-9e4bb.firebaseapp.com",
  databaseURL: "https://cvsh-9e4bb.firebaseio.com",
  projectId: "cvsh-9e4bb",
  storageBucket: "cvsh-9e4bb.appspot.com",
  messagingSenderId: "806452930086",
  appId: "1:806452930086:web:fe83e6925b94d11f5f28e7"
}

export const getLiveBoards = async () => {
 return firestore.collection('boards')
    .where('live', '==', true)
}

export const createLiveGame = (boardData, additionalData) => {
  if (!boardData) return
  const createdAt = new Date()
  const { boardName, password, goalPoint, creatorUsername } = boardData
  firestore.collection(`boards`).add({
    boardName,
    password,
    goalPoint,
    createdAt,
    ...additionalData
  })
    .then((docRef) => {
      firestore.collection('boards').doc(docRef.id).collection('players').doc(additionalData.creator).set({
        inGame: true,
        points: 0
      })
    })
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return 

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    console.log('Nem létezetem')
    const {email, username} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        username,
        email,
        createdAt,
        wins: 0,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ' + error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export default firebase