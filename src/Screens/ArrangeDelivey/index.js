import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import PickUPScreen from "./PickUp";
import DropScreen from "./Drop";
import CourierScreen from "./Courier";
import ConfirmInfoScreen from "./Confirm";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../config";

const { height } = Dimensions.get("window");

export default function ArrangeDelivery({navigation,route}){

    const preData = route.params;

    const [activeIndex, setActiveIndex] = useState(0);
    const [rname, setRname] = useState("");
    const [rnumber, setRnumber] = useState("");
    const [slocation, setSlocation] = useState("");
    const [activeAddress, setActiveAddress] = useState(0);
    const [rlocation, setRlocation] = useState("");
    const [cType, setCType] = useState("Envelope");
    const [Height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [Length, setLength] = useState("");
    const [Weight, setWeight] = useState(Number);
    const [switchValue, setSwitchValue] = useState(false);
    const [Price, setPrice] = useState("");
    const [Info, setInfo] = useState("");
    const [delMode, setDelMode] = useState("Usual");
    const [userData, setUserData] = useState({});
    const [indicator1, setIndicator1] = useState(false);
    const [indicator2, setIndicator2] = useState(false);
    const [usualRate, setUsualRate] = useState("");
    const [fastDel_Rate, setFastDel_Rate] = useState("");
    const [superFastDel_rate, setSuperFastDel_rate] = useState("");
    const [homeAddress, setHomeAddress] = useState({});
    const [officeAddress, setOfficeAddress] = useState({});
    const [otherAddress, setOtherAddress] = useState({});
    const [senderGEO,setSenderGEO] = useState({});
    const [receiverGEO,setReceiverGEO] = useState({});

    //<---------------------------

    useEffect(() => {
        isUser();
    }, []);


    const isUser = async() => {
        try {
            let userData = await AsyncStorage.getItem('jwt');         
            let data = JSON.parse(userData);
            if(data !== null){
                setUserData(data);
            }else{
                setUserData({});
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


    const postData={
        "addresstodeli": rlocation,
        "SedndingAddress": slocation,
        "Distance": "",
        "Length": Number(Length),
        "Width": Number(width),
        "Height": Number(Height),
        "CourierType": cType,
        "secureProduct": switchValue,
        "CourierInfo": Info,
        "deliveryMode": delMode,
        "Price": Number(usualRate)
    };


    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Authorization": userData.access_token,
        }
    };

    const navigateData={
        slocation: slocation,
        rlocation: rlocation,
        sname: "",
        rname: rname,
        price: usualRate
    };
    
    const onSubmit=()=>{
        if(slocation=="" || rlocation=="" || 
            Height=="" || width=="" || 
            Length=="" || Weight=="" || 
            Price=="" || Price==0
        ){
            alert("please enter the details");
        } else {
            setIndicator2(true);
            axios.post(`${API}/api/createorder`,postData,axiosConfig)
            .then(res=>{
                setIndicator2(false);
                console.log(res.data);
                navigation.navigate("PaymentMethod",{Order:res.data,price:usualRate,user: preData});              
            })
            .catch(e=>{
                console.log(e);
                setIndicator2(false);
            })
        }
    };

    const segmentClicked=(index)=>{
        setActiveIndex(index);
    };

    const calculate=()=>{
        setIndicator1(true);
        let body={
            "height": Number(Height),
            "width": Number(width),
            "length": Number(Length)
        };
        axios.post(`${API}/api/ratecalc`,body,axiosConfig)
        .then(resp=>{
            setUsualRate(resp.data);
            setIndicator1(false);
            segmentClicked(3);
        })
        .catch(err=>{
            setIndicator1(false);
            console.log("error from server: ",err);
        })
    };


    const _renderItem=()=>{
        if(activeIndex==0){
            return(
                <PickUPScreen
                    location={slocation}
                    setLocation={setSlocation}
                    activeIndex={activeAddress}
                    setActiveIndex={setActiveAddress}
                    next={()=>segmentClicked(1)}
                    HOME={homeAddress.homeAddress}
                    OFFICE={officeAddress.officeAddress}
                    OTHER={otherAddress.otherAddress}
                    SET_LAT_LONG={setSenderGEO}
                />
            )
        } else if(activeIndex==1){
            return(
                <DropScreen
                    drop={rlocation}
                    setDrop={setRlocation}
                    name={rname}
                    number={rnumber}
                    setName={setRname}
                    setNumber={setRnumber}
                    next={()=>segmentClicked(2)}
                    SET_LAT_LONG={setReceiverGEO}
                />
            )
        } else if(activeIndex==2){
            return(
                <CourierScreen 
                    cType={cType}
                    Height={Height}
                    Weight={Weight}
                    Width={width}
                    Length={Length}
                    switchValue={switchValue}
                    Price={Price}
                    Info={Info}
                    setCType={setCType}
                    setHeight={setHeight}
                    setWidth={setWidth}
                    setLength={setLength}
                    setWeight={setWeight}
                    setSwitchValue={setSwitchValue}
                    setPrice={setPrice}
                    setInfo={setInfo}
                    indicator1={indicator1}
                    next={calculate}

                />
            )
        } else if(activeIndex==3){
            return(
                <ConfirmInfoScreen 
                    delMode={delMode}
                    setDelMode={setDelMode}
                    onSubmit={onSubmit}
                    sLocation={slocation}
                    rLocation={rlocation}
                    courierType={cType}
                    secured={switchValue===true?"Yes":"No"}
                    cHeight={Height}
                    cInfo={Info}
                    cLength={Length}
                    cWidth={width}
                    cWeight={Weight}
                    rName={rname}
                    usualRate={usualRate}
                    INDICATOR={indicator2}
                    sName={userData.user.name}
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
                   {activeIndex === 0 ? <Text style={{color:"#fff",fontSize:28}}>Sender Location</Text> : null}
                   {activeIndex === 1 ? <Text style={{color:"#fff",fontSize:28}}>Receiver Location</Text> : null}
                   {activeIndex === 2 ? <Text style={{color:"#fff",fontSize:28}}>Courier Info</Text> : null}
                   {activeIndex === 3 ? <Text style={{color:"#fff",fontSize:28}}>Confirm Info</Text> : null}
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
                <View style={{alignItems:"center",flex:0.25}}>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 0 ? "#fff" : "#cca15c",marginTop:40}]}
                        onPress={()=>segmentClicked(0)}>
                        <Ionicons name="md-location-sharp" color={"#fdb915"} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 1 ? "#fff" : "#cca15c",marginTop:20}]}
                        onPress={()=>segmentClicked(1)}>
                        <FontAwesome name="location-arrow" color={"#fdb915"} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 2 ? "#fff" : "#cca15c",marginTop:20}]}
                    onPress={()=>segmentClicked(2)}>
                        <SimpleLineIcons name="handbag" color={"#fdb915"} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor: activeIndex === 3 ? "#fff" : "#cca15c",marginTop:20}]}
                    onPress={()=>segmentClicked(3)}>
                        <Foundation name="clipboard-notes" color={"#fdb915"} size={28} />
                    </TouchableOpacity>
                </View>
                <View style={styles.renderItems}>
                    {_renderItem()}
                </View>
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