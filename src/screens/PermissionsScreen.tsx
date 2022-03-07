import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { PermissionsContext } from '../context/PermissionContext';
import BlackButton from '../components/BlackButton';

export default function PermissionsScreen() {

  const { permissions, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Es necesario el uso del GPS para usar esta aplicación</Text>

      <BlackButton 
        title="Permiso"
        onPress={ askLocationPermission }
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      width: 250,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20
    }
});