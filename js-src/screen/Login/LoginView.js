import React, { Component } from 'react'
import { Button, Text, ToastAndroid, View, ScrollView } from 'react-native'
import { FormLabel, FormInput } from '@components/ui'
import { AppColors } from '@theme/'

class Login extends Component{
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', padding: 16}}>
        <View style={{marginBottom: 16, marginHorizontal: -16}}>
          <FormLabel>Username</FormLabel>
          <FormInput underlineColorAndroid="transparent" keyboardType='email-address'
            onChangeText={username => this.setState({username})}
          />
          <FormLabel>Password</FormLabel>
          <FormInput underlineColorAndroid="transparent" secureTextEntry
            onChangeText={password => this.setState({password})}
          />
        </View>
        <Button
          disabled={this.props.user.loading}
          title={ this.props.user.loading ? 'Logging in...' : 'Login' }
          color={AppColors.brand.primary}
          onPress={() => {
            // alert('login')
            this.props.login(this.state.username, this.state.password).then(() => {
              if (this.props.user.token != '') this.props.navigation.navigate('DrawerScreen')
              else ToastAndroid.show('Wrong username or password', ToastAndroid.LONG)
            })
          }}
        />
      </ScrollView>
    )
  }
}

export default Login