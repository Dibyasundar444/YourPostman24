import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function GooglePlaces({setLOCATION,setLAT_LONG,LOCATION,setPROGRESS,isPROGRESS}) {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyADsP1zSHCrMeyM2spsz4uwRj0PVnQlNx0';

  return (
    <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        onPress={(data, details = null) => {
            setLOCATION(data.description);
            setLAT_LONG(details.geometry.location);
            if(isPROGRESS){
                setPROGRESS(false);
            }
        }}
        query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
            components: 'country:IN'
        }}
        textInputProps={{
            placeholderTextColor:"gray",
            value:LOCATION,
            onChangeText:(val)=>{
                setLOCATION(val);
                if(isPROGRESS){
                    setPROGRESS(true);
                }
            },
        }}
        styles={{
            textInputContainer: {
                width:220,
                borderTopRightRadius:30,
                borderBottomRightRadius:30,
            },
            textInput: {
                height: 60,
                fontSize:16,
                color:"#000",
                borderTopRightRadius:30,
                borderBottomRightRadius:30,
            },
            predefinedPlacesDescription: {
                color: '#000',
            },
            poweredContainer: {
                justifyContent: 'flex-end',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderColor: '#c8c7cc',
                borderTopWidth: 0.5,
            },
            row: {
                backgroundColor: '#fff',
                padding: 13,
                // height: 44,
                flexDirection: 'row',
            },
            container: {
                width:"90%",
            },
            description:{
                color:"#000"
            },
        }}
    />
  )
}