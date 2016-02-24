
LogInButtons = React.createClass({
  render(){
    return (
        <div className="alt-accounts-log-in-buttons">
	<AccountStatus />
	<AccountForm showClose='true'/>
        </div>
    )
  }
})


LogInButtonsDialog = React.createClass({
  render(){
    return (
        <div className="alt-accounts-log-in-buttons-dialog">
	<AccountStatus />
	<AccountForm showClose='true'/>
        </div>
    )
  }
})

