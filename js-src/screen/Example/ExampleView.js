import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Example extends Component {
  static navigationOptions = {
    title: 'Example',
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Example</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Example