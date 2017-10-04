import config from '../config'
import * as AWS from 'aws-sdk'
import { 
  CognitoUserPool, 
  CognitoIdentityServiceProvider,
  AuthenticationDetails,
  CognitoUser
} from 'amazon-cognito-identity-js'

export function authenticateUser(Username:string,Password: string){
    
  AWS.config.region = config.region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.IdentityPoolId
  })

  const userPool = new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId,
  })

  const userData = { Username, Pool: userPool }

  const authenticationData = { Username, Password }
  
  const authenticationDetails = new AuthenticationDetails(authenticationData)

  const cognitoUser = new CognitoUser(userData)

  return new Promise((resolve,reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject
    })
  })
}

export function signOut(){

  // AWS.config.region = config.region
  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   IdentityPoolId: config.IdentityPoolId
  // })

  const userPool = new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId,
  })

  const cognitoUser = userPool.getCurrentUser()

  if (cognitoUser != null) cognitoUser.signOut() 
}

export function getUser(): CognitoUser{
  const userPool = new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId,
  })
  return userPool.getCurrentUser()
}