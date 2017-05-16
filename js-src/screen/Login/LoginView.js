import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'

class Login extends Component{
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Login Screen</Text>
        <Button
          title="Login"
          onPress={() => {
            // alert('login')
            this.props.navigation.navigate('DrawerScreen')
            console.log(this.props.nav)
          }}
        />
      </View>
    )
  }
}

export default Login