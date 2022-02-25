import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


export default function MyMap(){
    const GOOGLE_MAPS_APIKEY = 'AIzaSyADsP1zSHCrMeyM2spsz4uwRj0PVnQlNx0';

    const [region, setRegion] = useState({latitude:22.5958,longitude: 88.2636,latitudeDelta: 1,longitudeDelta:0.015});
    const origin = {latitude:22.4958,longitude: 88.1636};
    const destination = {latitude:22.5958,longitude: 88.2636};
    
    return(
        <View style={{flex:1}}>
            <MapView 
            style={styles.map} 
            // initialRegion={{latitude:20.5937,longitude: 78.9629,latitudeDelta: 0.0922,longitudeDelta: 0.0421}}
            region={region}
            >
                <Marker coordinate={origin} />
                <Marker coordinate={destination} />
                {/* <Polyline coordinates={[origin,destination]} /> */}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeColor="blue"
                    strokeWidth={4}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: height,
        width: width
    }
});