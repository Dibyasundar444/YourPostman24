import { View, Image, Text } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={{
        flex:1,
        backgroundColor:"#fdb915",
        justifyContent:"center",
        alignItems:"center"
    }}>
      <Image 
        source={require('../assets/image/appIcon.png')} 
        style={{height:150,width:150}}
      />
      <Text 
        style={{
            fontWeight:"500"
        }}
      >
        YourPostman 24
      </Text>
    </View>
  )
}

export default SplashScreen;