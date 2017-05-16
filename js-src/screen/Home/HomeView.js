import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AppColors, AppSizes, AppStyles } from '@theme/'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Pie } from 'react-native-pathjs-charts'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const viewStatWidth = (screenWidth-40)/7 // -40 karena paddingHorizontal

class Home extends Component {
  constructor(props) {
    super(props)
  }

  renderViewStat = (item, index) => {
    return (
      <View key={index} style={{width: viewStatWidth, justifyContent: 'center', alignItems: 'center', marginTop: 16}}>
        <View style={{alignSelf: 'center', backgroundColor: AppColors.brand.primary, width: item, height: item, borderRadius: item/2}}></View>
      </View>
    )
  }

  render() {
    let maxViewStat = Math.max(...viewStat)
    let viewStatDiameters = viewStat.map((item) => item*viewStatWidth/maxViewStat)

    return (
      <ScrollView style={AppStyles.flex1}>
        {/* Date Header */}
        <View style={styles.dateHeaderContainer}>
          <View style={AppStyles.row}>
            <Icon name="date-range" size={36} />
            <View style={AppStyles.paddingLeft}>
              <Text style={AppStyles.h3}>22 April - 29 April</Text>
              <Text style={AppStyles.subtext}>14 April - 21 April</Text>
            </View>
          </View>
          <View style={AppStyles.row}>
            <TouchableOpacity style={[AppStyles.paddingVertical, {paddingRight: 4}]}>
              <Icon name="keyboard-arrow-left" size={36} />
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.paddingVertical, {paddingLeft: 4}]}>
              <Icon name="keyboard-arrow-right" size={36} />
            </TouchableOpacity>
          </View>
        </View>
        {/* End of Date Header */}

        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.overviewContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.centeredH3}>Revenue</Text>
            <Text style={styles.centeredStat}>400 K</Text>
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
      </ScrollView>
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