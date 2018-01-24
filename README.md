## To install the dependencies

You need to have npdejs and npm installed: https://nodejs.org/

After that, install yarn (there is issues with npm@5: https://github.com/facebook/react-native/issues/14767)

`npm install yarn`

Then, intall app dependencies:

`yarn start`

If you got `command not found` running yarn, try include the bin folder in yout path:

```
export PATH=`npm bin`:$PATH
```


## Run the app

`yarn start`

## Tested Platforms

Tested into Android 7.
It may works into other versions and iOS too, but no tests are made in other platforms.



This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
