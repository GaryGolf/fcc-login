import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { authenticateUser, getUser } from '../helpers/aws'
import * as styles from './login.css'
import Spinner from './spinner'


interface Props {
  location?: any
}
interface State {
  username: string
  password: string
  redirect: boolean
  loading: boolean
}

export default class Login extends React.Component <Props, State> {
  constructor(props:Props){
    super(props)
    this.state={ 
      username:'',
      password:'',
      redirect: false,
      loading: false
    }
  }

  handleFormSubmit = e =>{
    e.preventDefault()
    const {username, password} = this.state
    if(!username || !password) return

    this.setState({loading:true})
    
    authenticateUser(username, password)
      .then(result=>{
        console.log('the user authenticated')
        this.setState({
          redirect:true,
          loading:false
        })
      })
      .catch(error=>{
        console.log('the user\'s not found')
        this.setState({loading:false})
      })
  }

  handleUserNameInput = e =>{
    const username = e.target.value
    this.setState({username})
  }

  handlePasswordInput = e => {
    const password = e.target.value
    this.setState({password})
  }

  render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect, loading } = this.state
    
    if (redirect) {
      return (
        <Redirect to={from}/>
      )
    }
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleFormSubmit}>
          <h3>Login</h3>
          <div className={styles["form-group"]}>
            <label htmlFor="username">username</label>
            <input 
              id="username" 
              type="text"
              maxLength={24}
              onChange={this.handleUserNameInput}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">password</label>
            <input 
              id="password" 
              type="password"
              maxLength={24}
              onChange={this.handlePasswordInput}
            />
          </div>
          <button>Submit</button>
          {/* <input className={styles.button} type="submit"/> */}
          <Spinner visible={loading}/> 
        </form>
      </div>
    )
  }
}