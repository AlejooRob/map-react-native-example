import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import { PermissionsContext } from '../context/PermissionContext';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { permissions } = useContext( PermissionsContext );
    if( permissions.locationStatus === 'unavailable') {
        return <LoadingScreen />
    }
    return (
        <Stack.Navigator
            initialRouteName="PermissionsScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            {
                (permissions.locationStatus === 'granted')
                ? <Stack.Screen name="HomeScreen" component={ MapScreen } />
                : <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
            }
        </Stack.Navigator>
    )
}