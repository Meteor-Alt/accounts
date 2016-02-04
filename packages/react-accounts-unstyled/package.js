Package.describe({
  name: 'alt:react-accounts-unstyled',
  version: '0.0.1',
  summary: 'Alternative unstyled package supporting react accounts',
  git: 'https://github.com/Meteor-Alt/accounts/tree/master/packages/react-accounts-unstyled',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.1')
  api.use(['ecmascript', 'underscore', 'session', 'react', 'accounts-base'], 'client')
  api.imply('accounts-base', ['client', 'server'])

  api.use('accounts-oauth', {weak: true})
  api.use('accounts-password', {weak: true})
  api.use('service-configuration', {weak: true})

  api.addFiles('lib/accounts.js', 'client')
  api.addFiles('client/account-status.jsx', 'client')
  api.addFiles('client/account-form.jsx', 'client')
  api.addFiles('client/form-password.jsx', 'client')
  api.addFiles('client/form-password-token.jsx', 'client')
  api.addFiles('client/form-oauth.jsx', 'client')

  api.export(['AltAccounts', 'AccountStatus', 'AccountForm'], 'client')
})

