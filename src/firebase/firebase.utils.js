import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import { cards2 } from '../cards'

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

export const uploadCards = () => {
  const { name, white, black } = cards2
  console.log(white)
  const ref = firestore.collection('packs').add({
    white,
    black,
    name
  })
}

export const addCardsToGame = board => {
  firestore.collection('boards').doc(board).get()
    .then(packsSnapshot => {
      const { cardPacks } = packsSnapshot.data()
      const promises = []
      for (const pack in cardPacks) {
        const p = firestore.doc(`packs/${pack}`).get()
        promises.push(p)
      }
      return Promise.all(promises)
    })
    .then(packSnapshot => {
      const blackCards = []
      const whiteCards = []
      packSnapshot.forEach(packSnap => {
        const data = packSnap.data()
        for (let i = 0; i < data.black.length; i++) {
          blackCards.push(data.black[i])
        }
        for (let i = 0; i < data.white.length; i++) {
          whiteCards.push(data.white[i])
        }
      })
      shuffle(blackCards)
      shuffle(whiteCards)
      firestore.collection('boards').doc(`${board}`).update({
        blackCards: blackCards,
        whiteCards: whiteCards
      })
    })
}

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5)
}

export const createLiveGame = (boardData, cardPacks, additionalData) => {
  if (!boardData) return
  const createdAt = new Date()
  const { boardName, password, goalPoint, creatorUsername } = boardData
  let packs = cardPacks.replace(/\s*,\s*/g, ",");
  packs = packs.split(',')
  let cardPacksForDatabase = {}
  firestore.collection('packs').get().then((packSnapshot) => {
    if (!packSnapshot.empty) {
      packSnapshot.docs.map(doc => {
        if (packs.includes(doc.data().name)) {
         cardPacksForDatabase[doc.id] = true
        }
      })
    }
  }).then(() => {
    firestore.collection(`boards`).add({
      boardName,
      password,
      goalPoint,
      createdAt,
      cardPacks: cardPacksForDatabase,
      backCards: null,
      whiteCards: null,
      ...additionalData
    })
      .then((docRef) => {
        firestore.collection('boards').doc(docRef.id).collection('players').doc(additionalData.creator).set({
          inGame: true,
          points: 0
        })
        firestore.collection('users').doc(additionalData.creator).update({
          status: 'inGame',
          gameSession: docRef.id
        })
      })
  })
}

export const setUserStatus = (userId, status) => {
  const userRef = firestore.collection('users').doc(userId)
    userRef.get().then(userSnapshot => {
      if (userSnapshot.data().status !== 'inGame') {
        userRef.update({
          status: status
        })
      }
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
        status: 'login',
        gameSession: null,
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