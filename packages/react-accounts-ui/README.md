
# React Accounts UI 

Turnkey React accounts similar to the standard Blaze accounts UI.

* Meteor 1.2
* Meteor 1.3 + NPM React

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

