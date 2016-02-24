
AccountStatus = React.createClass({
  mixins: [ReactMeteorData],

  getDisplay(){
    if(Meteor.user())
      return AltConfig.createElement('statusComponents.loggedIn')
    else
      return AltConfig.createElement('statusComponents.loggedOut')
  },

  getMeteorData(){
    return {
      display: this.getDisplay()
    }
  },

  render(){
    return (
	<div className="alt-accounts-status">{this.data.display}</div>
    )
  }
})


let StatusLoggedOut = React.createClass({
  handleClick(event) {
    event.preventDefault()
    AltAccounts.currentState('logIn')
  },

  render(){
    return (
	<div> <button onClick={this.handleClick}>{AltAccounts.config.text.logInStatus}</button> </div>
    )
  }
})


let StatusLoggedIn = React.createClass({
  mixins: [ReactMeteorData],

  getUsername(){
    let user = Meteor.user()
    if(user){
      if (user.profile && user.profile.name)
        return user.profile.name
      if (user.username)
        return user.username
      if (user.emails && user.emails[0] && user.emails[0].address)
        return user.emails[0].address
    }

    return ''
  },

  handleClick(event) {
    event.preventDefault()
    Meteor.logout()
  },

  getMeteorData(){
    return {
      username: this.getUsername()
    }
  },

  render(){
    return (
	<div><span className='alt-accounts-status-username'>{this.data.username}</span> <button onClick={this.handleClick}>{AltAccounts.config.text.logOutStatus}</button> </div>
    )
  }
})


// Exported config methods
AltAccounts.config.statusLoggedInComponent = (component) => AltConfig.add('statusComponents.loggedIn', component)
AltAccounts.config.statusLoggedOutComponent = (component) => AltConfig.add('statusComponents.loggedOut', component)

// Default config
AltAccounts.config.statusLoggedInComponent(StatusLoggedIn)
AltAccounts.config.statusLoggedOutComponent(StatusLoggedOut)

