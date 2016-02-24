
let capitalize = (str) => {
  str = str == null? '' : String(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}


let formalName = (str) => {
  if (str === 'github')
    return 'GitHub'
  else if (str === 'meteor-developer')
    return 'Meteor'
  else
    return capitalize(str)
}


let FormOauth = React.createClass({
  propTypes: {
    service: React.PropTypes.string.isRequired,
  },

  handleLogIn(){
    if(typeof ServiceCconfiguration == 'undefined' || !!ServiceConfiguration.configurations.findOne({service: this.props.service})){
      AltAccounts.setErrorMessage('Service not configured: ' + this.props.service)
    }else{
      let service = Meteor["loginWith" + (this.props.service === 'meteor-developer' ? 'MeteorDeveloperAccount' : capitalize(this.props.service))]
      // TODO: log in with service
    }
  },

  render(){
    return (
	<div className="alt-accounts-form-oauth"><button onClick={this.handleLogIn}>{formalName(this.props.service)}</button></div>
    )
  }
})


// Default config
AltAccounts.config.formOauthComponent(FormOauth)

