let passwordToken = null
let tokenCallback = null


let validatePassword = (name) => {
  if(name && name.length > 5)
    return true
  
  AltAccounts.setErrorMessage('Password must be at least 6 characters long')
  return false
}


if(Meteor.isClient){
  Accounts.onResetPasswordLink((token, done) => {
    tokenCallback = done
    passwordToken = token
    SetSession('Alt-Accounts-Password-Token', 'RESET')
  })

  
  Accounts.onEmailVerificationLink((token, done) => {
    tokenCallback = done
    SetSession('Alt-Accounts-Password-Token', 'VERIFY')
    Accounts.verifyEmail(token, (err) => {
      AltAccounts.currentState('verifyDone')
      if(err){
        AltAccounts.setErrorMessage(err.reason)
      }
    })
  })
}


let FormResetPassword = React.createClass({
  handleReset(event){
    event.preventDefault()
    if(this.password && validatePassword(this.password.value))
      Accounts.resetPassword(passwordToken, this.password.value, this.response)
  },

  handleCancel(event){
    event.preventDefault()
    SetSession('Alt-Accounts-Password-Token', null)
  },

  response(err){
    if(err)
      AltAccounts.setErrorMessage(err.reason)
    else{
      if(tokenCallback)
        tokenCallback()
      tokenCallback = null
      SetSession('Alt-Accounts-Password-Token', null)
    }
  },

  render(){
    return (
      <div className="alt-accounts-form-section">
	<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.passwordField}</label> <input type="password" ref={(c) => this.password = c}/></div>
	<div className="alt-accounts-form-button"><button onClick={this.handleCancel}>Cancel</button></div>
	<div className="alt-accounts-form-button"><button onClick={this.handleReset}>Reset</button></div>
      </div>
    )
  }
})


let FormVerifyDone = React.createClass({
  mixins: [ReactMeteorData],

  handleClick(event){
    event.preventDefault()
    if(tokenCallback)
      tokenCallback()
    tokenCallback = null
    SetSession('Alt-Accounts-Password-Token', null)
  },

  getMeteorData(){
    return {showVerified: !GetSession('Alt-Accounts-Messages-Error')}
  },
  render(){
    return (
      <div className="alt-accounts-form-section">
	{ this.data.showVerified && 
          <div className="alt-accounts-form-text">Email has been verified.</div>
        }
	<div className="alt-accounts-form-button"><button onClick={this.handleClick}>{AltAccounts.config.text.okButton}</button></div>
      </div>
    )
  }
})


// Additional user states
let checkTokenState = (name) => { return GetSession('Alt-Accounts-Password-Token') && GetSession('Alt-Accounts-Password-Token') == name }

AltAccounts.addUserState('userResetPassword', 'resetPassword',  () => { return checkTokenState('RESET') })
AltAccounts.addUserState('userVerifyEmail',   'verifyingEmail', () => { return checkTokenState('VERIFY') })

// Additional states
AltAccounts.setState('resetPassword',     'userResetPassword', FormResetPassword)
AltAccounts.setState('verifyingEmail',    'userVerifyEmail',   null)
AltAccounts.setState('verifyDone',        'userVerifyEmail',   FormVerifyDone)

