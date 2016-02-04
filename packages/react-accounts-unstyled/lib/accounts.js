
let State = {
  states: {
    loggedOut:      {valid: 'userLoggedOut'},
    loggingIn:      {valid: 'userLoggingIn'}, 
    loggedIn:       {valid: 'userLoggedIn'}
  },

  userStates: [
    {status: 'userLoggedIn',  default: 'loggedIn',  check(){ return !!Meteor.userId() }},
    {status: 'userLoggingIn', default: 'loggingIn', check(){ return !!Meteor.userId() && !!Meteor.loggingIn() }},
    {status: 'userLoggedOut', default:  null,       check(){ return !Meteor.userId() }}
  ],

  loggedOutDefault: 'loggedOut',

  userStatus(){
    let s = {}
    State.userStates.forEach((us) => { if(us.check()) s = {status: us.status, default: us.default? us.default : State.loggedOutDefault} })
    return s
  },

  check(s){ return s in State.states && State.states[s].valid == State.userStatus().status },

  current(s){
    if(s)
      State.setCurrent(s)
    else
      return State.getCurrent()
  },

  getCurrent(){
    var state = Session.get('Alt-Accounts-State')
    if(State.check(state))
      return state

    var userStatus = State.userStatus()
    State.setCurrent(userStatus.default)
    return userStatus.default
  },

  setCurrent(s){ 
    if(State.check(s)){
      Session.set('Alt-Accounts-State', s) 
      Session.set('Alt-Accounts-Messages-Error', '')
    }
  },

  set(s, v, c){ State.states[s] = {valid: v, component: c }},

  addUserState(s, d, f){ State.userStates.push({status: s, default: d, check: f }) },
}


AltConfig = {
  config: {},

  createElement(path, props){
    return React.createElement(AltConfig.get(path), props)
  },

  get(path){
    var component = AltConfig.config
    path.split('.').forEach((p) => component = component[p])
    return component
  },

  add(path, val){
    var component = AltConfig.config
    var plist = path.split('.')
    var last = plist.pop()
    plist.forEach((p) => component = component[p] = component[p]? component[p] : {})
    component[last] = val
  }
}


// Global public exported access

AltAccounts = {
  config: {
    passwordSignupFields: 'EMAIL_ONLY',
    text: {
      logInStatus: 'Sign Up',
      logOutStatus: 'Log Out',

      oauthPasswordSeparator: 'OR',

      userNameField: 'User Name',
      userNameOrEmailField: 'User Name / Email',
      emailField: 'Email',
      optionalEmailField: 'Email (Optional)',
      passwordField: 'Password',
      passwordField2: 'Password Again',

      logInButton: 'Sign In',
      createAccountButton: 'Create Account',
      sendEmailButton: 'Send Email',
      okButton: 'OK',

      logInLink: 'Sign In',
      createAccountLink: 'Create Account',
      forgotPasswordLink: 'Forgot Password',
      closeLink: 'Close'
    }
  },

  setLoggedOutDefault(d){ State.loggedOutDefault = d },

  setState: State.set,

  addUserState: State.addUserState,

  currentState: State.current,


  getStateComponent(s){ return State.states[s].component },

  getDefaultState(){ return State.userStatus().default },

  getUserStatus(){ return State.userStatus().status },


  accountsPassword(){ return !!Package['accounts-password'] },

  accountsOauth(){ return !!Package['accounts-oauth'] },

  oauthServices(){ return AltAccounts.accountsOauth()? Accounts.oauth.serviceNames() : [] },


  setErrorMessage(msg){ Session.set('Alt-Accounts-Messages-Error', msg? msg : '') }
}

