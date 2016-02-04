
# React Accounts

Flexible and customizable Meteor Accounts package using React.  Package provides unstyled react components for signing in, signing up, forgot password, and validate email.  Individual components can be easily replaced for advanced customizing.

See alt:react-accounts-ui for complete turnkey styled package

# Usage

AccountStatus is the react component for displaying the signup button and the uername/logout button.

```
ReactDom.render(<AccountStatus />, document.getElementById('account-status')
```

AccountForm is the react component for displaying all of the various forms for the signup process as well as error messages.  It has a sigle property to indicate if the close link should be included.

```
ReactDom.render(<AccountForm showClose='true' />, document.getElementById('account-form')
```

# Customization

This package can be customized in a variaty of ways to allow other packages to extend it without the need to reproduce the entire signup process.

## Text

Text of ui components can be changed by setting the appropriate property under AltAccounts.config.text.

* logInStatus
* logOutStatus
* oauthPasswordSeparator
* userNameField
* userNameOrEmailField
* emailField
* optionalEmailField
* passwordField
* passwordField2
* logInButton
* createAccountButton
* sendEmailButton
* okButton
* logInLink
* createAccountLink
* forgotPasswordLink
* closeLink

## Components

The AccountStatus component uses two components for displaying the logged out and logged in status.  These components can be replaced with custom versions by calling:

```
AltAccounts.config.statusLoggedInComponent(your_new_component)
AltAccounts.config.statusLoggedOutComponent(your_new_component)
```

The component that handles the logged in state uses two components for displaying the login password form and each individual oauth button..  These can be replaced with custom versions by calling:


```
AltAccounts.config.formPasswordComponent(your_new_component)
AltAccounts.config.formOauthComponent(your_new_component)
```

## Account State Components

There are multiple states the account sign-up process can be in and a different component handles the UI interaction for each.  These components can be replaced with custom versions to completely change the sign-up process.

```
AltAccounts.setState(state, valid_user_status, your_new_component)
```

The valid_user_status parameter indicates what the currrent user status must be for this account state to be available.  Defined user statuses are ['userLoggedOut', 'userLoggingIn', 'userLoggedIn', 'userVerifyEmail']

The package defines the following account states ['loggedOut', 'logIn', 'loggingIn', loggedIn', 'createAccount', 'forgotPassword', 'recoveryEmailSent', 'resetPassword', 'verifyingEmail', 'verifyDone']

For example to provide a custom create account form you would use the following:

```
AltAccounts.setState('createAccount', 'userLoggedOut', your_new_component)
```

# Advanced customization

You are free to add new account states in addition to the ones already defined in the package.  For example you may provide a new component for the logged in status bar that has a 'My Account' button instead of a log out button.  The click handler for that button would set the current state to a new custom value.

```
AltAccounts.currrentState('accountInfo')
```

You then need to tell AltAccounts what form to display for that state.

```
AltAccounts.setState('accountInfo', 'userLoggedIn', your_new_component)
```

This new component would then show up inside the AccountForm component whenever the current state was set to 'accountInfo'.

# Limitations

The oauth setup dialogs are Blaze templates inside each account-* package.  Since this is a React only accounts package, those dialogs are not available.

The enrollment email path is not provided since that is a very customized path.  It can easly be added by hooking into the onEnrollmentLink Meteor method and creating a custom state.

