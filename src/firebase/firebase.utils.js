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
  firestore.collection('packs').add({
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
  const { boardName, password, goalPoint} = boardData
  let packs = cardPacks.replace(/\s*,\s*/g, ",");
  packs = packs.split(',')
  let cardPacksForDatabase = {}
  firestore.collection('packs').get().then((packSnapshot) => {
    if (!packSnapshot.empty) {
      packSnapshot.docs.map(doc => {
        if (packs.includes(doc.data().name)) {
         cardPacksForDatabase[doc.id] = true
        }
        return null
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
      playedWhiteCards: 0,
      revealedWhiteCards: 0,
      winner: '',
      whiteCardsNeed: 0,
      randomOrdeR: [],
      ...additionalData
    })
      .then((docRef) => {
        firestore.collection('boards').doc(docRef.id).collection('players').doc(additionalData.creator).set({
          inGame: true,
          points: 0,
          numberInRow: 1,
          selectedCards: [],
          cards: []
        })
        firestore.collection('users').doc(additionalData.creator).update({
          status: 'inGame',
          gameSession: docRef.id
        })
        addCardsToGame(docRef.id)
      })
  })
}

export const resetBoardDatas = (boardId) => {
  const boardRef = firestore.collection('boards').doc(boardId)
  boardRef.update({
    playedWhiteCards: 0,
    revealedWhiteCards: 0,
    status: 'inTurn'
  })
}

export const addFullHandToEveryone = (boardId) => {
  firestore.collection('boards').doc(boardId).collection('players').where('inGame', '==', true).get().then(playersSnapshot => {
    firestore.collection('boards').doc(boardId).get().then(boardSnapshot => {
      const { whiteCards } = boardSnapshot.data()
      playersSnapshot.forEach(player => {
        const { cards } = player.data()
        for (var i = cards.length; i < 10; i++) {
          const actCard = {text: whiteCards.shift(), revealed: false}
          cards.push(actCard)
        }
        // FELÜL KELL ÍRNI A USERS CARDS-OT ÉS A BOARDS WHITECARDOT
        firestore.collection('boards').doc(boardId).collection('players').doc(player.id).update({
          cards: cards
        })
        firestore.collection('boards').doc(boardId).update({
          whiteCards: whiteCards
        })
      })
    })
  })
}

export const revealBlackCard = (boardId, playersNum) => {
  const boardRef = firestore.collection('boards').doc(boardId)
  boardRef.get().then(snapshot => {
    const { blackCards } = snapshot.data()
    const revealBlackCard = blackCards.shift()
    console.log(revealBlackCard)
    boardRef.update({
      blackCards: blackCards,
      whiteCardsNeed: revealBlackCard.cards * playersNum,
      actualBlackCard: revealBlackCard
    })
  })
}

export const removeAllSelectedCards = (boardId) => {
  const playersRef = firestore.collection('boards').doc(boardId).collection('players')
  playersRef.get().then(players => {
    players.forEach(player => {
      const playerRef = firestore.collection('boards').doc(boardId).collection('players').doc(player.id)
      playerRef.update({
        selectedCards: []
      })
    })
  })
}

export const selectNextPlayer = (boardId, actualPlayer) => {
  const actualPlayerRef = firestore.collection('boards').doc(boardId).collection('players').doc(actualPlayer)
  const boardRef = firestore.collection('boards').doc(boardId)
  return actualPlayerRef.get().then( async player => {
    const playerInRow = player.data().numberInRow
    const nextPlayerRef = firestore.collection('boards').doc(boardId).collection('players').where('numberInRow', '==', playerInRow + 1)
    const nextPlayerSnapshot = await nextPlayerRef.get()
    console.log(nextPlayerSnapshot)
    if (!nextPlayerSnapshot.empty) {
      nextPlayerRef.get().then(players => {
        players.forEach(player => {
          console.log(player.data().numberInRow)
          boardRef.update({
            actualPlayer: player.id
          })
        })
      })
    } else {
      const firstPlayerInRow = firestore.collection('boards').doc(boardId).collection('players').orderBy('numberInRow', 'asc').limit(1)
      firstPlayerInRow.get().then(players => {
        players.forEach(player => {
          console.log(player.data().numberInRow)
          boardRef.update({
            actualPlayer: player.id
          })
        })
      })
    }
  })
}

export const updateBoardData = (boardId, update) => {
  firestore.collection('boards').doc(boardId).update({
    ...update
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