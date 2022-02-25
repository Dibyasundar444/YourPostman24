import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import MapView from "react-native-maps";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


export default function DropScreen({drop,setDrop,name,setName,number,setNumber,next}){

    const [input1, setInput1] = useState("");
    
    return(
        <View style={{overflow:"hidden",borderTopLeftRadius:20}}>
            <MapView style={styles.map} initialRegion={{latitude:22.5726,longitude: 88.3639,latitudeDelta: 0.0922,longitudeDelta: 0.0421}} />
            <View style={styles.view1}>
                <View style={{marginLeft:10}}>
                    <Ionicons name="md-location-sharp" size={20} color={"#fdb915"} />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val)=>setDrop(val)}
                        value={drop}
                        placeholder="Receiver location..."
                        placeholderTextColor="gray"
                        // multiline={true}
                    />
                </View>
            </View>
            <View>
                <View style={styles.view3}>
                    <View style={{marginHorizontal:30}}>
                        <FontAwesome name="location-arrow" color={"#fdb915"} size={22}/>
                    </View>
                    <View style={{marginRight:80}}>
                        <Text style={{flexWrap:"wrap",color:"#000"}}>{drop=="" ? "Receiver location" : drop}</Text>
                    </View>
                </View>
                <View style={{}}>
                    <View style={{marginHorizontal:20,marginTop:20}}>
                        <View style={[styles.subView1,{backgroundColor:"#e8e4e3"}]}>
                            <View style={{marginRight:10,marginLeft:20}}>
                                <Entypo name="star" color={"#fdb915"} size={20}/>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val)=>setInput1(val)}
                                    value={input1}
                                    placeholder="City Garden"
                                    placeholderTextColor="gray"
                                />
                            </View>
                        </View>
                        <View style={[styles.subView1,{marginTop:10,backgroundColor:"#e8e4e3"}]}>
                            <View style={{marginRight:10,marginLeft:20}}>
                                <MaterialIcons  name="person" size={22} color="#fdb915" />
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input1}
                                    onChangeText={(val)=>setName(val)}
                                    value={name}
                                    placeholder="Name of Person"
                                    placeholderTextColor="gray"
                                />
                            </View>
                            <MaterialCommunityIcons  name="contacts" size={22} color="#fdb915" />
                        </View>
                        <View style={[styles.subView1,{marginTop:10,backgroundColor:"#e8e4e3"}]}>
                            <View style={{marginRight:10,marginLeft:20}}>
                                <Zocial name="call" size={22} color="#fdb915" />
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val)=>setNumber(val)}
                                    value={number}
                                    placeholder="Contact Number"
                                    keyboardType="number-pad"
                                    placeholderTextColor="gray"
                                />
                            </View>
                        </View>
                        <View style={{alignItems:"flex-end"}}>
                            <TouchableOpacity style={styles.continue} onPress={next}>
                                <Text style={{color:"#fff",fontSize:16}}>Continue ↓</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        fontSize:16,
        marginRight:50,
        paddingLeft:10,
        color:"#000"
    },
    input1: {
        height: 60,
        fontSize: 16,
        width: width/2.2,
        color:"#000"
    },
    map: {
        width: width,
        height: height/2.8
    },
    continue: {
        backgroundColor:"#fdb915",
        marginTop:30,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:15
    },
    view1: {
        position: "absolute",
        flexDirection:"row",
        alignItems:"center",
        elevation:5,
        borderRadius:30,
        opacity:0.99,
        backgroundColor:"#fff",
        marginLeft:20,
        marginTop:20,
        width:width/1.4

    },
    view2: {
        elevation:5,borderRadius:10,
        opacity:0.99,
        backgroundColor:"#ebebeb"
    },
    subView2: {
        marginLeft:10,
        marginVertical:10,
        flexDirection:"row",
        alignItems:"center"
    },
    subView1: {
        flexDirection:"row",
        alignItems:"center",
        // elevation:5,
        borderRadius:30,
        // opacity:0.99,
      },
      view3: {
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        backgroundColor:"#e8e4e3",
        marginTop:-20,
        flexDirection:"row",
        paddingVertical:20,
        alignItems:"center"
      },
  });
  