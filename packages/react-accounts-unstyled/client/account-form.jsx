
AccountForm = React.createClass({
  mixins: [ReactMeteorData],

  handleClose(){
    AltAccounts.currentState(AltAccounts.getDefaultState())
  },

  getDisplay(){
    let m = Session.get('Alt-Accounts-Messages-Error')
    let c = AltAccounts.getStateComponent(AltAccounts.currentState())

    if(c || m && m.trim() != ''){
      return (
	<div className="alt-accounts-form">
		{this.getDisplayClose()}
		{this.getDisplayMessages()}
		{this.getDisplayMain()}
	</div>
      )
    }else{
      return ''
    }
  },

  getDisplayClose(){
    let canClose = _.contains(['userLoggedOut', 'userLoggingIn', 'userLoggedIn'], AltAccounts.getUserStatus())
    if(!!this.props.showClose && canClose)
      return (<a className="alt-accounts-form-close" onClick={this.handleClose}>{AltAccounts.config.text.closeLink}</a>)
    else
      return ''
  },

  getDisplayMain(){
    let c = AltAccounts.getStateComponent(AltAccounts.currentState())
    if(c)
      return React.createElement(c)
    else
      return ''
  },

  getDisplayMessages(){
    let m = Session.get('Alt-Accounts-Messages-Error')
    if(m && m.trim() != '')
      return (
		<div className="alt-accounts-messages-error">{m}</div>
      )
    else
      return ''
  },

  getMeteorData(){
    return {
      display: this.getDisplay()
    }
  },

  render(){
    return (
	<div className='alt-accounts-form-wrapper'>{this.data.display}</div>
    )
  }
})


let FormLogIn = React.createClass({
  mixins: [ReactMeteorData],

  getDisplayPassword(){
    if(AltAccounts.accountsPassword())
      return AltConfig.createElement('formComponents.password')
    else
      return ''
  },

  getDisplaySeparator(){
    if(AltAccounts.accountsPassword() && AltAccounts.oauthServices().length > 0)
      return AltAccounts.config.text.oauthPasswordSeparator
    else
      return ''
  },

  getDisplayOauth(){
    var services = AltAccounts.oauthServices()
    if(services.length > 0)
      return (
	      <div className="alt-accounts-form-oauthList">
	      {
		      AltAccounts.oauthServices().map((s, i) => {
			      return AltConfig.createElement('formComponents.oauth', {key: i, service: s})
		      })
	      }
	      </div>
      )
    else
      return ''
  },

  getMeteorData(){
    return {
      displayOauth: this.getDisplayOauth(),
      displaySeparator: this.getDisplaySeparator(),
      displayPassword: this.getDisplayPassword()
    }
  },

  render(){
    return (
	<div className="alt-accounts-login">
		{this.data.displayOauth}
		<div className='alt-accounts-login-separator'>{this.data.displaySeparator}</div>
		{this.data.displayPassword}
	</div>
    )
  }
})


AltAccounts.setState('logIn', 'userLoggedOut', FormLogIn)

// Exported config methods
AltAccounts.config.formPasswordComponent = (component) => AltConfig.add('formComponents.password', component)
AltAccounts.config.formOauthComponent = (component) => AltConfig.add('formComponents.oauth', component)

