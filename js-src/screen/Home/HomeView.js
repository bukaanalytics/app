import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello, World</Text>
        <Text style={styles.hello}>This one came from RN</Text>
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

export default Home