import * as React from 'react'
import {BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import {CognitoUser} from 'amazon-cognito-identity-js'
import {authenticateUser, getUser} from '../helpers/aws'
import Login from './login'
import Landing from './landing'
import * as styles from './app.css'
interface Props {}

const LandingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getUser() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default (props:Props) => {
 
  return (
    <Router>
      <div className={styles.container}>
        <Route exact path="/login" component={Login}/>
        <LandingRoute exact path="/" component={Landing}/>
      </div>
    </Router>
  )
}
