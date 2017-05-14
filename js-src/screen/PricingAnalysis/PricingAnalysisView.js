import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import SubHeader from '@ui/SubHeader';
import { AppStyles } from '@theme/';
import { Alerts, Button, Card, Spacer, Text } from '@components/ui/';
import FormWrapper from 'tcomb-form-native';
import _ from 'lodash';

const FormWrapperStyle = _.cloneDeep(FormWrapper.form.Form.stylesheet);
FormWrapperStyle.textbox.normal.backgroundColor = '#FFFFFF';
FormWrapperStyle.textbox.error.backgroundColor = '#FFFFFF';
FormWrapperStyle.textbox.normal.justifyContent = 'flex-start';
FormWrapperStyle.textbox.normal.alignItems = 'center';
FormWrapperStyle.textbox.normal.margin = 10;

const FORM_FIELDS = FormWrapper.struct({
  search: FormWrapper.String,
});

const FORM_OPTIONS = {
  auto: 'placeholders',
  stylesheet: FormWrapperStyle,
};

class PricingAnalysis extends Component{
  static navigationOptions = {
    title: 'Example',
  };

  constructor(props) {
    super(props)
  }

  render() {
    const Form = FormWrapper.form.Form;


    return (
      <View style={styles.container}>
        <SubHeader style={styles.searchbar}>
          <Form
            ref={(f) => { this.form = f; }}
            type={FORM_FIELDS}
            options={FORM_OPTIONS}
          />
        </SubHeader>
        <SubHeader>

          <View style={styles.wrapperSubBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>{ console.log('somethng'); }}
            >
              <Text h1>Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>{ console.log('somethng'); }}
            >
              <Text h1>Category</Text>
            </TouchableOpacity>
          </View>

        </SubHeader>
        <ScrollView style={[AppStyles.container]}>

          <View style={[AppStyles.paddingHorizontal]}>
            <Spacer size={15} />
            <Text h2>Pricing Analysis Tools</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{ console.log('somethng'); }}
          >
            <Card
              image={{ uri: 'http://wp-api.mcnam.ee/wp-content/uploads/2016/10/brekkie-crumble-33651_l.jpeg' }}
            >
              <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
                <Text h3>Title of post</Text>
                <Text>
                  seharusnya ini diagram , nanti aing lagi cari librarynya
                </Text>
              </View>
            </Card>
          </TouchableOpacity>

          <Card>
            <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
              <View style={styles.wrapperText}>
                <View style={styles.infoText}>
                  <Text h4>Terendah</Text>
                  <Text h3> 10K </Text>
                </View>
                <View style={styles.infoText}>
                  <Text h4>Rata-Rata</Text>
                  <Text h3> 20K </Text>
                </View>
                <View style={styles.infoText}>
                  <Text h4>Termahal</Text>
                  <Text h3> 30K </Text>
                </View>
              </View>

              <View style={styles.infoText}>
                <View style={styles.wrapperText}>
                  <View style={styles.infoText}>
                    <Text h2>Terbaik</Text>
                    <Text h1> 20K </Text>
                  </View>
                </View>
              </View>

            </View>
          </Card>

        </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    backgroundColor: '#C30F42',
  },
  wrapperText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoText: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapperSubBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default PricingAnalysis
