import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, ScrollView, Dimensions, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { constData } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get("window");

export default function Account({navigation,route}) {
    // console.log(Data);
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState("10");
    const [userData, setUserData] = useState({name:"",profileImg:"qwe",email:"",phone:""});

    // const navigateData = route.params;

    useEffect(() => {
        AsyncStorage.getItem('jwt').then(resp => {
            if(resp !== null ){
                const parsed = JSON.parse(resp).user;
                // const parsed = JSON.parse(resp);
                console.log("parsed",parsed);
                setUserData({name:parsed.name, profileImg:parsed.profileImg,email:parsed.email,phone:parsed.phoneNo})
            } else {
                return null;
            }
        }).catch(err => console.log(err));
    }, []);

    const navigateData={
        "name": userData.name,
        "email": userData.email,
        "phoneNo": userData.phone,
        "profileImg": userData.profileImg,
        "points": points
    };

    const customAlert = () =>
        Alert.alert(
        "Logging out",
        "Are you sure?",
        [
            {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel"
            },
            { text: "Yes", onPress: clickLogOut }
        ]
    );

    const segmentClicked=(index)=>{
        setIndex(index);
        if (index==0) {
            navigation.navigate("Adresses");
        } 
        else if (index==1) {
            navigation.navigate("Language");
        }
        else if (index==2) {
            navigation.navigate("RateCalculator");        
        }
        else if (index==3){
            navigation.navigate("Contact");
        } 
        else if (index==4) {
            navigation.navigate("Terms");
        } 
        else if (index==5) {
            onShare();
        } 
        else {customAlert()}
    };
    const clickLogOut = async () => {
        await AsyncStorage.removeItem('jwt');
        navigation.navigate("sign");
    };
    const onShare = async () => {
        try {
          const result = await Share.share({
            message: "Link/to/share",
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.subView1}>            
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text style={styles.subView1_text1}>Account</Text>
                    <TouchableOpacity
                     style={{marginRight:20,alignItems:"center"}}
                        activeOpacity={0.7}
                        onPress={()=>alert("coming soon")} 
                    >
                        <Image source={require('../../assets/image/Wallet.jpg')} style={{bottom:-3}} />
                        <Text style={{color:"#fff",fontSize:10}}>{points}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.subView1_1} onPress={()=>navigation.navigate("Profile",navigateData)}>
                    {
                        userData.profileImg ? 
                        <Image 
                        source={{uri:userData.profileImg}}
                        style={styles.profile}
                        />
                        :
                        <Image 
                        source={require("../../assets/image/Profile.png")}
                        style={styles.profile}
                        />
                    }
                    <View style={styles.subView1_1_1}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={styles.subView1_1_1_text1}>{userData.name}</Text>
                        </View>
                        <Text style={{color:"#fff"}}>View profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.view2}>
                <ScrollView style={styles.subView2} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:30}}>
                    {
                        constData.map((item)=>(
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.8}
                                onPress={()=>segmentClicked(item.id)}
                                style={{flexDirection:"row",marginBottom:30,alignItems:"center"}}
                                active={index==item.id}
                            >
                                <View style={{marginTop:5}}>
                                {
                                    item.id == 0 ? <Ionicons name="location-sharp" size={24} color="#fdb915" />
                                    :
                                    item.id == 1 ? <Ionicons name="globe-outline" size={24} color="#fdb915" />
                                    :
                                    item.id == 2 ? <Ionicons name="calculator-sharp" size={24} color="#fdb915" />
                                    :
                                    item.id == 3 ? <MaterialCommunityIcons name="email" size={24} color="#fdb915" />
                                    :
                                    item.id == 4 ? <Foundation name="clipboard-notes" size={24} color="#fdb915" style={{marginLeft:5}} />
                                    :
                                    item.id == 5 ? <MaterialIcons name="alt-route" size={24} color="#fdb915" />
                                    :
                                    <MaterialIcons name="exit-to-app" size={24} color="#fdb915" />
                                }
                                </View>
                                <View style={{marginLeft:40}}>
                                    <Text style={{fontSize:20,fontWeight:"400",color:"#000"}}>{item.heading}</Text>
                                    <Text style={{color:"gray",flexWrap:"wrap",marginRight:50}}>{item.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fdb915",
        justifyContent:"center"
    },
    subView1: {
        height: 170,
        marginTop: 10
    },
    subView1_text1: {
        fontSize: 24,
        color: "#fff",
        marginLeft: 40
    },
    subView1_1: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15
    },
    subView1_1_1: {
        marginLeft: 20
    },
    subView1_1_1_text1: {
        fontSize: 18,
        color: "#fff"
    },
    view1_press: {
    },
    view2: {
        borderTopLeftRadius: 35,
        // borderWidth:1,
        marginTop: -30,
        backgroundColor:"#fff"
    },
    subView2: {
        // marginTop: 30,
        marginLeft: 40,
        height: height/1.32
    },
    profile: {
        height: 70,
        width: 70,
        borderRadius: 70/2,
        marginLeft: 40,
        backgroundColor: "#fff"
    },
    modal: {
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 100,
        width: 100
    }
});