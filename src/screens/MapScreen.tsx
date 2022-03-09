import { View, Text } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Map from '../components/Map';

export default function MapScreen() {
  return (
    <View style={{ flex: 1}}>
      <Map />
    </View>
  )
}