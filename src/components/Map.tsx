import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';


interface Props {
    markers?: Marker[];
}

export default function Map({markers}: Props) {

    const [showPolyline, setShowPolyline] = useState(true);

    const { hasLocation, 
        initialPosition, 
        getCurrentLocation, 
        followUserLocation,
        stopFollowUserLocation,
        userLocation,
        routesLines }= useLocation();
    
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();
        return() => {
            stopFollowUserLocation();
        }
    }, [])
    
    useEffect(() => {
        if( !following.current) return;

        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        })
    }, [userLocation])
    

    const centerPosition = async () => {

        const { latitude, longitude }= await getCurrentLocation();
        following.current = true;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        })
    }

    if(!hasLocation) {
        return <LoadingScreen />
    }
    
  return (
    <>
        <MapView
            ref={ (el) => mapViewRef.current = el! }
            provider={PROVIDER_GOOGLE} 
            style={{ flex: 1 }}
            showsUserLocation
            region={{
                latitude: initialPosition!.latitude,
                longitude: initialPosition!.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            onTouchStart={ () => following.current = false }
        >
            {
                showPolyline && (
                    <Polyline 
                        coordinates={ routesLines }
                        strokeColor="black"
                        strokeWidth={ 3 }
                    />
                )
            }
            
            {/* <Marker
                image= { require('../assets/custom-marker.png')}
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="titulo"
                description="descripción"
            /> */}
        </MapView>
        <Fab 
            iconName="compass-outline"  
            onPress={ centerPosition }
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20
            }}
        />
        <Fab 
            iconName="brush-outline"  
            onPress={ () => setShowPolyline( !showPolyline) }
            style={{
                position: 'absolute',
                bottom: 80,
                right: 20
            }}
        />
    </>
  )
}