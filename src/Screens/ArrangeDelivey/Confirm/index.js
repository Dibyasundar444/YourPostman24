import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import BottmSheet_item from "./BottomSheet_items";




const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


export default function ConfirmInfoScreen(
    {onSubmit,delMode,setDelMode,sLocation,rLocation,courierType,
    secured,cHeight,cInfo,cLength,cWidth,cWeight,rName,usualRate,
    fastDel_Rate,superFastDel_rate,INDICATOR,sName,SENDER_GEO,RECEIVER_GEO}
    ){

    const refRBSheet = useRef();
    const navigation = useNavigation();

    


    return(
        <ScrollView contentContainerStyle={{paddingBottom:150}} showsVerticalScrollIndicator={false}>
            <View style={{marginTop:20,marginLeft:20}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginTop:10}}>
                        <Ionicons name="md-location-sharp" size={24} color="#fdb915" />
                    </View>
                    <View style={{marginLeft:30}}>
                        <Text style={{color:"gray"}}>Walmart</Text>
                        <Text style={{fontSize:15,color:"#000"}}>{sName}</Text>
                        <Text style={{fontSize:15,color:"#000"}}>{sLocation}</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row",marginTop:20}}>
                    <View style={{marginTop:10}}>
                        <FontAwesome name="location-arrow" size={24} color="#fdb915" />
                    </View>
                    <View style={{marginLeft:30}}>
                        <Text style={{color:"gray"}}>City Garden</Text>
                        <Text style={{fontSize:15,color:"#000"}}>{rName}</Text>
                        <Text style={{fontSize:15,color:"#000"}}>{rLocation}</Text>
                    </View>
                </View>
            </View>
            <View style={{borderWidth:3,borderColor:"#e8e4e3",marginVertical:20}}/>
            <View style={{marginLeft:20,marginRight:10}}>
                <View>
                    <Text style={{color:"gray"}}>Distance</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View>
                        <Text style={{color:"#000"}}>24.2 km</Text>
                    </View>
                    <TouchableOpacity 
                        style={{flexDirection:"row",alignItems:"center"}}
                        onPress={()=>navigation.navigate("Map",{SENDER_GEO:SENDER_GEO,RECEIVER_GEO:RECEIVER_GEO})}
                    >
                        <FontAwesome name="location-arrow" size={18} color="#fdb915" />
                        <Text style={{color:"#fdb915",fontWeight:"bold",marginLeft:5}}>View in Map</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{borderWidth:3,borderColor:"#e8e4e3",marginVertical:20}}/>
            <View style={{marginLeft:20}}>
                <View>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginRight:10}}>
                        <Text style={{color:"gray"}}>Courier Type</Text>
                        <Text style={{color:"gray"}}>Secure Product</Text>
                    </View> 
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginRight:70}}>
                        <Text style={{color:"#000"}}>{courierType}</Text>
                        <Text style={{color:"#000"}}>{secured}</Text>
                    </View>                    
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginRight:10,marginTop:10}}>
                    <View>
                        <Text style={{color:"gray"}}>Height Width Length</Text>
                        <Text style={{fontSize:13,color:"#000"}}>{cHeight} × {cWidth} × {cLength} (cm)</Text>
                    </View>
                    <View>
                        <Text style={{color:"gray"}}>Weight</Text>
                        <Text style={{color:"#000"}}>{cWeight} kg</Text>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{color:"gray"}}>Courier info</Text>
                    <Text style={{color:"#000"}}>{cInfo}</Text>
                </View>
            </View>
            <View style={{borderWidth:3,borderColor:"#e8e4e3",marginVertical:10}}/>
            <TouchableOpacity 
                style={{marginHorizontal:20,backgroundColor:"#e8e4e3",borderRadius:20}}
                onPress={()=>refRBSheet.current.open()}
            >
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={height/1.8}
                    customStyles={{
                    draggableIcon: {
                        backgroundColor: "#fff",
                    },
                    container:{
                        borderTopLeftRadius: 30,
                    }
                    }}
                >
                    <BottmSheet_item 
                        delMode={delMode}
                        setDelMode={setDelMode}
                        closeSheet={()=>refRBSheet.current.close()}
                        usualRate={usualRate}
                        fastDel_Rate={fastDel_Rate}
                        superFastDel_rate={superFastDel_rate}
                    />
                </RBSheet>
                <View style={{marginLeft:20,marginVertical:10}}>
                    <Text style={{color:"gray",fontWeight:"bold",fontSize:18}}>Delivery Mode</Text>
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginRight:10}}>
                        <Text style={{fontSize:18,color:"#000"}}>{delMode}</Text>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text style={{fontSize:18,marginRight:10,color:"#000"}}>₹{usualRate}</Text>
                            {/* <AntDesign name="caretdown" size={22} style={{top:-2}}color="gray" /> */}
                        </View>
                    </View>
                    <Text style={{fontSize:18,color:"#000"}}>Delivery</Text>
                </View>
            </TouchableOpacity>
            {
                INDICATOR ? <ActivityIndicator style={{marginTop:10}} size={30} />
                :
                <View style={{alignItems:"flex-end"}}>
                    <TouchableOpacity style={styles.proceed} onPress={onSubmit}>
                        <Text style={{color:"#fff",fontSize:16}}>Proceed to Payment</Text>
                    </TouchableOpacity>
                </View>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 80,
        width:width/1.35,
        borderRadius:10,
        paddingLeft:10,
        backgroundColor:"#e8e4e3"
    },
    index: {
        width:80,
        backgroundColor:"#e8e8e8",
        alignItems:"center",
        marginRight:5,
        height:40,
        justifyContent:"center",
        borderRadius:20,
        elevation:9,
        borderWidth:0.1
    },
    setIndex: {
        backgroundColor: "#fdb915",
    },
    proceed: {
        backgroundColor:"#fdb915",
        marginTop:30,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:15,
        marginRight:20,
        marginBottom:20,
        elevation:5
    }
  });
  