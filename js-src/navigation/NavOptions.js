import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AppColors } from '@theme/'

const navOptions = ({navigation}) => ({
  title: 'BukaAnalytics',
  headerTintColor: 'white',
  headerStyle: { backgroundColor: AppColors.brand.primary },
  headerLeft: (
    <TouchableOpacity
      onPress={() => navigation.navigate('DrawerOpen')}
      style={{justifyContent: 'center', alignItems: 'center', padding: 8, paddingTop: 12}}>
      <Icon name='menu' color='white' size={24} />
    </TouchableOpacity>
  )
})

export default navOptions