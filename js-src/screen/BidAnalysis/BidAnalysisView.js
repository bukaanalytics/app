import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native';
import SubHeader from '@ui/SubHeader';
import { AppColors, AppSizes, AppStyles } from '@theme/'
import { Alerts, Button, Card, Spacer, Text } from '@components/ui/';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Table from 'react-native-simple-table';
import truncate from 'truncate';
import numeral from 'numeral';
import moment from 'moment';

const { width, height } = Dimensions.get("window");
const half_width = width/2;

const columns = [
  {
    title: 'Item Name',
    dataIndex: 'item',
    width: 210,
  },
  {
    title: 'Bid',
    dataIndex: 'bid_suggestion',
    width: 70,
  },
];

const dataSource = [
  {
    item: 'Item A',
    bid: 100,
  },
  {
    item: 'Item B',
    bid: 150,
  },
  {
    item: 'Item C',
    bid: 200,
  },
  {
    item: 'Item D',
    bid: 150,
  },
  {
    item: 'Item E',
    bid: 250,
  },
  {
    item: 'Item F',
    bid: 500,
  },
  {
    item: 'Item G',
    bid: 350,
  },
  {
    item: 'Item H',
    bid: 200,
  },
  {
    item: 'Item I',
    bid: 2000,
  },
  {
    item: 'Item J',
    bid: 1000,
  },
  {
    item: 'Item K',
    bid: 10000,
  },
  {
    item: 'Item L',
    bid: 5000,
  },
  {
    item: 'Item M',
    bid: 2500,
  },
  {
    item: 'Item N',
    bid: 3000,
  },
  {
    item: 'Item O',
    bid: 2000,
  },
  {
    item: 'Item P',
    bid: 1000,
  },
  {
    item: 'Item Q',
    bid: 2000,
  },
  {
    item: 'Item R',
    bid: 3500,
  },
  {
    item: 'Item S',
    bid: 10000,
  },
  {
    item: 'Item T',
    bid: 200,
  },
  {
    item: 'Item U',
    bid: 200,
  },
  {
    item: 'Item V',
    bid: 200,
  },
  {
    item: 'Item W',
    bid: 200,
  },
];

class BidAnalysis extends Component{

  getDateRange = () => {
    let { latestDate } = this.props.dashboard
    let momentObj = moment(latestDate, 'X')

    let sundayDateStr = momentObj.format('D MMM')
    let mondayDateStr = momentObj.day(-6).format('D MMM')

    let range = mondayDateStr + ' - ' + sundayDateStr

    return range
  }

  render() {
    const data_bid_suggestion = this.props.bidding.bid_suggestion.map(val => {
      let _bid_suggestion = val.bid_suggestion; // pembulatan
      const _item = truncate(val.item, 25);
      if(val.bid_suggestion >= 10000) {
        _bid_suggestion = 10000;
      }
      return {
        item: _item,
        bid_suggestion: numeral(_bid_suggestion).format('0,0'),
      };
    });

    return (
      <View style={styles.container}>
        <ScrollView style={[AppStyles.container]}>
          <View style={[AppStyles.paddingHorizontal]}>
            <Spacer size={15} />
            <Text h2>Bid Analysis Tools</Text>
          </View>
          <Card>
            <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
              <View style={styles.buttonWrapper} >
                <Button title="Re-calculate bidding suggestion !" onPress={()=>{ this.props.refreshBiddingData() }} />
              </View>
              <Table height={320} columnWidth={60} columns={columns} dataSource={data_bid_suggestion} />
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
  sub_header_1:{
    flex: 7,
    backgroundColor: '#ade',
  },
  sub_header_2:{
    flex: 3,
    backgroundColor: '#eda',
  },
  subheader_icon: {
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
    padding:5,
  },
  subheader_text: {
    marginTop: 10,
    marginLeft: -10,
    flex: 4,
  },
  subheader_left_button: {
    flex: 1,
    marginTop: 10,
    padding:5,
  },
  subheader_right_button: {
    flex: 1,
    marginTop: 10,
    padding:5,
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  dateHeaderContainer: {
    ...AppStyles.spreadHorizontalContainer,
    ...AppStyles.paddingHorizontal,
    backgroundColor: AppColors.brand.lightPrimary,
    elevation: 4,
    height: 56,
    alignItems: 'center',
  },
});

export default BidAnalysis
