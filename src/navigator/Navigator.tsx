import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={ MapScreen } />
            <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
        </Stack.Navigator>
    )
}