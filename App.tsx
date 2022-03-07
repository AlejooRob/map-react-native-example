import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionContext';

const Appstate = ({children}: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Appstate>
        <Navigator />
      </Appstate>
    </NavigationContainer>
  )
}