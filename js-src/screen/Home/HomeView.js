import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AppColors, AppSizes, AppStyles } from '@theme/'
import Icon from 'react-native-vector-icons/MaterialIcons'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={AppStyles.flex1}>
        <View style={[AppStyles.spreadHorizontalContainer, AppStyles.padding, {backgroundColor: AppColors.brand.lightPrimary}]}>
          <View style={AppStyles.row}>
            <Icon name="date-range" size={36} />
            <View style={AppStyles.paddingLeft}>
              <Text style={AppStyles.h3}>22 April - 29 April</Text>
              <Text style={AppStyles.subtext}>14 April - 21 April</Text>
            </View>
          </View>
          <View style={AppStyles.row}>
            <TouchableOpacity style={AppStyles.padding}>
              <Icon name="keyboard-arrow-left" size={36} />
            </TouchableOpacity>
            <TouchableOpacity style={AppStyles.padding}>
              <Icon name="keyboard-arrow-right" size={36} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default Home