import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Dimensions } from 'react-native';
import SubHeader from '@ui/SubHeader';
import { AppStyles } from '@theme/';
import { Alerts, Button, Card, Spacer, Text } from '@components/ui/';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Table from 'react-native-simple-table';

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
    dataIndex: 'bid',
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

  render() {
    return (
      <View style={styles.container}>
        <SubHeader>
          <View style={AppStyles.row}>

              <View style={styles.subheader_icon}>
                <Icon name="date-range" size={32} />
              </View>
              <View style={styles.subheader_text}>
                <Text style={AppStyles.h3}>22 April - 29 April</Text>
                <Text style={AppStyles.subtext}>14 April - 21 April</Text>
              </View>

              <View style={styles.subheader_left_button}>
                <TouchableOpacity>
                  <Icon name="keyboard-arrow-left" size={32} />
                </TouchableOpacity>
              </View>
              <View style={styles.subheader_right_button}>
                <TouchableOpacity>
                  <Icon name="keyboard-arrow-right" size={32} />
                </TouchableOpacity>
              </View>

          </View>
        </SubHeader>

        <ScrollView style={[AppStyles.container]}>
          <View style={[AppStyles.paddingHorizontal]}>
            <Spacer size={15} />
            <Text h2>Bid Analysis Tools</Text>
          </View>
          <Card>
            <View style={[AppStyles.paddingLeftSml, AppStyles.paddingBottomSml]}>
              <Text h3>Title of post</Text>
              <Text>
                seharusnya ini diagram , nanti aing lagi cari librarynya
              </Text>
              <Table height={320} columnWidth={60} columns={columns} dataSource={dataSource} />
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
});

export default BidAnalysis
