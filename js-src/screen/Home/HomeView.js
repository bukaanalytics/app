import React, { Component } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AppColors, AppSizes, AppStyles } from '@theme/'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Pie } from 'react-native-pathjs-charts'
import Table from 'react-native-simple-table';
import moment from 'moment'
import numeral from 'numeral'
import truncate from 'truncate'

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

    return <Text style={styles.centeredStat}>{ numeral(currentRevenue).format('0.0 a') }</Text>
  }

  renderViewStat = (item, index) => {
    return (
      <View key={index} style={{width: viewStatWidth, justifyContent: 'center', alignItems: 'center', marginTop: 16}}>
        <View style={{alignSelf: 'center', backgroundColor: AppColors.brand.primary, width: item, height: item, borderRadius: item/2}}></View>
      </View>
    )
  }

  renderRevenueComparation = () => {
    let { currentRevenue, previousRevenue } = this.props.dashboard
    let _style = {};
    if(currentRevenue < (0.8 * previousRevenue)){
      _style = styles.statusTagBad;
    } else if (currentRevenue < (1.2 * previousRevenue)) { // implicitly imply that the revenue above 0.8 since it fails in above code
      _style = styles.statusTagWarning;
    } else {
      _style = styles.statusTagOk;
    }
    return (
      <Text style={_style}>Compared to Prev Period</Text>
    );
  }

  renderConvertionRateComparation = () => {
    const { convertion_rate, prev_convertion_rate } = this.props.dashboard;
    const curr_sold_accumulated = convertion_rate.sold_accumulated || 0;
    const curr_view_accumulated = convertion_rate.view_accumulated || 1;
    const prev_sold_accumulated = prev_convertion_rate.sold_accumulated || 0;
    const prev_view_accumulated = prev_convertion_rate.view_accumulated || 1;
    const conv_rate = curr_sold_accumulated / curr_view_accumulated * 100;
    const prev_conv_rate = prev_sold_accumulated / prev_view_accumulated * 100;
    console.log("conv rate", conv_rate, " prev conv_rate", prev_conv_rate);
    let _style = {};
    if(conv_rate < (0.8 * prev_conv_rate)){
      _style = styles.statusTagBad;
    } else if (conv_rate < (1.2 * prev_conv_rate)) { // implicitly imply that the revenue above 0.8 since it fails in above code
      _style = styles.statusTagWarning;
    } else {
      _style = styles.statusTagOk;
    }
    return (
      <Text style={_style}>Compared to Prev Period</Text>
    );
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
    console.log("state are: ", this.props.dashboard);
    // Retriveing data from sqlite, truncating, and formating the number if needed
    viewStat = this.retrieveWeeklyData();
    const { least_viewed, most_viewed, convertion_rate, revenue_attribution, prev_convertion_rate } = this.props.dashboard;
    const dataSource_least_viewed = least_viewed.map( d => {
      return {
        item: truncate(d.item, 25),
        view: numeral(d.view).format('0.0 a'),
      };
    });
    const dataSource_most_viewed = most_viewed.map( d => {
      return {
        item: truncate(d.item, 25),
        view: numeral(d.view).format('0.0 a'),
      };
    });
    console.log(revenue_attribution);
    const data_revenue = revenue_attribution.map( d => {
      return {
        name: truncate(d.name, 25),
        attribution: d.attribution,
      };
    });
    const conv_rate = numeral(convertion_rate.sold_accumulated / convertion_rate.view_accumulated * 100).format('0.0');
    const prev_conv_rate = numeral(prev_convertion_rate.sold_accumulated / prev_convertion_rate.view_accumulated * 100).format('0.0');


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
              { this.renderRevenueComparation() }
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.centeredH3}>Conv. Rate</Text>
              <Text style={styles.centeredStat}> {conv_rate} %</Text>
              { this.renderConvertionRateComparation()}
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
            <Pie data={data_revenue}
            options={options}
            accessorKey="attribution"
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
            <Table columnWidth={115} height={250} columns={columns} dataSource={dataSource_most_viewed} />
          </View>

          <Text style={styles.sectionTitle}>Least Viewed Product</Text>
          <View style={styles.overviewContainer}>
            <Table columnWidth={115} height={250} columns={columns} dataSource={dataSource_least_viewed} />
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
      "attribution": 7694980
    }, {
      "name": "Oregon",
      "attribution": 2584160
    }, {
      "name": "Minnesota",
      "attribution": 6590667,
      "color": {'r':223,'g':154,'b':20}
    }, {
      "name": "Alaska",
      "attribution": 7284698
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
    width: AppSizes.widthHalf-40,
  },
  {
    title: 'View',
    dataIndex: 'view',
    width: AppSizes.widthHalf-40,
  },
  // {
  //   title: 'Avg. Market View',
  //   dataIndex: 'avg',
  //   width: AppSizes.widthThird-40,
  // }
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
    elevation: 4,
    height: 56,
    alignItems: 'center',
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
  statusTagBad: {
    ...AppStyles.textCenterAligned,
    backgroundColor: AppColors.brand.lightPrimary,
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
