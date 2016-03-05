
# React Accounts UI 

Turnkey React accounts similar to the standard Blaze accounts UI.

## Note: NPM React

If your application is installing react from NPM instead of using the Meteor react package you need to also add alt:react-npm.

```
meteor add alt:react-npm
```


# Usage

Include at least one of the standard auth packages.

```
meteor add accounts-password accounts-facebook
```

To have a dropdown style menu like accounts-ui use the LogInButtons component.

```
ReactDom.render(<LogInButtons />, document.getElementById('login-buttons')
```

To have a popup dialog use the LogInButtonsDialog component instead.

```
ReactDom.render(<LogInButtonsDialog />, document.getElementById('login-buttons')
```

# Customization

see alt:react-accounts-unstyled

