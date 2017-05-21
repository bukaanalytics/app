import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AppColors, AppSizes, AppStyles } from '@theme/'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Pie } from 'react-native-pathjs-charts'
import Table from 'react-native-simple-table';
import moment from 'moment'
import numeral from 'numeral'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const viewStatWidth = (screenWidth-40)/7 // -40 karena paddingHorizontal

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.refreshData()
  }

  getDateRange = () => {
    let { latestDate } = this.props.dashboard
    let momentObj = moment(latestDate, 'X')

    let sundayDateStr = momentObj.format('D MMM')
    let mondayDateStr = momentObj.day(-6).format('D MMM')

    let range = mondayDateStr + ' - ' + sundayDateStr

    return range
  }

  getPreviousDateRange = () => {
    let { latestDate } = this.props.dashboard
    let momentObj = moment(latestDate, 'X')

    let sundayDateStr = momentObj.day(-7).format('D MMM')
    let mondayDateStr = momentObj.day(-6).format('D MMM')

    let range = mondayDateStr + ' - ' + sundayDateStr

    return range
  }

  getRevenue= () => {
    let { currentRevenue, fetchingTransaction } = this.props.dashboard

    if (fetchingTransaction) return <ActivityIndicator style={{flex: 1}} />

    return <Text style={styles.centeredStat}>{ numeral(currentRevenue).format('0a') }</Text>
  }

  renderViewStat = (item, index) => {
    return (
      <View key={index} style={{width: viewStatWidth, justifyContent: 'center', alignItems: 'center', marginTop: 16}}>
        <View style={{alignSelf: 'center', backgroundColor: AppColors.brand.primary, width: item, height: item, borderRadius: item/2}}></View>
      </View>
    )
  }

  retrieveWeeklyData() {
    const { weekly_view } = this.props.dashboard;
    const view_stat = [];
    view_stat[0] = weekly_view.Monday || 0;
    view_stat[1] = weekly_view.Tuesday || 0;
    view_stat[2] = weekly_view.Wednesday || 0;
    view_stat[3] = weekly_view.Thursday || 0;
    view_stat[4] = weekly_view.Friday || 0;
    view_stat[5] = weekly_view.Saturday || 0;
    view_stat[6] = weekly_view.Sunday || 0;
    return view_stat;
  }

  render() {
    console.log("weekly view is ", this.props.dashboard.weekly_view);
    viewStat = this.retrieveWeeklyData();
    let maxViewStat = Math.max(...viewStat)
    let viewStatDiameters = viewStat.map((item) => item*viewStatWidth/maxViewStat)

    return (
      <View style={AppStyles.flex1}>
        {/* Date Header */}
        <View style={styles.dateHeaderContainer}>
          <View style={AppStyles.row}>
            <Icon name="date-range" size={36} />
            <View style={AppStyles.paddingLeft}>
              <Text style={AppStyles.h3}>{ this.getDateRange() }</Text>
              <Text style={AppStyles.subtext}>{ this.getPreviousDateRange() }</Text>
            </View>
          </View>
          <View style={AppStyles.row}>
            <TouchableOpacity style={[AppStyles.paddingVertical, {paddingRight: 4}]}
              onPress={() => this.props.refreshData('prev')}
            >
              <Icon name="keyboard-arrow-left" size={36} />
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.paddingVertical, {paddingLeft: 4}]}
              onPress={() => this.props.refreshData('next')}
            >
              <Icon name="keyboard-arrow-right" size={36} />
            </TouchableOpacity>
          </View>
        </View>
        {/* End of Date Header */}
        <ScrollView>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.overviewContainer}>
            <View style={styles.statContainer}>
              <Text style={styles.centeredH3}>Revenue</Text>
              { this.getRevenue() }
              <Text style={styles.statusTagOk}>Compared to Prev Period</Text>
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.centeredH3}>Conv. Rate</Text>
              <Text style={styles.centeredStat}>3 %</Text>
              <Text style={styles.statusTagWarning}>Compared to Prev Period</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>User Views by Day</Text>
          <View style={styles.viewStatSectionContainer}>
            <View style={styles.viewStatContainer}>
              <Text style={styles.viewStatDay}>Senin</Text>
              <Text style={styles.viewStatDay}>Selasa</Text>
              <Text style={styles.viewStatDay}>Rabu</Text>
              <Text style={styles.viewStatDay}>Kamis</Text>
              <Text style={styles.viewStatDay}>Jumat</Text>
              <Text style={styles.viewStatDay}>Sabtu</Text>
              <Text style={styles.viewStatDay}>Minggu</Text>
            </View>
            <View style={styles.viewStatContainer}>
              { viewStatDiameters.map(this.renderViewStat) }
            </View>
          </View>

          <Text style={styles.sectionTitle}>Revenue Attribution</Text>
          <View style={styles.revenueContainer}>
            <Pie data={data}
            options={options}
            accessorKey="population"
            margin={{top: 20, left: 20, right: 20, bottom: 20}}
            color="#2980B9"
            pallete={
              [
                {'r':25,'g':99,'b':201},
                {'r':24,'g':175,'b':35},
                {'r':190,'g':31,'b':69},
                {'r':100,'g':36,'b':199},
                {'r':214,'g':207,'b':32},
                {'r':198,'g':84,'b':45}
              ]
            }
            r={0}
            R={150}
            legendPosition="topLeft"
            label={{
              fontFamily: 'Arial',
              fontSize: 8,
              fontWeight: true,
              color: '#ECF0F1'
            }}
            />
          </View>

          <Text style={styles.sectionTitle}>Most Viewed Product</Text>
          <View style={styles.overviewContainer}>
            <Table columnWidth={115} height={150} columns={columns} dataSource={dataSource} />
          </View>

          <Text style={styles.sectionTitle}>Least Viewed Product</Text>
          <View style={styles.overviewContainer}>
            <Table columnWidth={115} height={150} columns={columns} dataSource={dataSource} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

// To be replaced by dynamic data
const viewStat = [12, 15, 20, 8, 22, 30, 45]
const data = [{
      "name": "Washington",
      "population": 7694980
    }, {
      "name": "Oregon",
      "population": 2584160
    }, {
      "name": "Minnesota",
      "population": 6590667,
      "color": {'r':223,'g':154,'b':20}
    }, {
      "name": "Alaska",
      "population": 7284698
    }]
const options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }
const columns = [
  {
    title: 'Item',
    dataIndex: 'item',
    width: AppSizes.widthThird-40,
  },
  {
    title: 'View',
    dataIndex: 'view',
    width: AppSizes.widthThird-40,
  },
  {
    title: 'Avg. Market View',
    dataIndex: 'avg',
    width: AppSizes.widthThird-40,
  }
];
const dataSource = [{
  item: 'Item A',
  view: 500,
  avg: 450
}, {
  item: 'Item B',
  view: 400,
  avg: 394
}, {
  item: 'Item C',
  view: 300,
  avg: 145
}, {
  item: 'Item D',
  view: 120,
  avg: 254
}]

const styles = {
  centeredH3: {
    ...AppStyles.textCenterAligned,
    ...AppStyles.h3
  },
  centeredStat: {
    ...AppStyles.textCenterAligned,
    fontSize: 48
  },
  dateHeaderContainer: {
    ...AppStyles.spreadHorizontalContainer,
    ...AppStyles.paddingHorizontal,
    backgroundColor: AppColors.brand.lightPrimary,
    elevation: 4
  },
  overviewContainer: {
    ...AppStyles.row,
    ...AppStyles.paddingHorizontal,
    ...AppStyles.paddingVertical,
    backgroundColor: AppColors.background
  },
  revenueContainer: {
    ...AppStyles.row,
    ...AppStyles.paddingVertical,
    backgroundColor: AppColors.background
  },
  sectionTitle: {
    ...AppStyles.h2,
    ...AppStyles.padding
  },
  statContainer: {
    ...AppStyles.flex1
  },
  statusTagOk: {
    ...AppStyles.textCenterAligned,
    backgroundColor: AppColors.brand.success,
    padding: 4,
    borderRadius: 16,
    marginHorizontal: 4,
    fontSize: 10
  },
  statusTagWarning: {
    ...AppStyles.textCenterAligned,
    backgroundColor: AppColors.brand.accent,
    padding: 4,
    borderRadius: 16,
    marginHorizontal: 4,
    fontSize: 10
  },
  viewStatSectionContainer: {
    ...AppStyles.paddingHorizontal,
    ...AppStyles.paddingVertical,
    backgroundColor: AppColors.background
  },
  viewStatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  viewStatDay: {
    ...AppStyles.textCenterAligned,
    width: viewStatWidth,
    fontSize: 10
  }
}

export default Home
