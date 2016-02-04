
let validateUserName = (name) => {
  if(name && name.length > 2)
    return true
  
  AltAccounts.setErrorMessage('User name must be at least 3 characters long')
  return false
}


let validateEmail = (name) => {
  if(name && name.length > 2){
    if(name.indexOf('@') !== -1)
      return true
    else
      AltAccounts.setErrorMessage('Invalid email address')
  }else{
    AltAccounts.setErrorMessage('Email must be at least 3 characters long')
  }

  return false
}


let validatePassword = (name) => {
  if(name && name.length > 5)
    return true
  
  AltAccounts.setErrorMessage('Password must be at least 6 characters long')
  return false
}


let FormPassword = React.createClass({
  mixins: [ReactMeteorData],

  handleLogIn(event){
    event.preventDefault()
    if(this.usernameoremail && validateUserName(this.usernameoremail.value))
      Meteor.loginWithPassword(this.usernameoremail.value, this.password.value, this.response)
    else if(this.username && validateUserName(this.username.value))
      Meteor.loginWithPassword({username: this.username.value}, this.password.value, this.response)
    else if(this.email && validateEmail(this.email.value))
      Meteor.loginWithPassword({email: this.email.value}, this.password.value, this.response)
  },

  handleCreateAccount(event){
    event.preventDefault()
    let opts = {}
    let haveError = false
    if(this.username){
      if(validateUserName(this.username.value))
        opts.username = this.username.value
      else
        haveError = true
    }

    if(this.email){
      if(validateEmail(this.email.value))
        opts.email = this.email.value
      else
        haveError = true
    }

    if(this.password && validatePassword(this.password.value))
      opts.password = this.password.value
    else
      haveError = true

    if(this.password2 && this.password.value != this.password2.value){
      AltAccounts.setErrorMessage('Passwords do not match')
      haveError = true
    }

    if(!haveError)
      Accounts.createUser(opts, this.response)
  },

  handleForgotPassword(event){
    event.preventDefault()
    if(this.email && validateEmail(this.email.value))
      Accounts.forgotPassword({email: this.email.value}, this.recoveryEmailResponse)
  },

  switchLogIn(event){
    event.preventDefault()
    AltAccounts.currentState('logIn')
  },

  switchCreateAccount(event){
    event.preventDefault()
    AltAccounts.currentState('createAccount')
  },

  switchForgot(event){
    event.preventDefault()
    AltAccounts.currentState('forgotPassword')
  },

  response(err){
    AltAccounts.setErrorMessage(err? err.reason : '')
  },

  recoveryEmailResponse(err){
    if(err)
      AltAccounts.setErrorMessage(err.reason)
    else
      AltAccounts.currentState('recoveryEmailSent')
  },

   getMeteorData(){
    let elements = {}
    let signupFields = AltAccounts.config.passwordSignupFields
    signupFields = _.contains(['USERNAME_ONLY', 'EMAIL_ONLY', 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], signupFields)? signupFields : 'EMAIL_ONLY'

    switch (AltAccounts.currentState()){
      case 'logIn':
        elements.showUsernameOrEmail = _.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], signupFields)
        elements.showUsername = _.contains(['USERNAME_ONLY'], signupFields)
        elements.showEmail = _.contains(['EMAIL_ONLY'], signupFields)
	elements.showPassword = true
        elements.showLogIn = true
        elements.showSwitchCreateAccount = !(Accounts.config && Accounts.config.forbidClientAccountCreation)
        elements.showSwitchForgotPassword = _.contains(['EMAIL_ONLY', 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], signupFields)
        break
      case 'createAccount':
        elements.showUsername = _.contains(['USERNAME_ONLY', 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], signupFields)
        elements.showEmail = _.contains(['EMAIL_ONLY', 'USERNAME_AND_EMAIL'], signupFields)
        elements.showOptionalEmail = _.contains(['USERNAME_AND_OPTIONAL_EMAIL'], signupFields)
	elements.showPassword = true
	elements.showPassword2 = _.contains(['USERNAME_ONLY'], signupFields)
	elements.showCreateAccount = true
        elements.showSwitchLogIn = true
        elements.showSwitchForgotPassword = _.contains(['EMAIL_ONLY', 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], signupFields)
        break
      case 'forgotPassword':
	elements.showEmail = true
	elements.showSendEmail = true
        elements.showSwitchLogIn = true
        elements.showSwitchCreateAccount = !(Accounts.config && Accounts.config.forbidClientAccountCreation)
        break
    }
    return elements
    
  },

  render(){
    return (
	<div className="alt-accounts-form-section">
		{ this.data.showUsernameOrEmail && 
		<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.userNameOrEmailField}</label> <input ref={(c) => this.usernameoremail = c}/></div>
		}
		{ this.data.showUsername && 
		<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.userNameField}</label> <input ref={(c) => this.username = c}/></div>
		}
		{ this.data.showEmail && 
		<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.emailField}</label> <input ref={(c) => this.email = c}/></div>
		}
		{ this.data.showOptionalEmail && 
		<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.optionalEmailField}</label> <input ref={(c) => this.email = c}/></div>
		}
		{ this.data.showPassword && 
		<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.passwordField}</label> <input type="password" ref={(c) => this.password = c}/></div>
		}
		{ this.data.showPassword2 && 
		<div className="alt-accounts-form-field"><label>{AltAccounts.config.text.passwordField2}</label> <input type="password" ref={(c) => this.password2 = c}/></div>
		}
		{ this.data.showCreateAccount && 
		<div className="alt-accounts-form-button"><button onClick={this.handleCreateAccount}>{AltAccounts.config.text.createAccountButton}</button></div>
		}
		{ this.data.showLogIn && 
		<div className="alt-accounts-form-button"><button onClick={this.handleLogIn}>{AltAccounts.config.text.logInButton}</button></div>
		}
		{ this.data.showSendEmail && 
		<div className="alt-accounts-form-button"><button onClick={this.handleForgotPassword}>{AltAccounts.config.text.sendEmailButton}</button></div>
		}
		{ this.data.showSwitchForgotPassword && 
		<div className="alt-accounts-form-link alt-accounts-form-forgot-password-link"><a onClick={this.switchForgot}>{AltAccounts.config.text.forgotPasswordLink}</a></div>
		}
		{ this.data.showSwitchLogIn && 
		<div className="alt-accounts-form-link alt-accounts-form-log-in-link"><a onClick={this.switchLogIn}>{AltAccounts.config.text.logInLink}</a></div>
		}
		{ this.data.showSwitchCreateAccount && 
		<div className="alt-accounts-form-link alt-accounts-form-create-account-link"><a onClick={this.switchCreateAccount}>{AltAccounts.config.text.createAccountLink}</a></div>
		}
	</div>
    )
  }
})


let FormRecoverySent = React.createClass({
  handleClick(event){
    event.preventDefault()
    AltAccounts.currentState('logIn')
  },
  render(){
    return (
      <div className="alt-accounts-form-section">
        <div className="alt-accounts-form-text">Recovery email has been sent.</div>
	<div className="alt-accounts-form-button"><button onClick={this.handleClick}>{AltAccounts.config.text.okButton}</button></div>
      </div>
    )
  }
})


// Additional states
AltAccounts.setState('createAccount',     'userLoggedOut',     FormPassword)
AltAccounts.setState('forgotPassword',    'userLoggedOut',     FormPassword)
AltAccounts.setState('recoveryEmailSent', 'userLoggedOut',     FormRecoverySent)

// Default config
AltAccounts.config.formPasswordComponent(FormPassword)

