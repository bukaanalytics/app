import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import SubHeader from '@ui/SubHeader';
import { AppStyles } from '@theme/';
import { Alerts, Button, Card, Spacer, Text } from '@components/ui/';
import FormWrapper from 'tcomb-form-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome'
import numeral from 'numeral';

import { Bar } from 'react-native-pathjs-charts';

const FormWrapperStyle = _.cloneDeep(FormWrapper.form.Form.stylesheet);
FormWrapperStyle.textbox.normal.backgroundColor = '#FFFFFF';
FormWrapperStyle.textbox.error.backgroundColor = '#FFFFFF';
FormWrapperStyle.textbox.normal.justifyContent = 'flex-start';
FormWrapperStyle.textbox.normal.alignItems = 'center';
FormWrapperStyle.textbox.normal.margin = 10;
FormWrapperStyle.textbox.normal.width = 290;
FormWrapperStyle.textbox.error.width = 290;


const FORM_FIELDS = FormWrapper.struct({
  search: FormWrapper.String,
});

class PricingAnalysis extends Component{

  static navigationOptions = {
    title: 'Example',
  };

  constructor(props) {
    super(props)
  }

  FORM_OPTIONS = {
    auto: 'placeholders',
    stylesheet: FormWrapperStyle,
    fields: {
      search: {
        onSubmitEditing: this.submitForm.bind(this),
      }
    }
  }

  submitForm(){
    const form = this.form.getValue();
    const pricing_filter = this.props.pricing_filter;
    this.props.getGraph(form.search, pricing_filter);
  }

  renderbar(){
    let data = [
      [{
        "v": 1,
        "name": "1"
      }],
      [{
        "v": 1,
        "name": "2"
      }],
      [{
        "v": 1,
        "name": "3"
      }],
      [{
        "v": 1,
        "name": "4"
      }],
      [{
        "v": 1,
        "name": "5"
      }],
      [{
        "v": 1,
        "name": "6"
      }],
      [{
        "v": 1,
        "name": "7"
      }],
      [{
        "v": 1,
        "name": "8"
      }],
      [{
        "v": 1,
        "name": "9"
      }],
      [{
        "v": 1,
        "name": "10"
      }]
    ];

    const graphdata = this.props.graph;
    if (graphdata.length > 0) {
      let test_data = [];
      graphdata.forEach(g => {
        test_data.push([g]);
      });
      data = test_data;
    }

    let options = {
      width: 220,
      height: 220,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#D71149',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: false,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    };

    if(this.props.graph.length > 0 ) {
      return <Bar data={data} options={options} accessorKey='v'/>
    }else{
      return <Text h4>Start searching a keyword</Text>
    }
  }

  render() {
    const Form = FormWrapper.form.Form;
    const Bar = this.renderbar();
    return (
      <View style={styles.container}>
        <SubHeader style={styles.searchbar}>
          <View style={{flexDirection:'row'}}>
            <Form
              ref={f => this.form = f}
              type={FORM_FIELDS}
              options={this.FORM_OPTIONS}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => { this.props.navigation.navigate('FilterScreen')}}
            >
              <Icon name="filter" size={32} style={{margin: 10, color:'#fff'}} />
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
            <Card>
              { Bar }
              <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
              </View>
            </Card>
          </TouchableOpacity>

          <Card>
            <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
              <View style={styles.wrapperText}>
                <View style={styles.infoText}>
                  <Text h4>Terendah</Text>
                  <Text h3> {numeral(this.props.min_price).format('0,0.0 a')} </Text>
                </View>
                <View style={styles.infoText}>
                  <Text h4>Rata-Rata</Text>
                  <Text h3> {numeral(this.props.avg_price).format('0,0.0 a')} </Text>
                </View>
                <View style={styles.infoText}>
                  <Text h4>Termahal</Text>
                  <Text h3> {numeral(this.props.max_price).format('0,0.0 a')} </Text>
                </View>
              </View>

              <View style={styles.infoText}>
                <View style={styles.wrapperText}>
                  <View style={styles.infoText}>
                    <Text h2>Terbaik</Text>
                    <Text h1> {numeral(this.props.best_price).format('0,0.0 a')} </Text>
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
