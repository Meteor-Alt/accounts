
LogInButtons = React.createClass({
  render(){
    return (
        <div className="alt-accounts-log-in-buttons">
	{Meteor.isClient ? <AccountStatus /> : ''}
	{Meteor.isClient ? <AccountForm showClose='true'/> : ''}
        </div>
    )
  }
})


LogInButtonsDialog = React.createClass({
  render(){
    return (
        <div className="alt-accounts-log-in-buttons-dialog">
	{Meteor.isClient ? <AccountStatus /> : ''}
	{Meteor.isClient ? <AccountForm showClose='true'/> : ''}
        </div>
    )
  }
})

