'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SQLite from 'react-native-sqlite-storage'

class HelloWorld extends React.Component {
  
  componentDidMount() {
    let db = SQLite.openDatabase({name: 'baDatabase'}, () => {
      // alert('connected')
    })

    db.executeSql("SELECT * FROM posts", [], (t, r) => {
      // console.log(t.rows)
      let result = t.rows.item(0)
      console.log(result)
    })
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
var styles = StyleSheet.create({
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

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
