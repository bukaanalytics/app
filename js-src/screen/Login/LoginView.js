import React, { Component } from 'react'
import { Button, Text, ToastAndroid, View } from 'react-native'

class Login extends Component{
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login Screen</Text>
        <Button
          title="Login"
          onPress={() => {
            // alert('login')
            this.props.login('bdc_seller', 'gbolehta').then(() => {
              if (this.props.user.token != '') this.props.navigation.navigate('DrawerScreen')
              else ToastAndroid.show('Wrong username or password', ToastAndroid.LONG)
            })
          }}
        />
      </View>
    )
  }
}

export default Login