Package.describe({
  name: 'alt:react-accounts-unstyled',
  version: '1.1.0',
  summary: 'Alternative unstyled package supporting react accounts',
  git: 'https://github.com/Meteor-Alt/accounts/tree/master/packages/react-accounts-unstyled',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.1')
  api.use(['ecmascript', 'underscore', 'session', 'accounts-base'])
  api.use(['react@0.14.3'])
  api.imply('accounts-base')

  api.use('accounts-oauth', {weak: true})
  api.use('accounts-password', {weak: true})
  api.use('service-configuration', {weak: true})

  api.addFiles('accounts.js')
  api.addFiles('components/account-status.jsx')
  api.addFiles('components/account-form.jsx')
  api.addFiles('components/form-password.jsx')
  api.addFiles('components/form-password-token.jsx')
  api.addFiles('components/form-oauth.jsx')

  api.export(['AltAccounts', 'AccountStatus', 'AccountForm'])
})

