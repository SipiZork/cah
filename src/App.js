import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth, createUserProfileDocument, setUserStatus } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import WithSpinner from './components/with-spinner/with-spinner.component'
import Header from './components/header/header.components'
import SignInSignUp from './components/sign-in-sign-up/sign-in-sign-up.components'
import CreateRoomAndLobby from './components/create-room-and-lobby/create-room-and-lobby.component';

import './App.css';

const SignInSignUpWithSpinner = WithSpinner(SignInSignUp)
const CreateRoomAndLobbyWithSpinner = WithSpinner(CreateRoomAndLobby)

class App extends React.Component {
  state = {
    loading: true
  }
  unsubsribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser, history, location, currentUser } = this.props
    console.log(location)
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          history.push('/lobby')
          this.setState({ loading: false })
        })
      } else {
        setCurrentUser(null)
        history.push('/')
        this.setState({ loading: false })
      }
    })
    console.log(currentUser)
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  
  render() {
    const { loading } = this.state
    return (
      <div className="wrapper">
          <Header />
          <Switch>
          <Route exact path="/" render={(props) => <SignInSignUpWithSpinner isLoading={loading} {...props} />} />
          <Route exact path="/lobby" render={(props) => <CreateRoomAndLobbyWithSpinner isLoading={loading} {...props} />} />
            </Switch>
            <div onClick={() => auth.signOut()}>Kilépés</div>

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
