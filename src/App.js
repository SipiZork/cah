import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors'

import WithSpinner from './components/with-spinner/with-spinner.component'
import Header from './components/header/header.components'
import SignInSignUp from './components/sign-in-sign-up/sign-in-sign-up.components'
import CreateRoomAndLobby from './components/create-room-and-lobby/create-room-and-lobby.component';
import Board from './pages/board/board.component'

import './App.css';
import ErrorMessage from './components/error/error.components';

const SignInSignUpWithSpinner = WithSpinner(SignInSignUp)
const CreateRoomAndLobbyWithSpinner = WithSpinner(CreateRoomAndLobby)
const BoardWithSpinner = WithSpinner(Board)

class App extends React.Component {
  state = {
    loading: true,
    showError: true,
    error: ''
  }
  unsubsribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser, history} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        await userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(null)
        history.push('/')
        this.setState({ loading: false })
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentUser, history } = this.props
    if (prevProps.currentUser !== currentUser && currentUser !== null) {
      if (currentUser.status === 'inGame') {
        this.setState({ loading: true }, () => {
          setTimeout(() => {
            history.push(`/board/${currentUser.gameSession}`)
            this.setState({ loading: false })
          }, 2500);
        })
      } else {
        history.push('/lobby')
        this.setState({ loading: false })
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  loadContent = () => {
    const { currentUser } = this.state
    console.log(currentUser)
  }

  toggleError = () => {
    this.setState(state => ({
      showError: !state.showError
    }))
  }

  setError = (title, message) => {
    const error = {
      title: title,
      message: message
    }
    this.setState({
      showError: true,
      error: error
    })
  }
  
  render() {
    const { loading, error, showError } = this.state
    return (
      <React.Fragment>
        {showError && error && <ErrorMessage error={error} close={this.toggleError} />}
        <div className="wrapper">
          <Switch>
            <Route exact path="/" component={Header} />
            <Route exact path="/lobby" component={Header} />
          </Switch>
            <Switch>
            <Route exact path="/" render={(props) => <SignInSignUpWithSpinner setError={this.setError} isLoading={loading} {...props} />} />
            <Route exact path="/lobby" render={(props) => <CreateRoomAndLobbyWithSpinner setError={this.setError} isLoading={loading} {...props} />} />
              <Route exact path="/board/:boardId" render={(props) => <BoardWithSpinner isLoading={loading} {...props} />} />
            </Switch>
          <div onClick={() => {
            auth.signOut()
            setCurrentUser(null)
          }}>Kilépés</div>

        </div>
      </React.Fragment>
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
