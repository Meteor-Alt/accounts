Package.describe({
  name: 'alt:react-accounts-ui',
  version: '0.0.1',
  summary: 'Alternative accounts ui using react',
  git: 'https://github.com/Meteor-Alt/accounts/tree/master/packages/react-accounts-ui',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.1')
  api.use(['ecmascript', 'react', 'less'], 'client')

  api.use('alt:react-accounts-unstyled@0.0.1', 'client')

  api.imply('alt:react-accounts-unstyled', 'client')

  api.addFiles('alt-accounts.less', 'client')
  api.addFiles('client/login-buttons.jsx', 'client')

  api.export(['LogInButtons'], 'client')
})

