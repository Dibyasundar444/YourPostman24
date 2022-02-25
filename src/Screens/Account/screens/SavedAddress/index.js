import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RenderScreen from "./component/RenderScreen";
import { API } from "../../../../config";




const { height } = Dimensions.get("window");

export default function AddressScreen({navigation}){


    const [activeIndex, setActiveIndex] = useState(0);
    const [home, setHome] = useState("");
    const [office, setOffice] = useState("");
    const [other, setOther] = useState("");
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [name3, setName3] = useState("");
    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");
    const [number3, setNumber3] = useState("");
    const [token, setToken] = useState(null);
    const [indicator1, setIndicator1] = useState(false);
    const [indicator2, setIndicator2] = useState(false);
    const [indicator3, setIndicator3] = useState(false);
    const [homeAddress, setHomeAddress] = useState({});
    const [officeAddress, setOfficeAddress] = useState({});
    const [otherAddress, setOtherAddress] = useState({});

    useEffect(()=>{
        isUser();
    },[]);

    const isUser = async() => {
        try {
          let userData = await AsyncStorage.getItem('jwt');         
          let data = JSON.parse(userData);
          if(data !== null){
            setToken(data.access_token);
          }else{
            setToken(null);
          }
          let HOME = await AsyncStorage.getItem('Home');
          let parsedHome = JSON.parse(HOME);
          if(parsedHome !== null){
              setHomeAddress(parsedHome);
          }
          else{
              setHomeAddress({})
          }
          let OFFICE = await AsyncStorage.getItem('Office');
          let parsedOffice = JSON.parse(OFFICE);
          if(parsedOffice !== null){
              setOfficeAddress(parsedOffice);
          }
          else{
              setOfficeAddress({});
          }
          let OTHER = await AsyncStorage.getItem('Others');
          let parsedOther = JSON.parse(OTHER);
          if(parsedOther !== null){
              setOtherAddress(parsedOther);
          }
          else{
              setOtherAddress({});
          }
        } catch(e) {
          console.log("Error while accessing storage: ",e);
        }
    };

    const segmentClicked=(index)=>{
        setActiveIndex(index);
    };

    const _renderItem=()=>{
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": token
            }
        };
        if(activeIndex==0){
            const postData = {
                "homeAddress": home,
                "name": name1,
                "phoneNo": number1
            };
            const submitHomeAddress=()=>{
                setIndicator1(true);
                axios.patch(`${API}/update`,postData,axiosConfig)
                .then( async (res) => {
                    console.log(res.data);
                    await AsyncStorage.setItem("Home",JSON.stringify(postData));
                    setIndicator1(false);
                })
                .catch(e=>{
                    console.log(e);
                    // setIndicator1(false);
                }) 
            }
            return(
                <RenderScreen 
                    headerInputPlaceholder="Home"
                    location={homeAddress.homeAddress ? homeAddress.homeAddress : "Address"}
                    starfieldPlaceholder="City Garden"
                    namePlaceholder={homeAddress.name ? homeAddress.name : "Name of Person"}
                    numberplaceholder={homeAddress.phoneNo ? homeAddress.phoneNo : "Contact number"}
                    headerInput={home}
                    // starfeldInput={value}
                    nameInput={name1}
                    numberInput={number1}
                    setHeaderInput={setHome}
                    // setStarfeldInput={setValue}
                    setNumberInput={setNumber1}
                    setNameInput={setName1}
                    onSubmit={submitHomeAddress}
                    Indicator={indicator1}
                />
            )
        } else if(activeIndex==1){
            const postData = {
                "officeAddress": office,
                "name": name2,
                "phoneNo": number2
            };
            const submitOfficeAddress=()=>{
                setIndicator2(true);
                axios.patch(`${API}/update`,postData,axiosConfig)
                .then( async (res) => {
                    console.log({"officeAdrs":res.data});
                    await AsyncStorage.setItem("Office",office);
                    setIndicator2(false);
                })
                .catch(e=>{
                    console.log(e);
                    // setIndicator2(false);
                }) 
            }
            return(
                <RenderScreen 
                    headerInputPlaceholder="Office"
                    location={officeAddress.officeAddress ? officeAddress.officeAddress : "Address"}
                    starfieldPlaceholder="City Garden"
                    namePlaceholder={officeAddress.name ? officeAddress.name : "Name of Person"}
                    numberplaceholder={officeAddress.phoneNo ? officeAddress.phoneNo : "Contact number"}
                    headerInput={office}
                    // starfeldInput={value}
                    nameInput={name2}
                    numberInput={number2}
                    setHeaderInput={setOffice}
                    // setStarfeldInput={setValue}
                    setNumberInput={setNumber2}
                    setNameInput={setName2}
                    onSubmit={submitOfficeAddress}
                    Indicator={indicator2}
                />
            )
        } else if(activeIndex==2){
            const postData = {
                "otherAddress": other,
                "name": name3,
                "phoneNo": number3
            };
            const submitOtherAddress=()=>{
                setIndicator3(true);
                axios.patch(`${API}/update`,postData,axiosConfig)
                .then( async (res) => {
                    console.log({"otherAdrs":res.data});
                    await AsyncStorage.setItem("Others",other);
                    setIndicator3(false);
                })
                .catch(e=>{
                    console.log(e);
                    // setIndicator3(false);
                })  
            }
            return(
                <RenderScreen 
                    headerInputPlaceholder="Other"
                    location={otherAddress.otherAddress ? otherAddress.otherAddress : "Address"}
                    starfieldPlaceholder="City Garden"
                    namePlaceholder={otherAddress.name ? otherAddress.name : "Name of Person"}
                    numberplaceholder={otherAddress.phoneNo ? otherAddress.phoneNo : "Contact number"}
                    headerInput={other}
                    // starfeldInput={value}
                    nameInput={name3}
                    numberInput={number3}
                    setHeaderInput={setOther}
                    // setStarfeldInput={setValue}
                    setNumberInput={setNumber3}
                    setNameInput={setName3}
                    onSubmit={submitOtherAddress}
                    Indicator={indicator3}
                />
            )
        }
    };
    
    return(
        <View style={styles.container}>
            <View style={{marginTop:40,flexDirection:"row",alignItems:"center",marginLeft:15}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="chevron-back" color={"#fff"} size={38}/>
                </TouchableOpacity>
                <View style={{flex:1,alignItems:"center"}}>
                    <Text style={{color:"#fff",fontSize:28}}>Saved Addresses</Text>
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
                <View style={{alignItems:"center",flex:0.25}}>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 0 ? "#fff" : "#cca15c",marginTop:40}]}
                        onPress={()=>segmentClicked(0)} active={activeIndex == 0}>
                        <Entypo name="home" size={24} color="#fdb915" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 1 ? "#fff" : "#cca15c",marginTop:20}]}
                        onPress={()=>segmentClicked(1)} active={activeIndex == 1}>
                        <FontAwesome  name="building-o" size={24} color="#fdb915" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 2 ? "#fff" : "#cca15c",marginTop:20}]}
                    onPress={()=>segmentClicked(2)} active={activeIndex == 2}>
                        <MaterialCommunityIcons  name="warehouse" size={24} color="#fdb915" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.renderItems} showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:300}}
                >
                    {_renderItem()}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fdb915",
    },
    button: {
        height:50,
        width:50,
        borderRadius:50/2,
        alignItems:"center",
        justifyContent:"center",
    },
    renderItems: {
        flex:1,
        backgroundColor:"#fff",
        height:height,
        marginTop:20,
        borderTopLeftRadius:20
    }
});