import * as React from 'react'
import {withRouter} from 'react-router-dom'
import {signOut, getUser} from '../helpers/aws'
import config from '../config'
import * as AWS from 'aws-sdk'
import * as styles from './landing.css'

interface Props {
  history?: any
}

declare var apigClientFactory: {
  newClient(any):any
}

const Landing = (props:Props) => {
  
  
  const load = () => {
    AWS.config.region = config.region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    })

    const { accessKeyId, secretAccessKey, sessionToken} = AWS.config.credentials
    
    const apigClient = apigClientFactory.newClient({
      accessKey: accessKeyId,
      secretKey: secretAccessKey,
      sessionToken
    })
  
    apigClient.identityiamGet({},{},{})
    .then(console.log)
    .catch(console.log)

  }

  load()

  const handleSignOut = () => {
    signOut()
    props.history.push('/')
  }

  return (
    <div className={styles.container}>
      <h2>Landing page</h2>
      <button onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default withRouter(Landing)
