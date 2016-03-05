Package.describe({
  name: 'alt:react-accounts-ui',
  version: '1.2.0',
  summary: 'Alternative accounts ui using react',
  git: 'https://github.com/Meteor-Alt/accounts/tree/master/packages/react-accounts-ui',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.1')
  api.use(['less', 'ecmascript'])
  api.use('alt:react@1.0.1')

  api.use('alt:react-accounts-unstyled@1.2.0')
  api.imply('alt:react-accounts-unstyled')

  api.addFiles('alt-accounts.less')
  api.addFiles('login-buttons.jsx')

  api.export(['LogInButtons', 'LogInButtonsDialog'])
})

