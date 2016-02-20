Package.describe({
  name: 'alt:react-accounts-ui',
  version: '1.0.0',
  summary: 'Alternative accounts ui using react',
  git: 'https://github.com/Meteor-Alt/accounts/tree/master/packages/react-accounts-ui',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.1')
  api.use(['less'], 'client')
  api.use(['ecmascript'])
  api.use(['react@0.14.3'])

  api.use('alt:react-accounts-unstyled@1.0.0', 'client')

  api.imply('alt:react-accounts-unstyled', 'client')

  api.addFiles('alt-accounts.less', 'client')
  api.addFiles('login-buttons.jsx', ['client', 'server'])

  api.export(['LogInButtons', 'LogInButtonsDialog'], ['client', 'server'])
})

