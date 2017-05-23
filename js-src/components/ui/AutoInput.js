import React from 'react';
import { View, Text, TouchableOpacity, InteractionManager, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import Autocomplete from 'react-native-autocomplete-input';
import { AppSizes } from '@theme';

const Component = t.form.Component;

class AutoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      propForQuery: '',
      query: '',
    };
    this.localsOnChange = null;
    this.getTemplate = this.getTemplate.bind(this);

    InteractionManager.runAfterInteractions(() => {
      const locals = super.getLocals();
      const { config: { elements, propForQuery } } = locals;
      const query = this.props.value;
      this.setState({ elements, propForQuery, query });
      locals.onChange(query);
    });
  }

  getLocals() {
    return super.getLocals();
  }

  getTemplate() {
    return function (locals) {
      const { query } = this.state;
      const elements = this.findElement(query);
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

      const stylesheet = locals.stylesheet;
      const formGroupStyle = stylesheet.formGroup.normal;
      const controlLabelStyle = stylesheet.controlLabel.normal;
      const textboxStyle = stylesheet.textbox.normal;

      const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
      return (
        <View style={styles.formGroupStyle}>
          {label}
          <View style={styles.autocompleteContainer} >
            <Autocomplete
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              inputContainerStyle={[styles.inputContainerStyle]}
              containerStyle={[styles.containerStyle]}
              data={
                elements.length === 1 && comp(query, elements[0])
                  ? []
                  : elements
              }
              defaultValue={query}
              onChangeText={text => {
                this.setState({ query: text });
                locals.onChange(text);
              }}
              renderItem={( item ) => (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ query: item });
                    locals.onChange(item);
                  }}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.descriptionContainer}>
          {elements.length > 0 ? (
            <Text></Text>
          ) : (
            <Text style={styles.infoText}>

            </Text>
          )}
        </View>
        </View>
      );
    }.bind(this);
  }

  findElement(query) {
    if (query === '' || !query) {
      return [];
    }

    const { elements } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return elements.filter(element => element.search(regex) >= 0).slice(0, 4);
  }
}

// const styles = {
//   container: {
//
//     // backgroundColor: '#F5FCFF',
//   },
//   autocompleteContainer: {
//     flex: 1,
//     left: 0,
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     zIndex: 1
//   },
//   inputContainerStyle: {
//     borderRadius: 4,
//     borderColor: '#cccccc',
//     borderWidth: 1,
//     marginBottom: 18,
//   },
//   itemText: {
//     fontSize: 15,
//     margin: 2,
//   },
// };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  autocompleteContainer: {
    flex: 1,
    left: AppSizes.screen.widthThird,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    marginTop: 25,
    height: 100,
  },
  infoText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  openingText: {
    textAlign: 'center',
  },
  inputContainerStyle: {
    borderRadius: 0,
    borderColor: '#cccccc',
    borderWidth: 0,
    marginBottom: 5,
    height: 36,
    width: AppSizes.screen.widthTwoThirds,
  },
});

AutoInput.transformer = {
  format: value => {
    return value;
  },
  parse: value => {
    return value;
  },
};

export default AutoInput;
