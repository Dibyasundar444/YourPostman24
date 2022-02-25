import React, { useCallback, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Switch, ScrollView, ActivityIndicator } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Slider from '@react-native-community/slider';
import RangeSlider from 'rn-range-slider';
import Thumb from "../../Slider/Thumb";
import Rail from "../../Slider/Rail";
import RailSelected from "../../Slider/RailSelected";
import Label from "../../Slider/Label";
import Notch from "../../Slider/Notch";


const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");


export default function CourierScreen({cType,setCType,Height, setHeight,Width, setWidth,Length, 
    setLength,Price,Weight,setWeight, setPrice,Info, setInfo,switchValue, setSwitchValue,next,indicator1}){

    

    const toggle=(value)=>{
        setSwitchValue(value);
    };

    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value}/>, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((val) => {
    setWeight(val)
    }, []);


    const categories = ["Envelope", "Box Pack", "Other"];
    
    return(
        <View style={{borderTopLeftRadius:20}}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{borderTopLeftRadius:20}}
                contentContainerStyle={{paddingBottom:150}}
            >
                <View style={{marginHorizontal:20,marginTop:20}}>
                    <View style={{marginTop:10}}>
                        <Text style={{fontWeight:"bold",color:"#000"}}>Courier Type</Text>
                        <View style={{flexDirection:"row",marginTop:10}}>
                            {categories.map((item,id)=>(
                                <TouchableOpacity
                                    key={id}
                                    onPress={()=>setCType(item)} 
                                    style={[styles.index,cType === item && styles.setIndex]}   
                                >
                                    <Text style={{color:cType === item ?"#fff":"#000"}}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{borderWidth:2,borderColor:"#e8e4e3",marginTop:20,marginBottom:5}}/>
                <View style={{flexDirection:"row",justifyContent:"space-evenly",marginVertical:5}}>
                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <AntDesign name="arrowup" size={16} color="#fdb915" />
                            <Text style={{marginLeft:5,color:"#aaa",fontWeight:"700",fontSize:13}}>Height</Text>
                        </View>
                        <View style={{marginTop: 5}}>
                            <TextInput 
                                placeholder="0.0 cm"
                                placeholderTextColor="#000"
                                style={{borderRadius:5,width:60,paddingLeft:5,color:"#000"}}
                                value={Height}
                                onChangeText={(value)=>setHeight(value)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={{borderWidth:2,borderColor:"#e8e4e3"}}/>
                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <AntDesign name="arrowright" size={18} color="#fdb915" />
                            <Text style={{marginLeft:5,color:"#aaa",fontWeight:"700",fontSize:13}}>Width</Text>
                        </View>
                        <View style={{marginTop:5}}>
                            <TextInput 
                                placeholder="0.0 cm"
                                placeholderTextColor="#000"
                                style={{borderRadius:5,width:60,paddingLeft:5,color:"#000"}}
                                value={Width}
                                onChangeText={(value)=>setWidth(value)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={{borderWidth:2,borderColor:"#e8e4e3"}}/>
                    <View style={{alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <AntDesign name="swap" size={20} color="#fdb915" />
                            <Text style={{marginLeft:5,color:"#aaa",fontWeight:"700",fontSize:13}}>Length</Text>
                        </View>
                        <View style={{marginTop:5}}>
                            <TextInput 
                                placeholder="0.0 cm"
                                placeholderTextColor="#000"
                                style={{borderRadius:5,width:60,paddingLeft:5,color:"#000"}}
                                value={Length}
                                onChangeText={(value)=>setLength(value)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>
                <View style={{borderWidth:2,borderColor:"#e8e4e3",marginTop:5}}/>
                <View style={{paddingBottom:40,marginHorizontal:20,alignItems:"center"}}>
                    <Text style={{fontWeight:"bold",marginTop:10,marginBottom:30,color:"#000"}}>Weight: {Weight.toString().split('',4)}</Text>
                    <View style={{marginLeft:20}}>
                        {/* <TextInput 
                            placeholder="00.00"
                            style={styles.weight}
                            value={Weight}
                            onChangeText={(value)=>setWeight(value)}
                            keyboardType="numeric"
                        /> */}
                        {/* <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={0}
                            maximumValue={20}
                            maximumTrackTintColor="#000000"
                            minimumTrackTintColor="#aaa"
                            value={0}
                            onValueChange={(val)=>setWeight(val)}
                        /> */}
                        <RangeSlider
                            style={{width:200}}
                            min={0}
                            max={20}
                            step={1}
                            floatingLabel
                            disableRange
                            renderThumb={renderThumb}
                            renderRail={renderRail}
                            renderRailSelected={renderRailSelected}
                            renderLabel={renderLabel}
                            renderNotch={renderNotch}
                            onValueChanged={handleValueChange}
                        />
                        <View style={{position:"absolute",bottom:-20,left:0,right:0}}>
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:5}}>
                                <Text style={{fontSize:12,fontWeight:"700",color:"gray"}}>0 kg</Text>
                                <Text style={{fontSize:12,fontWeight:"700",color:"gray"}}>10 kg</Text>
                                <Text style={{fontSize:12,fontWeight:"700",color:"gray"}}>20 kg</Text>
                            </View>
                        </View>
                    </View>
                    {/* <Text style={{fontSize:16,marginLeft:10}}>kg</Text> */}
                </View>
                <View style={{borderWidth:2,borderColor:"#e8e4e3"}}/>
                <View style={{
                    flexDirection:"row",justifyContent:"space-between",
                    paddingVertical:20,marginLeft:10,alignItems:"center"
                    }}
                >
                    <Text style={{fontWeight:"bold",color:"#000"}}>Secure The Package</Text>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View>
                            <Text style={{color:"#000"}}>{ switchValue===true ? `Yes` : `No` }</Text>
                        </View>
                        <View style={{marginHorizontal:10}}>
                            <Switch 
                                value={switchValue}
                                onValueChange={toggle}
                            />
                        </View>
                    </View>
                </View>
                <View style={{borderWidth:2,borderColor:"#e8e4e3"}}/>
                <View style={{marginTop:10,marginLeft:20}}>
                    <Text style={{fontWeight:"bold",color:"#000"}}>Courier Details</Text>
                    <View style={{marginTop:10,marginBottom:20}}>
                        <View style={{flexDirection:"row",alignItems:"center",marginBottom:20}}>
                            <Text style={{marginRight:10,color:"gray",fontWeight:"bold"}}>Product Value</Text>
                            <TextInput 
                                placeholder="Price"
                                placeholderTextColor="gray"
                                style={styles.price}
                                value={Price}
                                onChangeText={(value)=>setPrice(value)}
                                keyboardType="numeric"
                            />
                            <Text style={{fontSize:18,marginLeft:10}}>₹</Text>
                        </View>
                        <TextInput 
                            placeholder="Enter courier info (i.e. things in package)"
                            placeholderTextColor="gray"
                            style={styles.input}
                            onChangeText={(value)=>setInfo(value)}
                            value={Info}
                            multiline={true}
                        />
                    </View>
                </View>
                <View style={{borderWidth:2,borderColor:"#e8e4e3"}}/>
                <View style={{alignItems:"flex-end",marginRight:10}}>
                    <TouchableOpacity style={styles.continue} onPress={next}>
                        {
                            indicator1 ? <ActivityIndicator color="#fff" />
                            :
                            <Text style={{color:"#fff",fontSize:16}}>Continue ↓</Text>
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 80,
        width:width/1.4,
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
        borderWidth: 1,
        borderColor: "#aaa"
    },
    setIndex: {
        backgroundColor: "#fdb915",
        borderWidth: 0
    },
    continue: {
        backgroundColor:"#fdb915",
        marginVertical:20,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:15
    },
    weight: {
        backgroundColor:"#e8e4e3",
        height:40,
        borderRadius:5,
        paddingHorizontal:10,
        width:80,
    },
    price: {
        backgroundColor:"#e8e4e3",
        height:40,
        borderRadius:5,
        paddingHorizontal:10,
        width:100,
        color:"#000"
    }
  });
  